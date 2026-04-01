"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import type { PublicMenuItem } from "../lib/menu";

type MenuSectionProps = {
  items: PublicMenuItem[];
};

const toRupiah = (price: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

const defaultMenuImage = "/noimages/noimages.png";

const getMenuImageSrc = (item: PublicMenuItem): string => {
  if (item.gambar_url && item.gambar_url.trim().length > 0) {
    return item.gambar_url;
  }

  return defaultMenuImage;
};

export default function MenuSection({ items }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("");

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (a.kategori_urutan !== b.kategori_urutan) {
          return a.kategori_urutan - b.kategori_urutan;
        }

        if (a.kategori !== b.kategori) {
          return a.kategori.localeCompare(b.kategori, "id");
        }

        return a.nama.localeCompare(b.nama, "id");
      }),
    [items]
  );

  const categories = useMemo(() => {
    const uniqueCategories: string[] = [];

    for (const item of sortedItems) {
      if (item.kategori.trim().length === 0) {
        continue;
      }

      if (!uniqueCategories.includes(item.kategori)) {
        uniqueCategories.push(item.kategori);
      }
    }

    return uniqueCategories;
  }, [sortedItems]);

  const activeCategory =
    selectedCategory && categories.includes(selectedCategory)
      ? selectedCategory
      : (categories[0] ?? "");

  const filtered = sortedItems.filter((item) => item.kategori === activeCategory);

  return (
    <section id="menu" className="relative overflow-hidden py-20 md:py-32 bg-accent">
      <div className="pointer-events-none absolute -top-24 -left-12 h-56 w-56 rounded-full bg-white/6 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.32 }}
          className="text-center mb-14 relative py-6"
        >
          {/* Background Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <span
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-transparent uppercase whitespace-nowrap opacity-[0.05] tracking-widest"
              style={{ WebkitTextStroke: "2px #0d4a35" }}
            >
              OUR MENU
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-white/80 font-medium text-sm tracking-[0.2em] uppercase">
              Menu Pilihan
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Menu <span className="text-gold-light">Unggulan</span> Kami
            </h2>
            <p className="text-white/80 max-w-xl mx-auto">
              Nikmati berbagai pilihan kopi spesialti dan menu eatery yang dibuat
              dengan bahan-bahan berkualitas dan penuh cinta
            </p>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, delay: 0.04 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? "bg-white text-accent shadow-lg shadow-black/20"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory || "menu"}
            initial={{ opacity: 0, y: 12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-12"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.26, delay: i * 0.04 }}
                className="group relative flex flex-col items-center text-center transition-transform duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-36 w-full max-w-55 sm:h-44 md:h-48">
                  <div className="absolute inset-0 rounded-full bg-linear-to-b from-white via-[#f8f8f8] to-[#ececec] shadow-[0_12px_26px_rgba(0,0,0,0.22)]" />
                  <div className="absolute inset-2 rounded-full border border-[#d9d9d9]" />
                  <Image
                    src={getMenuImageSrc(item)}
                    alt={`${item.nama} - Menu Lil' Escape Coffee & Eatery Sragen`}
                    fill
                    className="z-10 object-contain p-3 drop-shadow-[0_12px_10px_rgba(0,0,0,0.3)] group-hover:scale-105 transition-transform duration-500"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="mt-3 w-full max-w-65 px-1">
                  <p className="mb-1 text-[10px] sm:text-xs tracking-[0.18em] uppercase text-white/60">
                    {item.kategori}
                  </p>
                  <h3 className="font-serif text-white text-[1.05rem] sm:text-[1.25rem] font-bold leading-[1.05] uppercase wrap-break-word tracking-tight">
                    {item.nama}
                  </h3>
                  <p className="mt-1 text-gold-light text-base sm:text-lg font-semibold leading-tight">
                    {toRupiah(item.harga)}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
