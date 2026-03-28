"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Nisa Lutpi",
    role: "Customer",
    text: "Tempatnya bagus ada yg indor & outdor ,Karyawannya ramah ramah, seneng deh liatnya jadi nongki plus makan jadi nyaman, dari pas datang udah di sambut baik",
    rating: 5,
  },
  {
    name: "etasahasika",
    role: "Customer",
    text: "enak semua makanan sama minumannya,ramah di kantong,tempatnya cozy gen-z abiss",
    rating: 5,
  },
  {
    name: "Lyvia Merintan",
    role: "Customer",
    text: "Makanan enak coffe good dan tempat yg cozy 🥳🥳",
    rating: 5,
  },
  {
    name: "Sumini Cantik",
    role: "Customer",
    text: "Tempatnya nyaman, untuk kalangan anak muda maupun lansia seperti saya, makannya jg enak ada nusantara menu, bagi yang suka kopi pilihannya banyak, kopi gula aren e sama triple nya jg mantep",
    rating: 5,
  },
  {
    name: "Sekiya",
    role: "Customer",
    text: "Tempat yang nyaman bersih..makanan enak ..pelayanan mantappppp Cocok buat nongki",
    rating: 4,
  },
  {
    name: "Rina Amelia",
    role: "Customer",
    text: "Tempatnya nyaman, untuk kalangan anak muda maupun lansia seperti saya, makannya jg enak ada nusantara menu, bagi yang suka kopi pilihannya banyak, kopi gula aren e sama triple nya jg mantep",
    rating: 5,
  },
  {
    name: "Ahmad Affandi",
    role: "Customer",
    text: "worth it banget nongkrong disini, tempatnya nyaman, pelayanannya ramah, dan makan minumannya uenaakkk tenann josjis boloo",
    rating: 5,
  },
];

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    className={`w-4 h-4 ${filled ? "text-gold" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

export default function TestimonialSection() {
  return (
    <section id="testimoni" className="py-20 md:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

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
              REVIEWS
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
              Testimoni
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-4">
              Kata <span className="text-accent-light">Mereka</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Dengarkan pengalaman pelanggan setia kami yang sudah merasakan
              kenyamanan Lil&apos; Escape
            </p>
          </div>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative mt-12 overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes scrollMarquee {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .testimonial-marquee {
                animation: scrollMarquee 40s linear infinite;
              }
              .testimonial-marquee:hover {
                animation-play-state: paused;
              }
            `
          }} />
          
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content */}
          <div className="flex gap-6 w-max testimonial-marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[320px] md:w-[400px] shrink-0 bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {/* Rating */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, index) => (
                    <StarIcon key={index} filled={index < t.rating} />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-text-muted text-sm leading-relaxed mb-6 italic flex-grow">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-warm pt-4 mt-auto">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center text-accent-light font-bold text-sm shrink-0 uppercase">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-accent-light text-sm line-clamp-1">
                      {t.name}
                    </div>
                    <div className="text-text-light text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
