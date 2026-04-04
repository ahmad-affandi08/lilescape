import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MenuCategoryTabs from "./MenuCategoryTabs";
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
  title: "Menu",
  description:
    "Lihat daftar menu kopi, non-kopi, dan makanan terbaru di Lil' Escape Coffee & Eatery Sragen beserta harga.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu",
    description:
      "Daftar menu lengkap Lil' Escape Coffee & Eatery di Sragen. Cek pilihan kopi dan makanan favoritmu.",
    url: "https://lilescapecoffee.com/menu",
    type: "website",
    images: [
      {
        url: "/assets/logo/logo2.png?v=20260404",
        width: 26284,
        height: 4628,
        alt: "Menu Lil' Escape Coffee & Eatery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | Lil' Escape Coffee & Eatery",
    description:
      "Daftar menu terbaru Lil' Escape Coffee & Eatery: kopi, non-kopi, dan makanan.",
    images: ["/assets/logo/logo2.png?v=20260404"],
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

  const categoryTabs = categories.map(([category]) => ({
    id: toSectionId(category),
    label: category,
  }));

  return (
    <>
      <Navbar />

      <main
        className="min-h-screen text-white"
        style={{
          backgroundColor: "var(--accent)",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }}
        />

        <section className="relative min-h-[58vh] overflow-hidden pt-28 md:pt-36">
          <div className="absolute inset-0 bg-[url('/images/hero-bg2.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0" />
          <div className="absolute -top-28 -left-20 h-80 w-80 rounded-full" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full " />
          <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full " />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 md:pb-20">
            <div className="grid items-end gap-8 md:grid-cols-2">
              <div>
                <p className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white uppercase backdrop-blur-sm">
                  Signature Menu
                </p>
                <h1 className="mt-5 font-serif text-4xl leading-tight font-bold text-white md:text-6xl">
                  Menu Lil&apos; Escape
                </h1>
                <p className="mt-4 max-w-xl text-base text-white/90 md:text-lg">
                  Kopi, non-kopi, dan makanan favorit dalam tampilan yang lebih
                  mudah dijelajahi di semua ukuran layar.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg shadow-black/15 backdrop-blur-md">
                  <p className="text-xs font-semibold tracking-[0.14em] text-white/70 uppercase">
                    Total Menu
                  </p>
                  <p className="mt-2 text-2xl font-bold text-white">{items.length}+</p>
                </div>
                <div className="rounded-2xl border border-white/30 bg-white/10 p-4 shadow-lg shadow-black/15 backdrop-blur-md">
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
          <MenuCategoryTabs tabs={categoryTabs} />

          <div className="space-y-10 md:space-y-12">
            {categories.map(([category, categoryItems]) => {
              const sortedCategoryItems = categoryItems
                .slice()
                .sort((a, b) => a.nama.localeCompare(b.nama, "id"));

              return (
                <section
                  id={toSectionId(category)}
                  key={category}
                  className="rounded-3xl border border-white/20 bg-white/10 p-5 shadow-2xl shadow-black/15 backdrop-blur-md md:p-7"
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
                      {category}
                    </h2>
                    <span className="rounded-full border border-gold/60 bg-gold/15 px-3 py-1 text-xs font-semibold tracking-widest text-gold-light uppercase">
                      {sortedCategoryItems.length} Item
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {sortedCategoryItems.map((item) => (
                      <article
                        key={item.id}
                        className="group relative overflow-hidden rounded-2xl border border-white/20 bg-white/90 p-4 text-accent-dark transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/25"
                      >
                        <div className="pointer-events-none absolute -top-20 -right-14 h-36 w-36 rounded-full bg-gold/25 blur-2xl" />
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
                          <h3 className="font-serif text-xl leading-tight font-bold text-accent-dark">
                            {item.nama}
                          </h3>
                          <p className="mt-2 min-h-12 text-sm leading-relaxed text-[#446257]">
                            {item.deskripsi}
                          </p>
                          <p className="mt-3 inline-flex rounded-full bg-accent px-4 py-1 text-lg font-bold text-white shadow-lg shadow-accent/30">
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
