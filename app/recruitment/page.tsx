import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getActiveLowongans } from "../lib/recruitment";
import RecruitmentClient from "./RecruitmentClient";

export const metadata: Metadata = {
  title: "Recruitment | Karir di Lil' Escape Coffee & Eatery",
  description:
    "Lowongan kerja terbaru di Lil' Escape Coffee & Eatery Sragen. Lihat posisi yang tersedia dan kirim lamaran secara online.",
  alternates: {
    canonical: "/recruitment",
  },
  openGraph: {
    title: "Recruitment | Karir di Lil' Escape Coffee & Eatery",
    description:
      "Temukan peluang karir di Lil' Escape Coffee & Eatery. Cek posisi tersedia dan lamar sekarang.",
    url: "https://lilescapecoffee.com/recruitment",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Recruitment Lil' Escape Coffee & Eatery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recruitment | Karir di Lil' Escape Coffee & Eatery",
    description:
      "Lihat lowongan kerja terbaru Lil' Escape Coffee & Eatery di Sragen.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default async function RecruitmentPage() {
  const lowonganList = await getActiveLowongans();

  const jobPostingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://lilescapecoffee.com/recruitment#jobs",
    name: "Lowongan Kerja Lil' Escape Coffee & Eatery",
    itemListElement: lowonganList.map((job, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "JobPosting",
        title: job.jabatan,
        description: [job.deskripsi, job.kualifikasi].filter(Boolean).join("\n\n"),
        employmentType: job.tipe_pekerjaan || "FULL_TIME",
        hiringOrganization: {
          "@type": "Organization",
          name: "Lil' Escape Coffee & Eatery",
          sameAs: "https://lilescapecoffee.com",
        },
        jobLocation: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.lokasi || "Sragen",
            addressRegion: "Jawa Tengah",
            addressCountry: "ID",
          },
        },
        applicantLocationRequirements: {
          "@type": "Country",
          name: "ID",
        },
        directApply: true,
        url: "https://lilescapecoffee.com/recruitment",
      },
    })),
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
        />

        <section className="bg-black/90 min-h-[60vh] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-30" />
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-16">
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4">
              Bergabung Bersama Kami
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Jadilah bagian dari Lil&apos; Escape Coffee & Eatery dan bantu kami menciptakan pengalaman luar biasa bagi setiap pengunjung.
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
