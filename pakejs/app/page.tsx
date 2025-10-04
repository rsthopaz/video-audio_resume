"use client";
import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/transcribe", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">🎧 Transkripsi Video/Audio</h1>
      <input
        type="file"
        accept="video/*,audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="bg-blue-600 text-black px-4 py-2 rounded ml-2"
      >
        {loading ? "Memproses..." : "Upload & Transkrip"}
      </button>

      {result && (
        <div className="mt-8 text-left">
          <h2 className="font-bold text-lg">📝 Hasil Transkrip:</h2>
          <pre className="bg-gray-100 p-3 rounded">{result.transcript}</pre>

          <h2 className="font-bold text-lg mt-4">📋 Ringkasan:</h2>
          <pre className="bg-gray-100 p-3 rounded">{result.summary}</pre>
        </div>
      )}
    </div>
  );
}
