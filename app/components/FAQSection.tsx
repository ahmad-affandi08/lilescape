const faqs = [
  {
    question: "Lil' Escape Coffee & Eatery buka jam berapa?",
    answer:
      "Kami buka setiap hari pukul 09.00 - 23.00 WIB. Jam operasional bisa berubah pada hari libur tertentu.",
  },
  {
    question: "Apakah Lil' Escape cocok untuk kerja atau meeting?",
    answer:
      "Ya. Tempat kami nyaman untuk kerja, meeting santai, dan nongkrong dengan dukungan WiFi yang stabil.",
  },
  {
    question: "Apa menu favorit di Lil' Escape Coffee & Eatery?",
    answer:
      "Beberapa menu favorit pelanggan adalah Signature Latte, Es Kopi Susu Gula Aren, Chicken Rice Bowl, dan Pasta Carbonara.",
  },
  {
    question: "Bagaimana cara reservasi atau tanya ketersediaan tempat?",
    answer:
      "Kamu bisa langsung hubungi kami melalui WhatsApp di 08886927860 untuk reservasi dan informasi terbaru.",
  },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-accent-light/70 font-medium text-sm tracking-[0.2em] uppercase">
            FAQ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-accent-light mt-3 mb-4">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-text-muted">
            Informasi cepat seputar jam buka, menu, dan reservasi Lil&apos; Escape Coffee & Eatery.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group bg-white border border-warm-dark/20 rounded-xl p-5"
            >
              <summary className="cursor-pointer list-none font-semibold text-accent-light flex items-center justify-between gap-4">
                <span>{item.question}</span>
                <span className="text-accent-light transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-text-muted leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
