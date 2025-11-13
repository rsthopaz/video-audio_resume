"use client";

import { useState } from "react";
const LANGUAGES: Record<string, string> = {
  en: "english",
  zh: "chinese",
  de: "german",
  es: "spanish",
  ru: "russian",
  ko: "korean",
  fr: "french",
  ja: "japanese",
  pt: "portuguese",
  tr: "turkish",
  pl: "polish",
  ca: "catalan",
  nl: "dutch",
  ar: "arabic",
  sv: "swedish",
  it: "italian",
  id: "indonesian",
  hi: "hindi",
  fi: "finnish",
  vi: "vietnamese",
  he: "hebrew",
  uk: "ukrainian",
  el: "greek",
  ms: "malay",
  cs: "czech",
  ro: "romanian",
  da: "danish",
  hu: "hungarian",
  ta: "tamil",
  no: "norwegian",
  th: "thai",
  ur: "urdu",
  hr: "croatian",
  bg: "bulgarian",
  lt: "lithuanian",
  la: "latin",
  mi: "maori",
  ml: "malayalam",
  cy: "welsh",
  sk: "slovak",
  te: "telugu",
  fa: "persian",
  lv: "latvian",
  bn: "bengali",
  sr: "serbian",
  az: "azerbaijani",
  sl: "slovenian",
  kn: "kannada",
  et: "estonian",
  mk: "macedonian",
  br: "breton",
  eu: "basque",
  is: "icelandic",
  hy: "armenian",
  ne: "nepali",
  mn: "mongolian",
  bs: "bosnian",
  kk: "kazakh",
  sq: "albanian",
  sw: "swahili",
  gl: "galician",
  mr: "marathi",
  pa: "punjabi",
  si: "sinhala",
  km: "khmer",
  sn: "shona",
  yo: "yoruba",
  so: "somali",
  af: "afrikaans",
  oc: "occitan",
  ka: "georgian",
  be: "belarusian",
  tg: "tajik",
  sd: "sindhi",
  gu: "gujarati",
  am: "amharic",
  yi: "yiddish",
  lo: "lao",
  uz: "uzbek",
  fo: "faroese",
  ht: "haitian creole",
  ps: "pashto",
  tk: "turkmen",
  nn: "nynorsk",
  mt: "maltese",
  sa: "sanskrit",
  lb: "luxembourgish",
  my: "myanmar",
  bo: "tibetan",
  tl: "tagalog",
  mg: "malagasy",
  as: "assamese",
  tt: "tatar",
  haw: "hawaiian",
  ln: "lingala",
  ha: "hausa",
  ba: "bashkir",
  jw: "javanese",
  su: "sundanese",
  yue: "cantonese",
};

const sortedLanguages = Object.entries(LANGUAGES).sort((a, b) =>
  a[1].localeCompare(b[1])
);
export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [url, setUrl] = useState("");
  const [done, setDone] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState({ language: "auto" });

  // Tambahan state untuk parameter
  const [denoise, setDenoise] = useState(false);
  const [aggressiveDenoise, setAggressiveDenoise] = useState(false);
  const [forceWav, setForceWav] = useState(false);
  const [transcriberModel, setTranscriberModel] = useState("small");
  const [chunkSize, setChunkSize] = useState(2000);
  const [language, setLanguage] = useState("id");
  const [showAdvanced, setShowAdvanced] = useState(false);

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
    formData.append("denoise", String(denoise));
    formData.append("aggressive_denoise", String(aggressiveDenoise));
    formData.append("force_wav", String(forceWav));
    formData.append("transcriber_model", transcriberModel);
    formData.append("chunk_size", String(chunkSize));

    if (form.language && form.language !== "auto") {
      formData.append("language", form.language);
    }

    try {
      const res = await fetch("https://naabingg-summarize.hf.space/process", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error(`Upload failed (${res.status})`);

      const data = await res.json();
      console.log("=== RESPONSE FROM API ===");
      console.log(data); // pastikan ini tampil dalam bahasa Jerman
      console.log(data.transcript);
      console.log(data.summary);
      // Hapus hasil lama agar tidak tertukar
      localStorage.removeItem("transcript");
      localStorage.removeItem("summary");

      localStorage.setItem("transcript", data.transcript || "");
      localStorage.setItem("summary", data.summary || "");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setDone(true);
      window.location.href = "/transcript";
    } catch (err) {
      console.error(err);
      alert("Upload gagal: " + err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-200 to-white min-h-screen max-w-screen ">
      <div className="min-h-screen bg-white/90 backdrop-blur-sm shadow-lg overflow-visible">
        <div className="flex flex-col">
          {/* Navbar */}
          <div className="bg-gradient-to-b from-blue-500 to-purple-600 p-4 flex flex-row items-center justify-between">
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

            <div className="w-20 flex justify-end">
              {done && (
                <div className="bg-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition">
                  <a
                    href="/transcript"
                    className="text-sm font-semibold mx-2 p-2"
                  >
                    Next
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Upload Area */}
          <div className="flex flex-col items-center justify-center p-10">
            {!done ? (
              <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    Upload Your Media
                  </h1>
                  <p className="text-sm text-gray-600 mb-8">
                    Drag and drop your files to get started
                  </p>
                </div>

                <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
                  <div
                    className="bg-white rounded-2xl shadow-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-300 flex flex-col justify-center items-center text-center w-full h-64 cursor-pointer"
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
                      <p className="text-xs text-gray-500 mt-3">
                      Supported formats: MP3, MP4, WAV, M4A, AVI, MOV, WMV, FLV
                      </p>
                    </div>
                  </div>

                  {/* <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
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
                  </div> */}
                </div>

                {/* Parameter Settings */}
                {files.length > 0 && (
                  <div className="mt-8">
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                      {/* Dropdown Header */}
                      <button
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-800">
                          Advanced Settings
                        </h3>
                        <svg
                          className={`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                            showAdvanced ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>

                      {/* Dropdown Content */}
                      {showAdvanced && (
                        <div className="px-6 pb-6 border-t border-gray-200">
                          <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={denoise}
                                onChange={() => setDenoise(!denoise)}
                              />
                              <span className="text-sm text-gray-700">
                                Denoise
                              </span>
                            </label>

                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={aggressiveDenoise}
                                onChange={() =>
                                  setAggressiveDenoise(!aggressiveDenoise)
                                }
                              />
                              <span className="text-sm text-gray-700">
                                Aggressive Denoise
                              </span>
                            </label>

                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={forceWav}
                                onChange={() => setForceWav(!forceWav)}
                              />
                              <span className="text-sm text-gray-700">
                                Force WAV
                              </span>
                            </label>

                            <div>
                              <label className="text-sm text-gray-700">
                                Transcriber Model
                              </label>
                              <select
                                value={transcriberModel}
                                onChange={(e) =>
                                  setTranscriberModel(e.target.value)
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500"
                              >
                                <option value="tiny">tiny</option>
                                <option value="small">small</option>
                                <option value="medium">medium</option>
                                <option value="large">large</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-sm text-gray-700">
                                Chunk Size
                              </label>
                              <input
                                type="number"
                                value={chunkSize}
                                onChange={(e) =>
                                  setChunkSize(parseInt(e.target.value))
                                }
                                className="w-full mt-1 px-3 py-2 border border-gray-300 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500"
                              />
                            </div>

                            <div>
                              <div>
                                <label className="text-sm text-gray-700">
                                  Language
                                </label>
                                <select
                                  className="w-full p-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                  value={form.language}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      language: e.target.value,
                                    })
                                  }
                                >
                                  <option value="auto">Auto Detect</option>
                                  {sortedLanguages.map(([code, name]) => (
                                    <option key={code} value={code}>
                                      {name.charAt(0).toUpperCase() +
                                        name.slice(1)}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* File Preview & Upload */}
                {files.length > 0 && (
                  <div className="mt-6">
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
                              Harap tunggu sebentar untuk proses mengolah
                              videonya...
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

