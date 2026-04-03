import { buildApiUrl } from "./api";

const shouldLogApiError = process.env.NODE_ENV !== "production";

export interface Lowongan {
    id: number;
    jabatan: string;
    tipe_pekerjaan: string;
    lokasi: string;
    deskripsi: string;
    kualifikasi: string;
    is_active: boolean;
}

export async function getActiveLowongans(): Promise<Lowongan[]> {
    try {
        const response = await fetch(buildApiUrl("/public/lowongan"), {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            if (shouldLogApiError) {
                console.error("Failed to fetch lowongan:", response.status);
            }
            return [];
        }

        const json = await response.json();
        return json.data || [];
    } catch (error) {
        if (shouldLogApiError) {
            console.error("Error fetching lowongan:", error);
        }
        return [];
    }
}
