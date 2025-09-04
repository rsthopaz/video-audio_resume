<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\VideoController;
use App\Http\Controllers\TranscribeController;


Route::get('/', [TranscribeController::class, 'index']);
Route::post('/transcribe', [TranscribeController::class, 'store'])->name('transcribe.store');
