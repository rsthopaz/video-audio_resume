<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class VideoController extends Controller
{
    public function index()
    {
        return view('upload');
    }

    public function upload(Request $request)
    {
        $request->validate([
            'video' => 'required|mimes:mp4,mov,avi,webm|max:51200', // max 50MB
        ]);

        // Simpan video
        $path = $request->file('video')->store('videos');
        $videoPath = storage_path('app/'.$path);

        // Konversi video ke audio WAV
        $audioPath = storage_path('app/audio.wav');
        exec("ffmpeg -i $videoPath -ar 16000 -ac 1 -c:a pcm_s16le $audioPath");

        // Jalankan whisper.cpp
        $whisperPath = env('WHISPER_PATH');
        $modelPath   = env('WHISPER_MODEL');

        $outputFile  = storage_path('app/transcript');

       exec("\"$whisperPath\" -m \"$modelPath\" -f \"$audioPath\" -otxt -of \"$outputFile\"");

        // Ambil hasil transkrip
        $transcript = file_get_contents($outputFile.'.txt') ?? "Gagal transkrip";

        // Kirim ke Gemini untuk diringkas
        $apiKey = env('GEMINI_API_KEY');

        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-goog-api-key' => $apiKey,
        ])->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", [
            "contents" => [
                [
                    "parts" => [
                        ["text" => "Ringkas teks berikut dalam bahasa Indonesia:\n\n".$transcript]
                    ]
                ]
            ]
        ]);

        $summary = $response->json()['candidates'][0]['content']['parts'][0]['text'] ?? 'Gagal meringkas';

        return view('result', compact('summary', 'transcript'));
    }
}
