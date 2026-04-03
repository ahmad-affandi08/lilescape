"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { href: "/#beranda", label: "Beranda" },
  { href: "/#tentang", label: "Tentang" },
  { href: "/menu", label: "Menu" },
  { href: "/#galeri", label: "Galeri" },
  { href: "/#testimoni", label: "Testimoni" },
  { href: "/#lokasi", label: "Lokasi" },
  { href: "/#faq", label: "FAQ" },
  { href: "/recruitment", label: "Recruitment" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 50;
      setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg py-3"
        : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href="/#beranda"
          className="flex items-center"
        >
          <Image
            src={scrolled ? "/assets/logo/logo.png" : "/assets/logo/logo2.png"}
            alt="Lil' Escape Logo"
            width={140}
            height={40}
            unoptimized
            className="w-auto h-auto max-h-10 object-contain transition-all duration-300"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-all duration-300 hover:opacity-100 relative group ${scrolled
                ? "text-accent-light hover:text-accent-light"
                : "text-white/90 hover:text-white"
                }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${scrolled ? "bg-accent" : "bg-white"
                  }`}
              />
            </a>
          ))}
          <a
            href="https://wa.me/628886927860"
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${scrolled
                ? "bg-accent text-white hover:bg-accent-light hover:shadow-accent/30"
                : "bg-white text-accent-light hover:bg-white/90 hover:shadow-white/20"
              }`}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-2 ${scrolled ? "text-accent-light" : "text-white"
            }`}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className={`block w-6 h-0.5 transition-colors ${scrolled ? "bg-accent" : "bg-white"
              }`}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className={`block w-6 h-0.5 transition-colors ${scrolled ? "bg-accent" : "bg-white"
              }`}
          />
          <motion.span
            animate={
              mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
            }
            className={`block w-6 h-0.5 transition-colors ${scrolled ? "bg-accent" : "bg-white"
              }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-accent-light font-medium py-2 hover:text-accent-light transition-colors border-b border-warm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/628886927860"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-white text-center px-5 py-3 rounded-full text-sm font-semibold mt-2 hover:bg-accent-light transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
