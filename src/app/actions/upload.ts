"use server";

import { writeFile } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    
    if (!file) {
      return { success: false, error: "No file uploaded" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, ""); // Sanitize
    const filename = `${uniqueSuffix}-${originalName}`;
    
    // Save to public/uploads
    const uploadDir = join(process.cwd(), "public", "uploads");
    const path = join(uploadDir, filename);

    await writeFile(path, buffer);
    
    const url = `/uploads/${filename}`;
    
    return { success: true, url };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload file" };
  }
}
