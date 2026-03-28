"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.858 15.355-5.858 21.213 0" />
      </svg>
    ),
    title: "WiFi Super Cepat",
    desc: "Internet stabil dan cepat untuk mendukung produktivitas kerja remote kamu",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Tempat Nyaman",
    desc: "Interior cozy dengan pencahayaan hangat, kursi empuk, dan AC sejuk sepanjang hari",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Harga Terjangkau",
    desc: "Menu berkualitas premium dengan harga yang ramah di kantong mahasiswa dan pekerja",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Cocok untuk Semua",
    desc: "Tempat ideal untuk kerja, nongkrong bareng teman, atau makan bersama keluarga",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function WhyChooseUs() {
  return (
    <section className="py-20 md:py-32 bg-cream relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-40 h-40 border border-accent/10 rounded-full" />
      <div className="absolute bottom-10 right-20 w-64 h-64 border border-accent/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-accent/5 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative py-6"
        >
          {/* Background Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-0">
            <span 
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-transparent uppercase whitespace-nowrap opacity-[0.05] tracking-widest"
              style={{ WebkitTextStroke: "2px #0d4a35" }}
            >
              FEATURES
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
              Kenapa Kami
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-4">
              Kenapa Harus <span className="text-accent-light">Lil&apos; Escape</span>?
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Lebih dari sekedar kedai kopi — kami adalah tempat pelarian kecilmu
              dari rutinitas yang melelahkan
            </p>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className={`group p-8 rounded-2xl bg-white border border-warm-dark/30 hover:shadow-lg hover:border-accent/30 transition-all duration-500 ${i === 4 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2" : ""
                }`}
            >
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent-light mb-5 group-hover:bg-accent-light group-hover:text-white transition-all duration-300">
                {f.icon}
              </div>
              <h3 className="text-accent-light font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
