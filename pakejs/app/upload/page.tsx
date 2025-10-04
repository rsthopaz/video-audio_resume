"use client";

import { useState } from "react";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  const [done, setDone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      alert("Importing from URL: " + url);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      localStorage.setItem("transcript", data.transcript);
      localStorage.setItem("summary", data.summary);
      setDone(true);

      // langsung pindah ke halaman transcript
      window.location.href = "/transcript";
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white min-h-screen w-screen overflow-y-auto">
      <div className="min-h-full bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl overflow-visible">
        <div className="flex flex-col h-full">
          {/* Navbar */}
          <div className="bg-gradient-to-b from-blue-500 to-purple-600 p-4 flex flex-row items-center justify-between">
            {/* Cancel */}
            <div className="bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition">
              <a href="/started" className="text-sm font-semibold mx-2 p-2">
                Cancel
              </a>
            </div>

            {/* Steps */}
            <nav className="flex flex-row items-center space-x-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">1</span>
                </div>
                <span className="text-white text-sm font-medium hidden sm:block">
                  Information
                </span>
              </div>

              <div className="w-8 h-0.5 bg-white"></div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">2</span>
                </div>
                <span className="text-white text-sm font-medium hidden sm:block">
                  Upload File
                </span>
              </div>

              <div className="w-8 h-0.5 bg-white/30"></div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 border-2 border-white/30 rounded-full flex items-center justify-center">
                  <span className="text-white/50 font-bold text-sm">3</span>
                </div>
                <span className="text-white/50 text-sm font-medium hidden sm:block">
                  Transcript
                </span>
              </div>
            </nav>

            {/* Back/Next */}
            <div className="flex flex-row space-x-2">
              <div className="bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition">
                <a href="/started" className="text-sm font-semibold mx-2 p-2">
                  Back
                </a>
              </div>
              {done && (
                <div className="bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition">
                  <a href="/transcript" className="text-sm font-semibold mx-2 p-2">
                    Next
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex-1 p-10 flex items-center justify-center">
            {!done ? (
              <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Upload Your Media
                  </h1>
                  <p className="text-sm text-gray-600 mb-8">
                    Drag and drop your files or paste a link to get started
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Drag & Drop */}
                  <div
                    className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <div className="p-8 text-center cursor-pointer">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Drop files here
                      </h3>
                      <input
                        type="file"
                        id="fileInput"
                        className="hidden"
                        accept=".mp3,.mp4,.wav,.m4a,.avi,.mov,.wmv,.flv"
                        multiple
                        onChange={handleFileChange}
                      />
                      <button
                        onClick={() =>
                          document.getElementById("fileInput")?.click()
                        }
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Choose Files
                      </button>
                    </div>
                  </div>

                  {/* URL Upload */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
                    <div className="p-8">
                      <form onSubmit={handleUrlSubmit} className="space-y-4">
                        <input
                          type="url"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                          placeholder="https://youtube.com/watch?v=..."
                          className="text-sm w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        />
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Import from URL
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                {/* File Preview */}
                {files.length > 0 && (
                  <div className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Selected Files
                      </h3>
                      <ul className="space-y-2">
                        {files.map((file, idx) => (
                          <li key={idx} className="text-gray-700 text-sm">
                            {file.name}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 pt-6 border-t border-gray-200 flex justify-center">
                        {!isUploading ? (
                          <button
                            onClick={handleUpload}
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
                          >
                            Start Transcription
                          </button>
                        ) : (
                          <div className="flex items-center space-x-3 text-gray-600">
                            <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                            <span className="italic">
                              Harap tunggu sebentar untuk proses mengolah videonya...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  ✅ Sudah selesai
                </h2>
                <a
                  href="/transcript"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Next →
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
