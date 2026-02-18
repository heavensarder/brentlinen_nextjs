"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendEmail } from "./mail";

const prisma = new PrismaClient();

// --- Categories ---

export async function getBookingCategories() {
  try {
    const categories = await prisma.bookingCategory.findMany({
      orderBy: { createdAt: "desc" },
    });
    console.log("SERVER ACTION: Fetched categories:", categories.length);
    return { success: true, data: categories };
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return { success: false, error: "Failed to fetch categories" };
  }
}

export async function createBookingCategory(data: { title: string; imageRatio: string }) {
  try {
    await prisma.bookingCategory.create({
      data: {
        title: data.title,
        imageRatio: data.imageRatio,
      },
    });
    revalidatePath("/admin/booking/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteBookingCategory(id: string) {
  try {
    await prisma.bookingCategory.delete({
      where: { id },
    });
    revalidatePath("/admin/booking/categories");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category" };
  }
}

// --- Products ---

export async function getBookingProducts() {
  try {
    const products = await prisma.bookingProduct.findMany({
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

export async function getActiveBookingProducts() {
  try {
    const products = await prisma.bookingProduct.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
      include: { category: true },
    });
    return { success: true, data: products };
  } catch (error) {
    console.error("Failed to fetch active products:", error);
    return { success: false, error: "Failed to fetch active products" };
  }
}

export async function createBookingProduct(data: {
  title: string;
  description: string;
  quantity?: number;
  price?: string;
  image?: string;
  isActive?: boolean;
  categoryId?: string;
}) {
  try {
    await prisma.bookingProduct.create({
      data: {
        title: data.title,
        description: data.description,
        quantity: data.quantity || 1,
        price: data.price ? parseFloat(data.price) : null,
        image: data.image,
        isActive: data.isActive !== undefined ? data.isActive : true,
        categoryId: data.categoryId || null,
      },
    });
    revalidatePath("/admin/booking/products");
    revalidatePath("/"); 
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateBookingProduct(
  id: string,
  data: {
    title?: string;
    description?: string;
    quantity?: number;
    price?: string;
    image?: string;
    isActive?: boolean;
    categoryId?: string;
  }
) {
  try {
    await prisma.bookingProduct.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        quantity: data.quantity,
        // If price is empty string, set to null. If undefined, leave as is. If valid string, parse.
        price: data.price === "" ? null : (data.price ? parseFloat(data.price) : undefined),
        image: data.image,
        isActive: data.isActive,
        categoryId: data.categoryId,
      },
    });
    revalidatePath("/admin/booking/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteBookingProduct(id: string) {
  try {
    await prisma.bookingProduct.delete({
      where: { id },
    });
    revalidatePath("/admin/booking/products");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

// --- Bookings ---

export async function createBooking(data: {
  productId: string;
  date: any; // Date object or string
  time: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  zip?: string;
  endDate?: any; // Date object or string
  endTime?: string;
  quantity?: number;
}) {
  try {
    const product = await prisma.bookingProduct.findUnique({
      where: { id: data.productId },
    });

    await prisma.booking.create({
      data: {
        productId: data.productId,
        date: new Date(data.date),
        time: data.time,
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        address: data.address || "",
        city: data.city || "",
        zip: data.zip || "",
        endDate: data.endDate ? new Date(data.endDate) : null,
        endTime: data.endTime || null,
        quantity: data.quantity || 1,
        status: "pending",
      },
      include: { product: true },
    });

    // --- Send Email Notifications ---
    try {
      const config = await prisma.mailConfig.findFirst();
      if (config) {
        // Cast config to any to access new fields until CLIENT regenerates
        const mailConfig = config as any;

        // 1. Send Admin Notification
        if (mailConfig.adminEmail) {
          const adminSubject = (mailConfig.bookingAdminSubject || "New Booking Request from {{name}}")
            .replace("{{name}}", data.name)
            .replace("{{product}}", product?.title || "Product")
            .replace("{{date}}", new Date(data.date).toLocaleDateString())
            .replace("{{time}}", data.time || "")
            .replace("{{quantity}}", (data.quantity || 1).toString());

          const adminBody = (mailConfig.bookingAdminBody || "<h2>New Booking</h2><p>Name: {{name}}</p><p>Product: {{product}}</p>")
            .replace("{{name}}", data.name)
            .replace("{{email}}", data.email)
            .replace("{{phone}}", data.phone)
            .replace("{{product}}", product?.title || "Product")
            .replace("{{date}}", new Date(data.date).toLocaleDateString())
            .replace("{{time}}", data.time || "")
             .replace("{{quantity}}", (data.quantity || 1).toString())
            .replace("{{address}}", data.address || "")
            .replace("{{city}}", data.city || "")
            .replace("{{zip}}", data.zip || "");

          await sendEmail({
            to: mailConfig.adminEmail,
            subject: adminSubject,
            html: adminBody,
          });
        }

        // 2. Send Customer Confirmation
        if (data.email) {
          const customerSubject = (mailConfig.bookingCustomerSubject || "Booking Confirmation - Brent Linen")
            .replace("{{name}}", data.name)
            .replace("{{product}}", product?.title || "Product");

          const customerBody = (mailConfig.bookingCustomerBody || "<p>Dear {{name}},<br>Thank you for your booking.</p>")
            .replace("{{name}}", data.name)
            .replace("{{product}}", product?.title || "Product")
            .replace("{{date}}", new Date(data.date).toLocaleDateString())
            .replace("{{time}}", data.time || "")
            .replace("{{quantity}}", (data.quantity || 1).toString());

          await sendEmail({
            to: data.email,
            subject: customerSubject,
            html: customerBody,
          });
        }
      }
    } catch (emailError) {
      console.error("Failed to send booking emails:", emailError);
      // Continue execution, don't fail booking creation
    }

    revalidatePath("/admin/booking/list");
    return { success: true };
  } catch (error) {
    console.error("Failed to create booking:", error);
    return { success: false, error: "Failed to create booking" };
  }
}

export async function getBookings() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      include: { product: true },
    });
    return { success: true, data: bookings };
  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return { success: false, error: "Failed to fetch bookings" };
  }
}

export async function updateBookingStatus(id: string, status: string) {
  try {
    await prisma.booking.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/booking/list");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update booking status" };
  }
}

export async function getBookingStats() {
  try {
    const totalBookings = await prisma.booking.count();
    const pendingBookings = await prisma.booking.count({ where: { status: "pending" } });
    const confirmedBookings = await prisma.booking.count({ where: { status: "confirmed" } });
    const cancelledBookings = await prisma.booking.count({ where: { status: "cancelled" } });
    
    return { 
      success: true, 
      stats: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        cancelled: cancelledBookings
      }
    };
  } catch (error) {
    console.error("Failed to fetch booking stats:", error);
    return { success: false, error: "Failed to fetch booking stats" };
  }
}
