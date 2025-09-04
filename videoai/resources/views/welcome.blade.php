<!DOCTYPE html>
<html>
<head>
    <title>Video Transcribe & Summarize</title>
</head>
<body>
    <h1>Upload Video atau Audio</h1>

    {{-- tampilkan error kalau ada --}}
    @if(session('error'))
        <p style="color:red">{{ session('error') }}</p>
    @endif

    <form action="{{ route('transcribe.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="file" accept="audio/*,video/*" required>
        <button type="submit">Upload & Proses</button>
    </form>
</body>
</html>
