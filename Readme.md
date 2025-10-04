---WHISPER.CPP---





hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing$ **mkdir whisper**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing$ **cd whisper/**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper$ **git clone https://github.com/ggerganov/whisper.cpp**

**cd whisper.cpp**

**make**



(kalo engga bisa make pake ini)

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp$ **sudo apt install cmake**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper$ **make**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp$ **sudo apt install ffmpeg**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp$ **bash ./models/download-ggml-model.sh base.en**

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp$ **sudo apt update**

**sudo apt install build-essential cmake ffmpeg -y**



hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp$ **./build/bin/whisper-cli -m models/ggml-base.en.bin -f samples/jfk.wav**



(kalo bisa nanti outputnya kayak gini)

whisper\_init\_from\_file\_with\_params\_no\_state: loading model from 'models/ggml-base.en.bin'

whisper\_init\_with\_params\_no\_state: use gpu    = 1

whisper\_init\_with\_params\_no\_state: flash attn = 0

whisper\_init\_with\_params\_no\_state: gpu\_device = 0

whisper\_init\_with\_params\_no\_state: dtw        = 0

whisper\_init\_with\_params\_no\_state: devices    = 1

whisper\_init\_with\_params\_no\_state: backends   = 1

whisper\_model\_load: loading model

whisper\_model\_load: n\_vocab       = 51864

whisper\_model\_load: n\_audio\_ctx   = 1500

whisper\_model\_load: n\_audio\_state = 512

whisper\_model\_load: n\_audio\_head  = 8

whisper\_model\_load: n\_audio\_layer = 6

whisper\_model\_load: n\_text\_ctx    = 448

whisper\_model\_load: n\_text\_state  = 512

whisper\_model\_load: n\_text\_head   = 8

whisper\_model\_load: n\_text\_layer  = 6

whisper\_model\_load: n\_mels        = 80

whisper\_model\_load: ftype         = 1

whisper\_model\_load: qntvr         = 0

whisper\_model\_load: type          = 2 (base)

whisper\_model\_load: adding 1607 extra tokens

whisper\_model\_load: n\_langs       = 99

whisper\_model\_load:          CPU total size =   147.37 MB

whisper\_model\_load: model size    =  147.37 MB

whisper\_backend\_init\_gpu: no GPU found

whisper\_init\_state: kv self size  =    6.29 MB

whisper\_init\_state: kv cross size =   18.87 MB

whisper\_init\_state: kv pad  size  =    3.15 MB

whisper\_init\_state: compute buffer (conv)   =   16.28 MB

whisper\_init\_state: compute buffer (encode) =   85.88 MB

whisper\_init\_state: compute buffer (cross)  =    4.66 MB

whisper\_init\_state: compute buffer (decode) =   96.37 MB



system\_info: n\_threads = 4 / 8 | WHISPER : COREML = 0 | OPENVINO = 0 | CPU : SSE3 = 1 | SSSE3 = 1 | AVX = 1 | AVX2 = 1 | F16C = 1 | FMA = 1 | BMI2 = 1 | OPENMP = 1 | REPACK = 1 |



main: processing 'samples/jfk.wav' (176000 samples, 11.0 sec), 4 threads, 1 processors, 5 beams + best of 5, lang = en, task = transcribe, timestamps = 1 ...





\[00:00:00.000 --> 00:00:11.000]   And so my fellow Americans, ask not what your country can do for you, ask what you can do for your country.



whisper\_print\_timings:     load time =   842.51 ms

whisper\_print\_timings:     fallbacks =   0 p /   0 h

whisper\_print\_timings:      mel time =    20.74 ms

whisper\_print\_timings:   sample time =    99.34 ms /   133 runs (     0.75 ms per run)

whisper\_print\_timings:   encode time =  1929.47 ms /     1 runs (  1929.47 ms per run)

whisper\_print\_timings:   decode time =    21.19 ms /     3 runs (     7.06 ms per run)

whisper\_print\_timings:   batchd time =   324.07 ms /   126 runs (     2.57 ms per run)

whisper\_print\_timings:   prompt time =     0.00 ms /     1 runs (     0.00 ms per run)

whisper\_print\_timings:    total time =  3359.45 ms





hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ **sudo nano /etc/php/8.2/cli/php.ini**



(ubah ini, biar sizenya gede buat up video)

upload\_max\_filesize = 200M

post\_max\_size = 200M

max\_execution\_time = 300



----LARAVEL---

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ sudo apt install php8.2 php8.2-cli php8.2-common php8.2-mysql php8.2-xml php8.2-mbstring php8.2-curl unzip -y



hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ sudo update-alternatives --set php /usr/bin/php8.2

php -v



hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ rm -rf vendor

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ composer install

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ php artisan key:generate



(kalo mau run tinggal)

hohohihe@LAPTOP-U5VK2MHE:/mnt/d/Thopaz/Kuliah/PBKK/testing/videoai$ php artisan serve



(JANGAN LUPA GANTI PATH DI TranscribeController.php ubah

&nbsp;       $whisperPath = '/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/build/bin/whisper-cli';

&nbsp;       $modelPath   = '/mnt/d/Thopaz/Kuliah/PBKK/testing/whisper/whisper.cpp/models/ggml-base.en.bin';



)



ganti sama path kalian



