"use client";

import { motion } from "framer-motion";

export default function LocationSection() {
  return (
    <section id="lokasi" className="py-20 md:py-32 bg-background relative">
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
              LOCATION
            </span>
          </div>

          <div className="relative z-10">
            <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
              Lokasi
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-4">
              Temukan <span className="text-accent-light">Kami</span>
            </h2>
            <p className="text-text-muted max-w-xl mx-auto">
              Kami menunggu kedatanganmu di Lil&apos; Escape Coffee & Eatery, Sragen
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg h-[400px] md:h-full min-h-[400px]"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.9!2d111.10623!3d-7.4062983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79f90013ad9639%3A0x7f9cbd08a672dcff!2sLil&#39;+Escape+Coffee+%26+Eatery!5e0!3m2!1sid!2sid!4v1711611600000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Lil' Escape Coffee & Eatery di Google Maps"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Address */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent-light">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-accent-light mb-1">Alamat</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Lil&apos; Escape Coffee & Eatery
                    <br />
                    Sragen, Jawa Tengah
                    <br />
                    Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent-light">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-accent-light mb-1">Jam Operasional</h3>
                  <div className="text-text-muted text-sm space-y-1">
                    <div className="flex justify-between gap-8">
                      <span>Senin - Minggu</span>
                      <span className="font-medium text-accent-light">09:00 - 23:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent-light">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-accent-light mb-1">Kontak</h3>
                  <div className="text-text-muted text-sm space-y-1">
                    <p>WhatsApp: 08886927860</p>
                    <p>Instagram: @lilescapecoffe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href="https://www.google.com/maps/place/Lil'+Escape+Coffee+%26+Eatery/@-7.4062983,111.10623,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-semibold hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-1 w-full justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Buka di Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
