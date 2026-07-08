import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Endpoint to handle local file upload & deletion
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Prepare directory path: public/uploads
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Generate unique name
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueFilename = `${timestamp}-${safeName}`;
    const filePath = path.join(uploadDir, uniqueFilename);

    // Save file
    await fs.writeFile(filePath, buffer);

    // Return access URL
    const imageUrl = `/uploads/${uniqueFilename}`;
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Erro ao salvar arquivo localmente." }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get("url");

    if (!imageUrl) {
      return NextResponse.json({ error: "URL da imagem não fornecida." }, { status: 400 });
    }

    // Only handle local uploads (URLs starting with /uploads/)
    if (!imageUrl.startsWith("/uploads/")) {
      return NextResponse.json({ message: "Imagem não é local. Nenhuma ação necessária." });
    }

    const filename = path.basename(imageUrl);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    const filePath = path.join(uploadDir, filename);

    // Safety check to verify file exists
    try {
      await fs.access(filePath);
      await fs.unlink(filePath);
      return NextResponse.json({ message: "Imagem removida com sucesso." });
    } catch (err) {
      console.warn(`File not found or couldn't be deleted: ${filePath}`, err);
      return NextResponse.json({ message: "Imagem não encontrada no disco, mas prosseguindo." });
    }
  } catch (error) {
    console.error("Deletion error:", error);
    return NextResponse.json({ error: "Erro ao excluir arquivo do disco." }, { status: 500 });
  }
}
