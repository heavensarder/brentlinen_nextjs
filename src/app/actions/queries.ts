"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { sendEmail } from "./mail";

const prisma = new PrismaClient();

export async function submitQuery(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    await prisma.query.create({
      data: {
        name,
        email,
        phone,
        message,
      },
    });
    
    // --- Email Notifications ---
    try {
        const config = await prisma.mailConfig.findFirst();
        
        if (config) {
            const processTemplate = (template: string) => {
                return template
                    .replace(/{{name}}/g, name)
                    .replace(/{{email}}/g, email)
                    .replace(/{{phone}}/g, phone || "N/A")
                    .replace(/{{message}}/g, message.replace(/\n/g, "<br>"));
            }

            // 1. Notify Admin
            const adminSubject = config.adminSubject 
                ? processTemplate(config.adminSubject) 
                : `New Website Query from ${name}`;
                
            const adminBody = config.adminBody
                ? processTemplate(config.adminBody)
                : `
                    <h2>New Query Received</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                    <p><strong>Message:</strong></p>
                    <blockquote style="background: #f9f9f9; padding: 10px; border-left: 4px solid #ccc;">
                        ${message.replace(/\n/g, "<br>")}
                    </blockquote>
                `;

            await sendEmail({
                to: config.adminEmail,
                subject: adminSubject,
                html: adminBody
            });

            // 2. Auto-reply to Customer
            const customerSubject = config.customerSubject
                ? processTemplate(config.customerSubject)
                : "We received your message - Brent Linen";

            const customerBody = config.customerBody
                ? processTemplate(config.customerBody)
                : `
                    <p>Dear ${name},</p>
                    <p>Thank you for contacting Brent Linen. We have received your query and will get back to you shortly.</p>
                    <hr>
                    <p style="font-size: 12px; color: #666;">This is an automated message.</p>
                `;

            await sendEmail({
                to: email,
                subject: customerSubject,
                html: customerBody
            });
        }
    } catch (emailError) {
        console.error("Failed to send notification emails:", emailError);
        // We don't block the success response if email fails, but log it.
        // potentially return { success: true, emailError: ... } if needed
    }
    
    revalidatePath("/admin/queries");
    return { success: true };
  } catch (error) {
    console.error("Failed to submit query:", error);
    return { success: false, error: "Failed to submit query. Please try again." };
  }
}

export async function getQueries() {
  try {
    const queries = await prisma.query.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: queries };
  } catch (error) {
    return { success: false, error: "Failed to fetch queries" };
  }
}

export async function markQueryAsRead(id: string) {
  try {
    await prisma.query.update({
      where: { id },
      data: { status: "read" },
    });
    revalidatePath("/admin/queries");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update query" };
  }
}

export async function deleteQuery(id: string) {
  try {
    await prisma.query.delete({
      where: { id },
    });
    revalidatePath("/admin/queries");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete query" };
  }
}


export async function getDashboardStats() {
  try {
    const totalQueries = await prisma.query.count();
    const unreadQueries = await prisma.query.count({
      where: { status: "unread" },
    });
    const recentQueries = await prisma.query.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    });
    return { 
      success: true, 
      stats: { totalQueries, unreadQueries },
      recentQueries
    };
  } catch (error) {
    return { success: false, error: "Failed to fetch dashboard stats" };
  }
}
