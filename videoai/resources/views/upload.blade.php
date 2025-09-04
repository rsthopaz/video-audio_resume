<!-- resources/views/upload.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Upload Video untuk Transkrip & Ringkas</title>
</head>
<body>
    <h1>Upload Video / Audio</h1>
    <form action="/upload" method="POST" enctype="multipart/form-data">
        @csrf
        <input type="file" name="file" required>
        <button type="submit">Upload & Proses</button>
    </form>
    @if(session('error'))
        <p style="color:red">{{ session('error') }}</p>
    @endif
</body>
</html>
