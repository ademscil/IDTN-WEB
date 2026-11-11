import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import companyData from '../../data/company.json';
import { InquiryRequestSchema } from '../../schemas/inquiry.schema';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const InquiryFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    corporateEmail: '',
    phoneNumber: '',
    solutionTopic: 'dwdm_optical_systems',
    message: '',
    _gotcha: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot (silent drop for bots)
    if (formData._gotcha) {
      console.warn('Bot submission trapped via honeypot');
      return;
    }

    // Validate using Zod schema
    const validation = InquiryRequestSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // Simulate submission with double-click lock
    setIsSubmitting(true);
    setErrors({});

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `IDTN-INQ-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedInquiryId(generatedId);
      // Reset form
      setFormData({
        fullName: '',
        companyName: '',
        corporateEmail: '',
        phoneNumber: '',
        solutionTopic: 'dwdm_optical_systems',
        message: '',
        _gotcha: '',
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Jalur Konsultasi Resmi</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Konsultasikan Kebutuhan Infrastruktur Jaringan Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Tim rekayasa DWDM dan perencana jaringan IDTN siap membantu penyusunan spesifikasi teknis, estimasi kapasitas optik, dan penawaran proyek korporat Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900">
                Informasi Kantor & Kontak
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kunjungi kantor operasional kami atau hubungi tim representatif resmi IDTN untuk koordinasi teknis dan pertemuan bisnis langsung.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-sky-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Kantor Pusat</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {companyData.headquarters.address}
                    </p>
                    <p className="text-xs text-slate-600">
                      {companyData.headquarters.city}, {companyData.headquarters.province} {companyData.headquarters.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-sky-600 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Email Resmi</p>
                    <a
                      href={`mailto:${companyData.contact.officialEmail}`}
                      className="text-sm font-bold text-sky-600 hover:underline mt-0.5 block"
                    >
                      {companyData.contact.officialEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-sky-600 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Telepon Kantor / Hotline</p>
                    <a
                      href={`tel:${companyData.contact.phoneOffice.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-slate-900 hover:text-sky-600 mt-0.5 block"
                    >
                      {companyData.contact.phoneOffice}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-emerald-600 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Jam Pelayanan</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {companyData.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Note */}
            <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3 text-xs text-sky-900 leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <span>
                Seluruh data dan dokumen penawaran teknis dilindungi oleh perjanjian kerahasiaan (*Non-Disclosure Agreement / NDA*) serta kepatuhan perlindungan data pribadi (UU PDP).
              </span>
            </div>
          </div>

          {/* Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Formulir Permintaan Penawaran Proyek (RFP)
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Silakan lengkapi data di bawah ini. Tim teknis IDTN akan menghubungi Anda dalam 1x24 jam kerja.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field (hidden from view) */}
              <input
                type="text"
                name="_gotcha"
                value={formData._gotcha}
                onChange={handleChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Full Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Lengkap <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Pratama"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-xs font-bold text-slate-700 mb-1">
                    Nama Perusahaan / Instansi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Contoh: PT Telekomunikasi Nusantara"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.companyName
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.companyName && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.companyName}</p>
                  )}
                </div>
              </div>

              {/* Corporate Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="corporateEmail" className="block text-xs font-bold text-slate-700 mb-1">
                    Email Korporat <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="corporateEmail"
                    type="email"
                    name="corporateEmail"
                    value={formData.corporateEmail}
                    onChange={handleChange}
                    placeholder="nama@perusahaan.co.id"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.corporateEmail
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.corporateEmail && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.corporateEmail}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block text-xs font-bold text-slate-700 mb-1">
                    Nomor Telepon / WhatsApp <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="+62 812-3456-7890"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.phoneNumber
                        ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Solution Topic */}
              <div>
                <label htmlFor="solutionTopic" className="block text-xs font-bold text-slate-700 mb-1">
                  Kategori Solusi yang Dibutuhkan <span className="text-rose-500">*</span>
                </label>
                <select
                  id="solutionTopic"
                  name="solutionTopic"
                  value={formData.solutionTopic}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 bg-white"
                >
                  <option value="dwdm_optical_systems">Sistem DWDM & Transmisi Backbone Optik (Volga I)</option>
                  <option value="datacenter_interconnect">Data Center Interconnect (DCI High Density)</option>
                  <option value="fiber_infrastructure">Infrastruktur Kabel Serat Optik & Turnkey OSP</option>
                  <option value="nms_otdr_monitoring">Pemantauan OTDR Ramenka & NMS Titan</option>
                  <option value="partnership_compliance">Kemitraan Distribusi & Verifikasi Legalitas</option>
                  <option value="other">Kebutuhan Lainnya</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                  Rincian Kebutuhan Proyek / Pesan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Deskripsikan estimasi rute jarak, kebutuhan bandwidth, atau jadwal pelaksanaan tender Anda..."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                    errors.message
                      ? 'border-rose-400 focus:ring-rose-200 bg-rose-50/20'
                      : 'border-slate-300 focus:border-sky-500 focus:ring-sky-100'
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-rose-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  disabled={isSubmitting}
                  className="w-full gap-2 text-base font-bold py-3.5 shadow-md shadow-sky-600/20"
                >
                  {isSubmitting ? (
                    <span>Mengirimkan Permintaan...</span>
                  ) : (
                    <>
                      <span>Kirim Permintaan Konsultasi</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Success Modal */}
        {submittedInquiryId && (
          <Modal
            isOpen={!!submittedInquiryId}
            onClose={() => setSubmittedInquiryId(null)}
            title="Permintaan Konsultasi Diterima"
          >
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Terima Kasih atas Minat Anda
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Permintaan penawaran proyek Anda telah tercatat dengan nomor referensi resmi:
              </p>
              <div className="bg-slate-50 py-2.5 px-4 rounded-xl border border-slate-200 inline-block font-mono font-bold text-sky-700 text-sm">
                {submittedInquiryId}
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Senior Technical Account Manager IDTN akan menghubungi Anda via email atau WhatsApp resmi dalam waktu maksimal 1x24 jam kerja.
              </p>
              <div className="pt-4">
                <Button variant="primary" onClick={() => setSubmittedInquiryId(null)} className="px-8">
                  Selesai
                </Button>
              </div>
            </div>
          </Modal>
        )}

      </div>
    </section>
  );
};
