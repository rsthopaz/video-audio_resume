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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Transcript
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap mb-6">
                  {transcript}
                </p>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Summary
                </h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap mb-6">
                  {summary}
                </p>

                <button
                  onClick={handleDownloadPDF}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition shadow-md hover:shadow-lg"
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
