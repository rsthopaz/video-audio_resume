import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const transcriptDir = path.join(process.cwd(), "public", "transcripts");
    const transcript = await readFile(path.join(transcriptDir, "latest.txt"), "utf-8");
    const summary = await readFile(path.join(transcriptDir, "latest_summary.txt"), "utf-8");

    // generate PDF dengan pdfkit
    const PDFDocument = require("pdfkit");
    const doc = new PDFDocument();
    const chunks: Buffer[] = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => {});

    doc.fontSize(18).text("📄 Hasil Transkrip", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text("Transkrip Lengkap:", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(transcript);
    doc.addPage();
    doc.fontSize(14).text("Ringkasan:", { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(summary);

    doc.end();

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=transcript.pdf",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: "Transkrip belum tersedia" }, { status: 404 });
  }
}
