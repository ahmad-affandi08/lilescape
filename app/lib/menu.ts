import "server-only";

export type PublicMenuItem = {
  id: number;
  nama: string;
  deskripsi: string;
  harga: number;
  kategori: string;
  kategori_urutan: number;
  gambar_url: string | null;
};

const fallbackMenuItems: PublicMenuItem[] = [
  {
    id: 1,
    nama: "Signature Latte",
    deskripsi:
      "Espresso pilihan dengan susu segar dan sentuhan vanilla, disajikan dengan latte art indah",
    harga: 28000,
    kategori: "Kopi",
    kategori_urutan: 1,
    gambar_url: null,
  },
  {
    id: 2,
    nama: "Es Kopi Susu Gula Aren",
    deskripsi:
      "Perpaduan sempurna espresso, susu segar, dan gula aren asli yang manis legit",
    harga: 22000,
    kategori: "Kopi",
    kategori_urutan: 1,
    gambar_url: null,
  },
  {
    id: 3,
    nama: "Chicken Rice Bowl",
    deskripsi:
      "Nasi hangat dengan ayam panggang bumbu spesial, sayuran segar, dan saus rahasia",
    harga: 35000,
    kategori: "Makanan",
    kategori_urutan: 2,
    gambar_url: null,
  },
  {
    id: 4,
    nama: "Pasta Carbonara",
    deskripsi:
      "Pasta al dente dengan saus carbonara creamy, bacon crispy, dan taburan parmesan",
    harga: 38000,
    kategori: "Makanan",
    kategori_urutan: 2,
    gambar_url: null,
  },
  {
    id: 5,
    nama: "Cheesy Fries",
    deskripsi:
      "Kentang goreng crispy dengan saus keju leleh dan bumbu spesial yang bikin nagih",
    harga: 25000,
    kategori: "Makanan",
    kategori_urutan: 2,
    gambar_url: null,
  },
  {
    id: 6,
    nama: "Matcha Latte",
    deskripsi:
      "Matcha premium Jepang dengan susu segar, bisa disajikan panas atau dingin",
    harga: 28000,
    kategori: "Non-Kopi",
    kategori_urutan: 3,
    gambar_url: null,
  },
];

const formatSafeMenuItem = (item: unknown): PublicMenuItem | null => {
  if (!item || typeof item !== "object") {
    return null;
  }

  const candidate = item as Record<string, unknown>;
  if (
    typeof candidate.id !== "number" ||
    typeof candidate.nama !== "string" ||
    typeof candidate.deskripsi !== "string" ||
    typeof candidate.harga !== "number" ||
    typeof candidate.kategori !== "string"
  ) {
    return null;
  }

  return {
    id: candidate.id,
    nama: candidate.nama,
    deskripsi: candidate.deskripsi,
    harga: candidate.harga,
    kategori: candidate.kategori,
    kategori_urutan:
      typeof candidate.kategori_urutan === "number" ? candidate.kategori_urutan : 0,
    gambar_url:
      typeof candidate.gambar_url === "string" ? candidate.gambar_url : null,
  };
};

export async function getPublicMenuItems(): Promise<PublicMenuItem[]> {
  const baseUrl = process.env.LILESCAPE_MENU_SOURCE_URL;
  const timeoutMs = Number(process.env.LILESCAPE_MENU_FETCH_TIMEOUT_MS ?? "7000");

  if (!baseUrl) {
    return fallbackMenuItems;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(baseUrl, {
      method: "GET",
      next: { revalidate: 300 },
      signal: controller.signal,
    });

    if (!response.ok) {
      return fallbackMenuItems;
    }

    const payload = (await response.json()) as { data?: unknown };
    if (!Array.isArray(payload.data)) {
      return fallbackMenuItems;
    }

    const items = payload.data
      .map((item) => formatSafeMenuItem(item))
      .filter((item): item is PublicMenuItem => item !== null);

    return items.length > 0 ? items : fallbackMenuItems;
  } catch {
    return fallbackMenuItems;
  } finally {
    clearTimeout(timeoutId);
  }
}
