#!/bin/bash

# Pindah ke direktori tempat script dijalankan (root project)
cd "$(dirname "$0")"

# Daftar file yang akan dikompres
IMAGES=(
    "public/images/about.jpg"
    "public/images/hero-bg.jpg"
    "public/images/hero-bg1.jpg"
    "public/images/hero-bg2.jpg"
)

echo "📦 Memeriksa apakah 'jpegoptim' sudah terinstall..."
if ! command -v jpegoptim &> /dev/null; then
    echo "⚠️ 'jpegoptim' belum terinstall. Mencoba meng-install (mungkin butuh password sudo)..."
    sudo apt-get update
    sudo apt-get install -y jpegoptim
fi

echo "----------------------------------------"
echo "Ukuran file SEBELUM kompresi:"
ls -lh "${IMAGES[@]}" 2>/dev/null | awk '{print $5, $9}'
echo "----------------------------------------"

echo "⏳ Sedang mengkompresi gambar (kualitas visual tetap terjaga)..."
for img in "${IMAGES[@]}"; do
    if [ -f "$img" ]; then
        # --max=82-85 adalah sweet spot: kualitas foto tetap terlihat sempurna
        # --strip-all menghapus data meta (EXIF) kamera yang bikin file berat
        jpegoptim --max=85 --strip-all "$img"
    else
        echo "❌ File tidak ditemukan: $img"
    fi
done

echo "----------------------------------------"
echo "Ukuran file SETELAH kompresi:"
ls -lh "${IMAGES[@]}" 2>/dev/null | awk '{print $5, $9}'
echo "----------------------------------------"

echo "🎉 Selesai! Ukuran background dan foto about jauh lebih ringan sekarang."
