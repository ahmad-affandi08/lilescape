import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getPublicMenuItems } from "../lib/menu";

const toRupiah = (price: number): string =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);

const defaultMenuImage = "/noimages/noimages.png";

const getMenuImageSrc = (rawUrl: string | null): string => {
  if (rawUrl && rawUrl.trim().length > 0) {
    return rawUrl;
  }

  return defaultMenuImage;
};

const toSectionId = (category: string): string =>
  `menu-${category
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")}`;

export const metadata: Metadata = {
  title: "Menu | Lil' Escape Coffee & Eatery",
  description:
    "Lihat daftar menu kopi, non-kopi, dan makanan terbaru di Lil' Escape Coffee & Eatery Sragen beserta harga.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu | Lil' Escape Coffee & Eatery",
    description:
      "Daftar menu lengkap Lil' Escape Coffee & Eatery di Sragen. Cek pilihan kopi dan makanan favoritmu.",
    url: "https://lilescapecoffee.com/menu",
    type: "website",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Menu Lil' Escape Coffee & Eatery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | Lil' Escape Coffee & Eatery",
    description:
      "Daftar menu terbaru Lil' Escape Coffee & Eatery: kopi, non-kopi, dan makanan.",
    images: ["/images/hero-bg.jpg"],
  },
};

export default async function MenuPage() {
  const items = await getPublicMenuItems();

  const grouped = items.reduce<Record<string, typeof items>>((acc, item) => {
    if (!acc[item.kategori]) {
      acc[item.kategori] = [];
    }
    acc[item.kategori].push(item);
    return acc;
  }, {});

  const categories = Object.entries(grouped).sort((a, b) => {
    const aOrder = a[1][0]?.kategori_urutan ?? 0;
    const bOrder = b[1][0]?.kategori_urutan ?? 0;
    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }
    return a[0].localeCompare(b[0], "id");
  });

  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "@id": "https://lilescapecoffee.com/menu#menu",
    name: "Menu Lil' Escape Coffee & Eatery",
    url: "https://lilescapecoffee.com/menu",
    hasMenuSection: categories.map(([category, categoryItems]) => ({
      "@type": "MenuSection",
      name: category,
      hasMenuItem: categoryItems.map((item) => ({
        "@type": "MenuItem",
        name: item.nama,
        description: item.deskripsi,
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: item.harga,
          availability: "https://schema.org/InStock",
        },
      })),
    })),
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
        />

        <section className="relative min-h-[55vh] overflow-hidden bg-accent-light-dark pt-28 md:pt-36">
          <div className="absolute inset-0 bg-[url('/images/hero-bg2.jpg')] bg-cover bg-center" />
          <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
            <div className="grid items-end gap-8 md:grid-cols-2">
              <div>
                <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white/90 uppercase">
                  Signature Menu
                </p>
                <h1 className="mt-5 font-serif text-4xl leading-tight font-bold text-white md:text-6xl">
                  Menu Lil&apos; Escape
                </h1>
                <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
                  Kopi, non-kopi, dan makanan favorit dalam tampilan yang lebih
                  mudah dijelajahi di semua ukuran layar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
                    Total Menu
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">{items.length}+</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
                    Kategori
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">{categories.length}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8">
          <div className="sticky top-17.5 z-20 mb-8 overflow-x-auto rounded-2xl border border-warm-dark/70 bg-white/90 p-2 backdrop-blur md:top-21">
            <div className="flex min-w-max gap-2">
              {categories.map(([category]) => (
                <a
                  key={category}
                  href={`#${toSectionId(category)}`}
                  className="rounded-full border border-accent/20 bg-accent/5 px-4 py-2 text-xs font-semibold tracking-widest text-accent-light uppercase transition-colors hover:bg-accent hover:text-white"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-10 md:space-y-12">
            {categories.map(([category, categoryItems]) => {
              const sortedCategoryItems = categoryItems
                .slice()
                .sort((a, b) => a.nama.localeCompare(b.nama, "id"));

              return (
                <section
                  id={toSectionId(category)}
                  key={category}
                  className="rounded-3xl border border-warm-dark/80 bg-white p-5 shadow-sm md:p-7"
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <h2 className="font-serif text-2xl font-bold text-accent-light-dark md:text-3xl">
                      {category}
                    </h2>
                    <span className="rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-xs font-semibold tracking-widest text-accent uppercase">
                      {sortedCategoryItems.length} Item
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {sortedCategoryItems.map((item) => (
                      <article
                        key={item.id}
                        className="group relative overflow-hidden rounded-2xl border border-warm-dark/70 bg-linear-to-b from-white to-warm/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >
                        <div className="relative mx-auto h-36 w-36 sm:h-40 sm:w-40">
                          <div className="absolute inset-0 rounded-full bg-linear-to-b from-white via-[#f8f8f8] to-[#ececec] shadow-[0_12px_24px_rgba(0,0,0,0.16)]" />
                          <div className="absolute inset-2 rounded-full border border-[#dbdbdb]" />
                          <Image
                            src={getMenuImageSrc(item.gambar_url)}
                            alt={`${item.nama} - Menu Lil' Escape Coffee & Eatery`}
                            fill
                            className="z-10 object-contain p-3 drop-shadow-[0_10px_10px_rgba(0,0,0,0.24)] transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 40vw, (max-width: 1280px) 25vw, 20vw"
                            quality={75}
                          />
                        </div>

                        <div className="mt-4 text-center">
                          <h3 className="font-serif text-xl leading-tight font-bold text-accent-light-dark">
                            {item.nama}
                          </h3>
                          <p className="mt-2 min-h-12 text-sm leading-relaxed text-text-muted">
                            {item.deskripsi}
                          </p>
                          <p className="mt-3 text-lg font-bold text-accent">
                            {toRupiah(item.harga)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
