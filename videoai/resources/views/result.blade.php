<!-- resources/views/result.blade.php -->
<!DOCTYPE html>
<html>
<head>
    <title>Hasil Transkrip & Ringkasan</title>
</head>
<body>
    <h1>Hasil Transkrip</h1>
    <pre>{{ $transcript }}</pre>

    <h1>Ringkasan</h1>
    <p>{{ $summary }}</p>

    <a href="/upload">Kembali</a>
</body>
</html>
