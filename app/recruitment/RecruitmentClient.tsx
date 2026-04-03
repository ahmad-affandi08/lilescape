"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Lowongan } from "../lib/recruitment";
import { buildApiUrl } from "../lib/api";

export default function RecruitmentClient({ lowonganList }: { lowonganList: Lowongan[] }) {
    const [selectedLowongan, setSelectedLowongan] = useState<Lowongan | null>(null);
    const [detailLowongan, setDetailLowongan] = useState<Lowongan | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [selectedFileName, setSelectedFileName] = useState("");

    const handleApply = (lowongan: Lowongan) => {
        setSelectedLowongan(lowongan);
        setDetailLowongan(null);
        setSubmitSuccess(false);
        setErrorMsg("");
    };

    const handleDetail = (lowongan: Lowongan) => {
        setDetailLowongan(lowongan);
    };

    const closeModal = () => {
        setSelectedLowongan(null);
        setDetailLowongan(null);
    };

    const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg("");

        const formData = new FormData(e.currentTarget);
        if (selectedLowongan) {
            formData.append("lowongan_id", selectedLowongan.id.toString());
        }

        try {
            const response = await fetch(buildApiUrl("/public/pelamar"), {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (!response.ok) {
                const errJson = await response.json().catch(() => ({}));
                throw new Error(errJson.message || "Terjadi kesalahan saat mengirim lamaran.");
            }

            setSubmitSuccess(true);
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            setErrorMsg(error.message || "Lamaran gagal dikirim.");
        } finally {
            setSubmitting(false);
        }
    };

    /** Render deskripsi sebagai list items jika mengandung angka/titik */
    const renderDescription = (text: string) => {
        if (!text) return <p className="text-gray-500 italic">Belum ada deskripsi.</p>;
        // Split by numbered patterns like "1." "2." etc.
        const items = text.split(/(?=\d+\.\s)/).filter(Boolean);
        if (items.length > 1) {
            return (
                <ul className="space-y-2">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            <span>{item.replace(/^\d+\.\s*/, "")}</span>
                        </li>
                    ))}
                </ul>
            );
        }
        return <p className="text-sm text-gray-600 leading-relaxed">{text}</p>;
    };

    if (!lowonganList || lowonganList.length === 0) {
        return (
            <div className="text-center py-24 px-4 bg-white rounded-3xl shadow-sm border border-warm">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="text-2xl font-serif font-bold text-accent-light-dark mb-3">Belum Ada Lowongan</h3>
                <p className="text-gray-400 max-w-md mx-auto">Saat ini belum ada posisi yang sedang kami buka. Kunjungi kembali halaman ini secara berkala.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Poster-style card grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {lowonganList.map((job, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        key={job.id}
                        className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                    >
                        {/* Poster header */}
                        <div className="relative bg-gradient-to-br from-accent-light-dark via-accent to-accent-light p-8 pb-12 overflow-hidden">
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-white/5 rounded-full" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-4">
                                    {job.tipe_pekerjaan && (
                                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                                            {job.tipe_pekerjaan}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-white mb-2">{job.jabatan}</h3>
                                {job.lokasi && (
                                    <div className="flex items-center gap-1.5 text-white/80 text-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {job.lokasi}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-8 -mt-4 relative">
                            {/* Connector shape */}
                            <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-t-3xl -translate-y-full" />

                            <div className="space-y-5">
                                {/* Deskripsi preview */}
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent/60 mb-3">Deskripsi Pekerjaan</h4>
                                    <div className="line-clamp-4">
                                        {renderDescription(job.deskripsi)}
                                    </div>
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-3 pt-2">
                                    <button
                                        onClick={() => handleDetail(job)}
                                        className="flex-1 border-2 border-accent text-accent px-4 py-3 rounded-xl font-semibold hover:bg-accent/5 transition-all text-sm"
                                    >
                                        Lihat Detail
                                    </button>
                                    <button
                                        onClick={() => handleApply(job)}
                                        className="flex-1 bg-accent text-white px-4 py-3 rounded-xl font-semibold hover:bg-accent-light transition-all hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 text-sm"
                                    >
                                        Lamar Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {detailLowongan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative"
                        >
                            {/* Header */}
                            <div className="bg-gradient-to-br from-accent-light-dark via-accent to-accent-light p-8 rounded-t-3xl relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full" />
                                <button onClick={closeModal} className="absolute top-6 right-6 text-white/60 hover:text-white bg-white/10 rounded-full p-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                                <div className="flex items-center gap-2 mb-3">
                                    {detailLowongan.tipe_pekerjaan && (
                                        <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{detailLowongan.tipe_pekerjaan}</span>
                                    )}
                                </div>
                                <h2 className="text-3xl font-serif font-bold text-white mb-1">{detailLowongan.jabatan}</h2>
                                {detailLowongan.lokasi && (
                                    <p className="text-white/80 text-sm flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                        {detailLowongan.lokasi}
                                    </p>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent/60 mb-4">Deskripsi Pekerjaan</h4>
                                    {renderDescription(detailLowongan.deskripsi)}
                                </div>
                                {detailLowongan.kualifikasi && (
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent/60 mb-4">Kualifikasi</h4>
                                        {renderDescription(detailLowongan.kualifikasi)}
                                    </div>
                                )}
                                <button
                                    onClick={() => { setDetailLowongan(null); handleApply(detailLowongan); }}
                                    className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg hover:bg-accent-light transition-colors hover:shadow-lg hover:shadow-accent/20"
                                >
                                    Lamar Posisi Ini
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Apply Modal */}
            <AnimatePresence>
                {selectedLowongan && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 shadow-2xl relative"
                        >
                            <button onClick={closeModal} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <div className="mb-6">
                                <span className="text-xs font-bold tracking-widest uppercase text-accent/70 mb-1 block">Form Pendaftaran</span>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-accent-light-dark">{selectedLowongan.jabatan}</h2>
                            </div>

                            {submitSuccess ? (
                                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-2xl text-center border border-emerald-100 my-8">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Lamaran Terkirim!</h3>
                                    <p className="text-sm">Terima kasih! Tim recruitment kami akan meninjau profil Anda, dan akan menghubungi Anda jika profil Anda sesuai dengan kualifikasi yang dibutuhkan.</p>
                                    <button onClick={closeModal} className="mt-6 border border-emerald-200 text-emerald-700 bg-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition-colors">
                                        Kembali ke Lowongan
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={submitApplication} className="space-y-5">
                                    {errorMsg && (
                                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm border border-red-100 flex items-start gap-3">
                                            <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <p>{errorMsg}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">Nama Lengkap <span className="text-red-500">*</span></label>
                                            <input type="text" name="nama_lengkap" required className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none" placeholder="Sesuai KTP" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">NIK</label>
                                            <input type="text" name="nik" className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none" placeholder="16 digit (Opsional)" />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-sm font-semibold text-gray-700">No. HP (WhatsApp) <span className="text-red-500">*</span></label>
                                            <input type="text" name="no_hp" required className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none" placeholder="0812xxxx" />
                                        </div>

                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></label>
                                            <input type="email" name="email" required className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none" placeholder="alamat@email.com" />
                                        </div>

                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">Alamat Domisili</label>
                                            <textarea name="alamat" rows={2} className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none resize-none" placeholder="Kota domisili..." />
                                        </div>

                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">Portofolio / LinkedIn</label>
                                            <input type="url" name="portofolio_url" className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-accent focus:ring-2 focus:ring-accent/20 rounded-xl px-4 py-3 text-sm transition-all outline-none" placeholder="https://..." />
                                        </div>

                                        <div className="space-y-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-gray-700">Upload CV / Resume <span className="text-red-500">*</span></label>
                                            <div className={`border-2 border-dashed rounded-xl px-4 py-8 text-center transition-all relative ${selectedFileName ? 'border-emerald-400 bg-emerald-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-accent/40'}`}>
                                                <input type="file" name="resume" required accept=".pdf,.doc,.docx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        setSelectedFileName(file ? file.name : "");
                                                    }}
                                                />
                                                {selectedFileName ? (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                                        </div>
                                                        <p className="text-sm font-semibold text-emerald-700">{selectedFileName}</p>
                                                        <p className="text-xs text-emerald-500">Klik untuk ganti file</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <svg className="w-10 h-10 text-accent/30 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                                        <p className="text-sm text-gray-600 font-medium">Klik atau seret file ke sini</p>
                                                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Maks. 2 MB)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-4 border-t border-gray-100 flex gap-3">
                                        <button type="button" onClick={closeModal} disabled={submitting} className="px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-100 transition-colors w-full sm:w-auto">
                                            Batal
                                        </button>
                                        <button type="submit" disabled={submitting} className="px-8 py-3 rounded-xl font-semibold bg-accent text-white hover:bg-accent-light transition-colors w-full sm:w-auto flex-1 disabled:opacity-70 flex justify-center items-center gap-2">
                                            {submitting ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                                                    Tunggu...
                                                </>
                                            ) : "Kirim Lamaran"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
