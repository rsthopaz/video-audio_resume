import sys
import argparse
from transformers import pipeline

# daftar model yang bisa dipilih
AVAILABLE_MODELS = {
    "bart": "facebook/bart-large-cnn",
    "pegasus": "google/pegasus-xsum",
    "t5": "t5-large",
    "distilbart": "sshleifer/distilbart-cnn-12-6",
    # "led": "allenai/led-base-16384",
    "mbart": "facebook/mbart-large-cc25"
}

def summarize_text(text, model_name):
    if model_name not in AVAILABLE_MODELS:
        print(f"[ERROR] Model '{model_name}' tidak tersedia.")
        print("Pilih salah satu:", ", ".join(AVAILABLE_MODELS.keys()))
        sys.exit(1)

    model_id = AVAILABLE_MODELS[model_name]
    print(f"[INFO] Using model: {model_id}")

    # load pipeline
    summarizer = pipeline(
        "summarization",
        model=model_id,
        tokenizer=model_id,
        device=-1  # pakai CPU, ubah ke 0 kalau ada GPU
    )

    # batas input berdasarkan model
    max_input = 1024 if model_name != "led" else 4096
    inputs = text[:max_input * 4]

    # jalankan ringkasan
    summary = summarizer(
        inputs,
        max_length=300,
        min_length=50,
        do_sample=False
    )

    return summary[0]['summary_text']

def main():
    parser = argparse.ArgumentParser(description="Summarize text with different models")
    parser.add_argument("--model", type=str, required=True,
                        help="pilih model: bart, pegasus, t5, distilbart, led, mbart")
    parser.add_argument("--text", type=str, required=True, help="teks yang mau diringkas")

    args = parser.parse_args()

    text = args.text
    model = args.model.lower()

    summary = summarize_text(text, model)

    print("\n----- SUMMARY -----")
    print(summary)

if __name__ == "__main__":
    main()
