import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';

export const FAQSection: React.FC = () => {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isEn = lang === 'en';

  const faqs = [
    {
      q: isEn
        ? 'What is DWDM (Dense Wavelength Division Multiplexing) and how does it work?'
        : 'Apa itu DWDM (Dense Wavelength Division Multiplexing) dan bagaimana cara kerjanya?',
      a: isEn
        ? 'Dense Wavelength Division Multiplexing (DWDM) is an advanced optical transport technology that transmits multiple high-speed light wavelengths (channels) simultaneously over a single strand of optical fiber. By operating in the 1550 nm C+L spectral bands, DWDM multiplies existing fiber optic bandwidth by up to 96 times without requiring costly civil works to lay new physical cables.'
        : 'Dense Wavelength Division Multiplexing (DWDM) adalah teknologi transmisi serat optik tercanggih yang mentransmisikan puluhan panjang gelombang cahaya (kanal optik) berkecepatan tinggi secara bersamaan melalui satu helai kabel serat optik tunggal. Beroperasi pada spektrum C+L Band (jendela 1550 nm), DWDM mampu melipatgandakan kapasitas throughput jaringan eksisting hingga 96 kali lipat tanpa perlu menggelar kabel fisik baru.',
    },
    {
      q: isEn
        ? 'What are the transmission speeds and maximum capacity of IDTN T8 Volga I?'
        : 'Berapa kecepatan dan kapasitas maksimum platform DWDM T8 Volga I PT IDTN?',
      a: isEn
        ? 'PT IDTN deploys the carrier-grade T8 Volga I platform, which delivers up to 800 Gbps per wavelength and an aggregate capacity of up to 38.4 Tbps per fiber pair across C+L optical bands. For Data Center Interconnect (DCI), the Volga I DCI V2 platform provides 6.4 Tbps bidirectional throughput per compact 2U chassis with wire-speed Layer 1 AES-256 encryption.'
        : 'PT IDTN menghadirkan platform DWDM kelas carrier T8 Volga I yang mendukung kecepatan transmisi hingga 800 Gbps per panjang gelombang (lambda) dan kapasitas agregat total mencapai 38.4 Tbps per pasang serat optik pada spektrum C+L Band. Untuk kebutuhan Data Center Interconnect (DCI), unit modular kompak Volga I DCI V2 menyediakan throughput 6.4 Tbps per 2U sasis dengan proteksi enkripsi fisik Layer 1 AES-256.',
    },
    {
      q: isEn
        ? 'What is IDTN\'s geographic project reach across the Indonesian archipelago?'
        : 'Bagaimana jangkauan implementasi proyek jaringan optik IDTN di Indonesia?',
      a: isEn
        ? 'IDTN has an established unique deployment footprint spanning 8,514.22 km across Indonesia from Sabang in Aceh to Merauke in Papua. Our turnkey solutions cover inter-island subsea cable landings, long-haul terrestrial railway corridors, metropolitan telco rings, and regional hyperscale data center interconnections.'
        : 'PT IDTN memiliki rekam jejak geografi proyek unik yang membentang 8.514,22 km melintasi kepulauan Indonesia dari Sabang sampai Merauke. Solusi turnkey kami mencakup koridor transmisi darat jalur kereta api nasional, rute backbone jarak jauh antar-kota, metropolitan loop operator telekomunikasi, hingga pendaratan kabel optik bawah laut.',
    },
    {
      q: isEn
        ? 'How does IDTN protect network uptime against fiber cuts and degradation?'
        : 'Bagaimana sistem IDTN menjamin keandalan jaringan bila terjadi putus kabel optik?',
      a: isEn
        ? 'IDTN systems incorporate 1+1 Optical Line Protection (OLP) with ultra-fast automatic failover in under 50 milliseconds (sub-50ms switching) to guarantee 99.999% carrier-grade SLA. Additionally, our OTDR Ramenka monitoring system automatically diagnoses fiber integrity 24/7 in-service at 1625nm, pinpointing optical micro-bends and physical cut locations with +/- 1 meter accuracy.'
        : 'Sistem DWDM IDTN mengintegrasikan proteksi jalur optik 1+1 (Optical Line Protection / OLP) dengan kemampuan perpindahan jalur darurat otomatis dalam waktu kurang dari 50 milidetik (sub-50ms) guna menjamin SLA keandalan 99.999% (Five Nines). Dilengkapi sistem pemantauan otomatis 24 jam OTDR Ramenka yang menguji integritas kabel secara in-service pada 1625nm dan mendeteksi lokasi putus fisik dengan akurasi presisi hingga 1 meter.',
    },
    {
      q: isEn
        ? 'How can operators and enterprises request a link design or DWDM RFP quotation?'
        : 'Bagaimana cara mengajukan konsultasi desain link atau penawaran RFP pengadaan DWDM?',
      a: isEn
        ? 'You can submit your network requirements through our official RFP portal at https://idtn.co.id/contact, email our engineering team at info@idtn.co.id, or reach our Jakarta headquarters at Fatmawati City Center via WhatsApp at +62 811 8888 8888. Our optical transport specialists provide link budget calculation, OSNR analysis, and turnkey deployment proposals.'
        : 'Anda dapat mengajukan kebutuhan jaringan melalui formulir RFP online di https://idtn.co.id/contact, menghubungi tim rekayasa kami melalui email info@idtn.co.id, atau berkonsultasi langsung ke kantor pusat Fatmawati City Center Jakarta Selatan via WhatsApp resmi +62 811 8888 8888. Tim insinyur IDTN siap membantu perhitungan link budget, simulasi OSNR, dan penyusunan proposal pengadaan resmi.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-24 bg-slate-50/70 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <Badge variant="cyan" className="gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>{isEn ? 'DWDM Knowledge Base & FAQ' : 'Pusat Informasi & FAQ DWDM'}</span>
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isEn ? 'Frequently Asked Questions about DWDM Solutions' : 'Pertanyaan Umum Seputar Solusi DWDM Indonesia'}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {isEn
              ? 'Authoritative technical answers to key questions about Dense Wavelength Division Multiplexing, T8 Volga I platform, and IDTN services.'
              : 'Jawaban teknis resmi seputar teknologi Dense Wavelength Division Multiplexing, platform T8 Volga I, dan layanan infrastruktur optik PT IDTN.'}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all duration-200 hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-sky-50 text-sky-600 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
