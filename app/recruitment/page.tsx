import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getActiveLowongans } from "../lib/recruitment";
import RecruitmentClient from "./RecruitmentClient";

export const metadata = {
  title: "Karir - Lil' Escape Coffee & Eatery",
  description: "Bergabunglah dengan tim kami di Lil' Escape Coffee & Eatery.",
};

export default async function RecruitmentPage() {
  const lowonganList = await getActiveLowongans();

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <section className="bg-black/90 min-h-[60vh] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
              Bergabung Bersama Kami
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Jadilah bagian dari Lil' Escape Coffee & Eatery dan bantu kami menciptakan pengalaman luar biasa bagi setiap pengunjung.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-accent-light-dark mb-2">Posisi Tersedia</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <RecruitmentClient lowonganList={lowonganList} />
        </section>
      </main>

      <Footer />
    </>
  );
}
