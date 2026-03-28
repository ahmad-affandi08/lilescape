"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = ["Semua", "Kopi", "Non-Kopi", "Makanan"];

const menuItems = [
  {
    name: "Signature Latte",
    desc: "Espresso pilihan dengan susu segar dan sentuhan vanilla, disajikan dengan latte art indah",
    price: "Rp 28.000",
    category: "Kopi",
    image: "/images/menu-latte.png",
    badge: "Best Seller",
  },
  {
    name: "Es Kopi Susu Gula Aren",
    desc: "Perpaduan sempurna espresso, susu segar, dan gula aren asli yang manis legit",
    price: "Rp 22.000",
    category: "Kopi",
    image: "/images/menu-es-kopi.png",
    badge: "Best Seller",
  },
  {
    name: "Chicken Rice Bowl",
    desc: "Nasi hangat dengan ayam panggang bumbu spesial, sayuran segar, dan saus rahasia",
    price: "Rp 35.000",
    category: "Makanan",
    image: "/images/menu-chicken-bowl.png",
    badge: null,
  },
  {
    name: "Pasta Carbonara",
    desc: "Pasta al dente dengan saus carbonara creamy, bacon crispy, dan taburan parmesan",
    price: "Rp 38.000",
    category: "Makanan",
    image: "/images/menu-pasta.png",
    badge: "New",
  },
  {
    name: "Cheesy Fries",
    desc: "Kentang goreng crispy dengan saus keju leleh dan bumbu spesial yang bikin nagih",
    price: "Rp 25.000",
    category: "Makanan",
    image: "/images/menu-snack.png",
    badge: null,
  },
  {
    name: "Matcha Latte",
    desc: "Matcha premium Jepang dengan susu segar, bisa disajikan panas atau dingin",
    price: "Rp 28.000",
    category: "Non-Kopi",
    image: "/images/menu-latte.png",
    badge: "New",
  },
];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filtered =
    activeCategory === "Semua"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="py-20 md:py-32 bg-cream relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
              Menu Pilihan
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-4">
              Menu <span className="text-accent-light">Unggulan</span> Kami
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Nikmati berbagai pilihan kopi spesialti dan menu eatery yang dibuat
              dengan bahan-bahan berkualitas dan penuh cinta
            </p>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat
                ? "bg-accent text-white shadow-lg shadow-accent/30"
                : "bg-white text-text-muted hover:bg-accent/10 hover:text-accent-light border border-warm-dark"
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} - Menu Lil' Escape Coffee & Eatery Sragen`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {item.badge && (
                    <span
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${item.badge === "Best Seller"
                        ? "bg-accent-light text-white"
                        : "bg-accent text-white"
                        }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-accent-light group-hover:text-accent-light transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-accent-light font-bold text-sm whitespace-nowrap ml-2">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.desc}
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
