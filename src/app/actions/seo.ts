"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getSeoSettings(pageRoute: string) {
  try {
    const settings = await prisma.seoSetting.findUnique({
      where: { pageRoute },
    });
    return { success: true, data: settings };
  } catch (error) {
    console.error("Error fetching SEO settings:", error);
    return { success: false, error: "Failed to fetch settings" };
  }
}

export async function getAllSeoPages() {
    try {
        const pages = await prisma.seoSetting.findMany({
            select: { pageRoute: true, id: true, title: true }
        });
        return { success: true, data: pages };
    } catch (error) {
        console.error("Error fetching pages:", error);
        return { success: false, error: "Failed to fetch pages" };
    }
}

export async function updateSeoSettings(pageRoute: string, data: {
  title: string;
  description: string;
  keywords: string;
  ogImage?: string;
}) {
  try {
    await prisma.seoSetting.upsert({
      where: { pageRoute },
      update: {
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogImage: data.ogImage,
      },
      create: {
        pageRoute,
        title: data.title,
        description: data.description,
        keywords: data.keywords,
        ogImage: data.ogImage,
      },
    });

    revalidatePath(pageRoute);
    return { success: true, message: "SEO settings updated successfully" };
  } catch (error) {
    console.error("Error updating SEO settings:", error);
    return { success: false, error: "Failed to update settings" };
  }
}
