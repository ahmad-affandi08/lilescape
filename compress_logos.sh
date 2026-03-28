#!/bin/bash

# Pindah ke direktori tempat script dijalankan (root project)
cd "$(dirname "$0")"

LOGO1="public/assets/logo/logo.png"
LOGO2="public/assets/logo/logo2.png"

# Pastikan file ada sebelum kompresi
if [ ! -f "$LOGO1" ] || [ ! -f "$LOGO2" ]; then
    echo "❌ Error: File logo tidak ditemukan di folder public/assets/logo/"
    exit 1
fi

echo "📦 Memeriksa apakah 'pngquant' sudah terinstall..."
if ! command -v pngquant &> /dev/null; then
    echo "⚠️ 'pngquant' belum terinstall. Mencoba meng-install (mungkin butuh password sudo)..."
    sudo apt-get update
    sudo apt-get install -y pngquant
fi

echo "----------------------------------------"
echo "Ukuran file sebelum kompresi:"
ls -lh "$LOGO1" "$LOGO2" | awk '{print $5, $9}'
echo "----------------------------------------"

echo "⏳ Mengkompresi logo.png..."
# --ext .png --force artinya menimpa file aslinya
# --speed 1 dan --quality 65-80 biasanya menurunkan size PNG dari MB ke KB
pngquant --quality=65-80 --speed 1 --ext .png --force "$LOGO1"
echo "✅ Selesai kompresi logo.png"

echo "⏳ Mengkompresi logo2.png..."
pngquant --quality=65-80 --speed 1 --ext .png --force "$LOGO2"
echo "✅ Selesai kompresi logo2.png"

echo "----------------------------------------"
echo "Ukuran file SETELAH kompresi:"
ls -lh "$LOGO1" "$LOGO2" | awk '{print $5, $9}'
echo "----------------------------------------"

echo "🎉 Selesai! Ukuran logo jamin jauh lebih ringan sekarang."
