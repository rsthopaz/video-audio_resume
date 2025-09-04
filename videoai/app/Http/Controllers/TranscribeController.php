<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Illuminate\Support\Facades\Http;

class TranscribeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:mp4,avi,mov,mp3,wav|max:204800', 
        ]);
        ini_set('max_execution_time', 300); 

        $path = $request->file('file')->store('uploads');
        $fullPath = storage_path('app/' . $path);


        // GANTI PATHNYA GESS

        $whisperPath = '/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/build/bin/whisper-cli';
        $modelPath   = '/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/models/ggml-base.en.bin';

        // Kalau format video → convert ke WAV
        $ext = strtolower($request->file('file')->getClientOriginalExtension());
        $audioPath = $fullPath;

        if (in_array($ext, ['mp4','avi','mov'])) {
            $audioPath = $fullPath . '.wav';
            $ffmpegCmd = "ffmpeg -i \"$fullPath\" -ar 16000 -ac 1 -y \"$audioPath\"";
            shell_exec($ffmpegCmd);
        }

        $outputTxt = $audioPath . '.txt';

        $process = Process::fromShellCommandline(
            "$whisperPath -m $modelPath -f \"$audioPath\" -otxt"
        );
        $process->run();

        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        $transcript = file_exists($outputTxt) ? file_get_contents($outputTxt) : 'Transkrip tidak ditemukan.';

        $geminiApiKey = env('GEMINI_API_KEY');
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-goog-api-key' => $geminiApiKey,
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', [
            'contents' => [
                [
                    'parts' => [
                        ['text' => "Ringkas teks berikut dalam bahasa Indonesia:\n\n" . $transcript]
                    ]
                ]
            ]
        ]);

        $summary = $response->json('candidates.0.content.parts.0.text') ??  $response->body();

        return view('result', compact('transcript', 'summary'));
    }
}
