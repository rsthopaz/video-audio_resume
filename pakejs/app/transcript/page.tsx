"use client";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function TranscriptPage() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    setTranscript(localStorage.getItem("transcript") || "No transcript found.");
    setSummary(localStorage.getItem("summary") || "No summary found.");
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
    });

    const margin = 15;
    let y = margin;

    doc.setFontSize(18);
    doc.text("Transcript Report", margin, y);
    y += 10;

    doc.setFontSize(14);
    doc.text("Transcript:", margin, y);
    y += 8;

    doc.setFontSize(11);
    const transcriptLines = doc.splitTextToSize(transcript, 180);
    doc.text(transcriptLines, margin, y);
    y += transcriptLines.length * 6 + 10;

    doc.setFontSize(14);
    doc.text("Summary:", margin, y);
    y += 8;

    const summaryLines = doc.splitTextToSize(summary, 180);
    doc.setFontSize(11);
    doc.text(summaryLines, margin, y);

    doc.save("transcript.pdf");
  };

  // 🔹 Fungsi bantu untuk otomatis bagi teks panjang jadi paragraf
  const splitIntoParagraphs = (text: string): string[] => {
    // Jika teks pendek, langsung satu paragraf
    if (text.length < 600) return [text.trim()];

    const sentences = text.split(/(?<=[.?!])\s+/); // pisah berdasarkan titik/koma
    const paragraphs: string[] = [];
    let current = "";

    for (const s of sentences) {
      current += s + " ";
      if (current.length > 1000) { // batas panjang tiap paragraf
        paragraphs.push(current.trim());
        current = "";
      }
    }

    if (current.trim()) paragraphs.push(current.trim());
    return paragraphs;
  };

  const renderParagraphs = (text: string) =>
    splitIntoParagraphs(text).map((para, i) => (
      <p
        key={i}
        className="text-sm text-gray-700 mb-4 leading-relaxed text-justify indent-8"
      >
        {para}
      </p>
    ));

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white min-h-screen w-screen overflow-y-auto p-10">
      <div className="min-h-full bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl overflow-visible">
        <div className="flex flex-col min-h-full">
          {/* Navbar */}
          <div className="bg-gradient-to-b from-blue-500 to-purple-600 p-4 flex flex-row items-center justify-between">
            <div className="bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition">
              <a href="/upload" className="text-sm font-semibold mx-2 p-2">
                Back
              </a>
            </div>
            <h2 className="text-white font-semibold">Transcript</h2>
            <div></div>
          </div>

          {/* Transcript Result */}
          <div className="flex-1 p-10 flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Your Transcript is Ready
                </h1>
              </div>

              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Transcript
                </h3>
                {renderParagraphs(transcript)}

                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
                  Summary
                </h3>
                {/* {renderParagraphs(summary)} */}

                <button
                  onClick={handleDownloadPDF}
                  className="mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition shadow-md hover:shadow-lg"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
