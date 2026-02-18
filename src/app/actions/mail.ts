"use server";

import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// --- Configuration Management ---

export async function getMailConfig() {
  try {
    const config = await prisma.mailConfig.findFirst();
    return { success: true, data: config };
  } catch (error) {
    return { success: false, error: "Failed to fetch mail config" };
  }
}

export async function updateMailConfig(data: {
  host: string;
  port: number;
  user: string;
  password?: string; // Optional if not changing password
  fromEmail: string;
  senderName: string; // New field
  adminEmail: string;
  adminSubject?: string;
  adminBody?: string;
  customerSubject?: string;
  customerBody?: string;
  bookingAdminSubject?: string;
  bookingAdminBody?: string;
  bookingCustomerSubject?: string;
  bookingCustomerBody?: string;
}) {
  try {
    const existing = await prisma.mailConfig.findFirst();

    if (existing) {
      await prisma.mailConfig.update({
        where: { id: existing.id },
        data: {
          host: data.host,
          port: data.port,
          user: data.user,
          // Only update password if provided
          ...(data.password ? { password: data.password } : {}),
          fromEmail: data.fromEmail,
          senderName: data.senderName,
          adminEmail: data.adminEmail,
          adminSubject: data.adminSubject,
          adminBody: data.adminBody,
          customerSubject: data.customerSubject,
          customerBody: data.customerBody,
          bookingAdminSubject: data.bookingAdminSubject,
          bookingAdminBody: data.bookingAdminBody,
          bookingCustomerSubject: data.bookingCustomerSubject,
          bookingCustomerBody: data.bookingCustomerBody,
        },
      });
    } else {
      if (!data.password) throw new Error("Password required for initial setup");
      await prisma.mailConfig.create({
        data: {
          host: data.host,
          port: data.port,
          user: data.user,
          password: data.password,
          fromEmail: data.fromEmail,
          senderName: data.senderName || "Brent Linen",
          adminEmail: data.adminEmail,
          adminSubject: data.adminSubject || "New Website Query from {{name}}",
          adminBody: data.adminBody,
          customerSubject: data.customerSubject || "We received your message - Brent Linen",
          customerBody: data.customerBody,
          bookingAdminSubject: data.bookingAdminSubject || "New Booking Request from {{name}}",
          bookingAdminBody: data.bookingAdminBody,
          bookingCustomerSubject: data.bookingCustomerSubject || "Booking Confirmation - Brent Linen",
          bookingCustomerBody: data.bookingCustomerBody,
        },
      });
    }
    
    revalidatePath("/admin/mail");
    return { success: true };
  } catch (error) {
    console.error("Update Mail Config Error:", error);
    return { success: false, error: "Failed to update mail configuration" };
  }
}

// --- Email Sending Utility ---

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const config = await prisma.mailConfig.findFirst();

    if (!config) {
      console.error("No mail configuration found");
      return { success: false, error: "Mail not configured" };
    }

    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465, // true for 465, false for other ports (587 uses STARTTLS)
      auth: {
        user: config.user,
        pass: config.password,
      },
      tls: {
        rejectUnauthorized: false // Helps with some self-signed certs or strict firewalls
      }
    });

    await transporter.sendMail({
      from: `"${config.fromEmail}" <${config.user}>`, // Use user auth email as sender to avoid spoofing blocks
      to,
      subject,
      html,
    });

    return { success: true };
  } catch (error: any) {
    console.error("Send Email Error:", error);
    // Return the actual error message for debugging
    return { success: false, error: error.message || "Failed to send email" };
  }
}
