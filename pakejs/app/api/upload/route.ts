import { NextResponse } from "next/server";
import { writeFile, unlink, readFile, mkdir } from "fs/promises";
import path from "path";
import { spawn } from "child_process";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";

ffmpeg.setFfmpegPath("/usr/bin/ffmpeg");

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Simpan file sementara
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, file.name);
    await writeFile(filePath, buffer);

    // Konversi ke wav bila video
    const ext = path.extname(file.name).toLowerCase();
    let audioPath = filePath;
    if ([".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
      audioPath = filePath + ".wav";
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .audioChannels(1)
          .audioFrequency(16000)
          .toFormat("wav")
          .on("end", resolve)
          .on("error", reject)
          .save(audioPath);
      });
    }

    // Jalankan whisper-cli
    const whisperPath =
      "/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/build/bin/whisper-cli";
    const modelPath =
      "/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/models/ggml-small.bin";

    const whisperProc = spawn(whisperPath, ["-m", modelPath, "-f", audioPath, "-otxt"]);

    let stderr = "";
    whisperProc.stderr.on("data", (data) => (stderr += data.toString()));

    await new Promise<void>((resolve, reject) => {
      whisperProc.on("close", (code) =>
        code === 0 ? resolve() : reject(new Error(stderr))
      );
    });

    // Baca hasil transkrip
    const transcriptPath = audioPath + ".txt";
    let transcript = "Transkrip tidak ditemukan.";
    try {
      transcript = await readFile(transcriptPath, "utf-8");
    } catch {}

    // Ringkas dengan Gemini API
    const geminiKey = process.env.GEMINI_API_KEY!;
    const summaryRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": geminiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Ringkas teks berikut dalam bahasa Indonesia:\n\n${transcript}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const summaryJson = await summaryRes.json();
    const summary =
      summaryJson?.candidates?.[0]?.content?.parts?.[0]?.text ||
      summaryJson?.error?.message ||
      "Ringkasan tidak ditemukan.";

    // Bersihkan file sementara
    await unlink(filePath).catch(() => {});
    await unlink(audioPath).catch(() => {});
    await unlink(transcriptPath).catch(() => {});

    // Kirim hasil ke frontend
    return NextResponse.json({ transcript, summary });
  } catch (err: any) {
    console.error("Error in /api/upload:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
