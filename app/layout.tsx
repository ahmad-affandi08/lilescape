import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lilescapecoffee.com"),
  title: "Lil' Escape Coffee & Eatery | Coffee Shop Terbaik di Sragen",
  description:
    "Lil' Escape Coffee & Eatery - Tempat nongkrong nyaman, kopi spesialti berkualitas, dan menu eatery terbaik di Sragen. Nikmati suasana cozy, WiFi cepat, dan harga terjangkau. Cocok untuk kerja, nongkrong, dan keluarga.",
  keywords: [
    "Lil Escape",
    "Lil Escape Coffee",
    "Lil Escape Eatery",
    "Lil Escape Coffee",
    "Lil Escape Sragen",
    "coffee shop Sragen",
    "cafe Sragen",
    "kafe Sragen",
    "kedai kopi Sragen",
    "tempat nongkrong Sragen",
    "cafe aesthetic Sragen",
    "cafe instagramable Sragen",
    "cafe murah Sragen",
    "cafe wifi Sragen",
    "cafe kerja Sragen",
    "cafe keluarga Sragen",
    "coffee shop aesthetic",
    "kopi spesialti Sragen",
    "es kopi susu gula aren",
    "latte art Sragen",
    "tempat ngopi Sragen",
    "tempat makan Sragen",
    "eatery Sragen",
    "restoran Sragen",
    "chicken rice bowl Sragen",
    "pasta Sragen",
    "makanan enak Sragen",
    "cafe nyaman Sragen",
    "tempat kerja remote Sragen",
    "coworking cafe Sragen",
    "cafe outdoor Sragen",
    "cafe romantis Sragen",
    "nongkrong asyik Sragen",
    "hangout spot Sragen",
    "kuliner Sragen",
    "cafe rekomendasi Sragen",
    "cafe hits Sragen",
    "cafe terbaru Sragen",
    "cafe populer Sragen",
    "kopi enak Sragen",
    "minuman kekinian Sragen",
    "cafe cozy Sragen",
    "coffee and eatery Sragen",
    "cafe terdekat Sragen",
  ],
  authors: [{ name: "Lil' Escape Coffee & Eatery" }],
  creator: "Lil' Escape Coffee & Eatery",
  publisher: "Lil' Escape Coffee & Eatery",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lil' Escape Coffee & Eatery",
  },
  verification: {
    google: "isi_dengan_kode_google_search_console_nanti",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://lilescapecoffee.com",
    siteName: "Lil' Escape Coffee & Eatery",
    title: "Lil' Escape Coffee & Eatery | Coffee Shop Terbaik di Sragen",
    description:
      "Tempat nongkrong nyaman dengan kopi spesialti berkualitas dan menu eatery terbaik di Sragen. WiFi cepat, suasana cozy, harga terjangkau.",
    images: [
      {
        url: "/images/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Lil' Escape Coffee & Eatery - Coffee Shop Terbaik di Sragen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lil' Escape Coffee & Eatery | Coffee Shop Terbaik di Sragen",
    description:
      "Tempat nongkrong nyaman dengan kopi spesialti berkualitas dan menu eatery terbaik di Sragen.",
    images: ["/images/hero-bg.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://lilescapecoffee.com",
  },
  category: "restaurant",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Lil' Escape Coffee & Eatery",
  alternateName: "Lil Escape Coffee & Eatery",
  description:
    "Tempat nongkrong nyaman dengan kopi spesialti berkualitas dan menu eatery terbaik di Sragen, Jawa Tengah.",
  url: "https://lilescapecoffee.com",
  telephone: "+628886927860",
  image: "/images/hero-bg.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sragen",
    addressLocality: "Sragen",
    addressRegion: "Jawa Tengah",
    postalCode: "57254",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -7.4062983,
    longitude: 111.10623,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:00",
    },
  ],
  servesCuisine: ["Coffee", "Indonesian", "Western"],
  priceRange: "$$",
  sameAs: [
    "https://www.instagram.com/lilescapecoffee/",
    "https://maps.google.com/?cid=9187963753256058111",
  ],
  hasMenu: {
    "@type": "Menu",
    hasMenuSection: [
      {
        "@type": "MenuSection",
        name: "Kopi",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Signature Latte" },
          { "@type": "MenuItem", name: "Es Kopi Susu Gula Aren" },
        ],
      },
      {
        "@type": "MenuSection",
        name: "Makanan",
        hasMenuItem: [
          { "@type": "MenuItem", name: "Chicken Rice Bowl" },
          { "@type": "MenuItem", name: "Pasta Carbonara" },
        ],
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "150",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="geo.region" content="ID-JI" />
        <meta name="geo.placename" content="Sragen" />
        <meta name="geo.position" content="-7.4062983;111.10623" />
        <meta name="ICBM" content="-7.4062983, 111.10623" />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
