"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ),
    title: "Fresh Roasted",
    desc: "Biji kopi kami dipanggang segar setiap hari untuk menjaga cita rasa terbaik",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Cozy Workspace",
    desc: "Tempat nyaman untuk bekerja remote dengan WiFi cepat dan colokan di setiap meja",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: "Family Friendly",
    desc: "Suasana ramah keluarga, cocok untuk makan bersama orang-orang terdekat",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AboutSection() {
  return (
    <section id="tentang" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/about.jpg"
                alt="Barista Lil' Escape Coffee sedang menyeduh kopi spesialti"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white p-5 rounded-2xl shadow-xl"
            >
              <div className="text-accent-light font-serif text-3xl font-bold">2+</div>
              <div className="text-text-muted text-sm">Bulan Melayani</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Text Overlay */}
            <div className="absolute top-0 left-0 -translate-y-6 -translate-x-4 pointer-events-none z-0">
              <span
                className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-transparent uppercase whitespace-nowrap opacity-[0.05] tracking-widest"
                style={{ WebkitTextStroke: "2px #0d4a35" }}
              >
                STORY
              </span>
            </div>

            <div className="relative z-10">
              <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
                Tentang Kami
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-6 leading-tight">
                Cerita di Balik
                <br />
                <span className="text-accent-light">Secangkir Kopi</span>
              </h2>
            </div>
            <p className="text-text-muted leading-relaxed mb-6 text-base lg:text-lg">
              Lil&apos; Escape Coffee & Eatery lahir dari kecintaan mendalam terhadap kopi
              dan keinginan untuk menciptakan ruang pelarian yang hangat bagi
              semua orang. Di sini, setiap cangkir kopi adalah hasil dari proses
              yang jujur — dari pemilihan biji terbaik hingga penyajian penuh
              cinta.
            </p>
            <blockquote className="border-l-4 border-accent-light pl-4 italic text-text-muted mb-8 text-base">
              &ldquo;Kami percaya secangkir kopi terbaik lahir dari proses yang
              jujur dan suasana yang hangat.&rdquo;
            </blockquote>

            {/* Value cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent-light group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {v.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-light mb-1">{v.title}</h3>
                    <p className="text-text-muted text-sm">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
