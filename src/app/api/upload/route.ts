import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "motorrax/models";
    const modelSlug = (formData.get("slug") as string) || "custom";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const publicId = `${folder}/${modelSlug}/${pathClean(file.name.replace(/\.[^/.]+$/, ""))}_${Date.now()}`;

    const uploadPromise = new Promise<{ secure_url: string; public_id: string }>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: `${folder}/${modelSlug}`,
            resource_type: "image",
            overwrite: true,
          },
          (error, result) => {
            if (error || !result) {
              return reject(error || new Error("Upload failed"));
            }
            resolve({ secure_url: result.secure_url, public_id: result.public_id });
          }
        )
        .end(buffer);
    });

    const result = await uploadPromise;

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err: any) {
    console.error("Cloudinary Upload Error:", err);
    return NextResponse.json({ error: err.message || "Failed to upload image" }, { status: 500 });
  }
}

function pathClean(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9_-]/g, "-");
}
