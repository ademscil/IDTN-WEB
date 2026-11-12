import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';
import companyData from '../../data/company.json';
import { InquiryRequestSchema } from '../../schemas/inquiry.schema';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { useLanguage } from '../../context';

export const InquiryFormSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

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
    setTimeout(() => {
      const generatedId = `IDTN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setSubmittedInquiryId(generatedId);
      setIsSubmitting(false);

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
    }, 1200);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">{t('contact.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t('contact.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contacts & Headquarters (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 bg-slate-50/80 p-8 sm:p-10 rounded-3xl border border-slate-200/80">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                {isEn ? 'Direct Contact & Office' : 'Informasi Kantor & Kontak'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isEn
                  ? 'Reach out directly to IDTN engineering representatives for technical coordination, RFPs, and consultation.'
                  : 'Kunjungi kantor operasional kami atau hubungi tim representatif resmi IDTN untuk koordinasi teknis dan pertemuan bisnis langsung.'}
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 text-sky-600 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium">{isEn ? 'Headquarters' : 'Kantor Pusat'}</p>
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
                    <p className="text-xs text-slate-400 font-medium">{isEn ? 'Official Email' : 'Email Resmi'}</p>
                    <a
                      href={`mailto:${companyData.contact.officialEmail}`}
                      className="text-sm font-bold text-sky-600 hover:underline mt-0.5 block font-mono"
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
                    <p className="text-xs text-slate-400 font-medium">{isEn ? 'Office Telephone' : 'Telepon Kantor'}</p>
                    <a
                      href={`tel:${companyData.contact.phoneOffice.replace(/\s+/g, '')}`}
                      className="text-sm font-bold text-slate-900 hover:text-sky-600 mt-0.5 block font-mono"
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
                    <p className="text-xs text-slate-400 font-medium">{isEn ? 'Service Hours' : 'Jam Pelayanan'}</p>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">
                      {isEn ? 'Monday - Friday: 08:30 - 17:30 WIB' : companyData.contact.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Consultation Guarantee */}
            <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isEn ? 'Technical SLA Guarantee' : 'Jaminan Respons Teknis'}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isEn
                  ? 'All RFP submissions receive initial engineering feedback and preliminary link architecture feasibility assessments within 24 business hours.'
                  : 'Setiap pengajuan RFP ditindaklanjuti oleh insinyur optik senior dengan asesmen kelayakan arsitektur awal dalam waktu 1x24 jam kerja.'}
              </p>
            </div>
          </div>

          {/* Right Column: Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="_gotcha">Do not fill this field</label>
                <input
                  type="text"
                  id="_gotcha"
                  name="_gotcha"
                  value={formData._gotcha}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Full Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                    {t('contact.form.name')}
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder={isEn ? 'e.g. John Doe' : 'Contoh: Budi Santoso'}
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
                    {t('contact.form.org')}
                  </label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder={isEn ? 'e.g. National Telco Corp' : 'Contoh: PT Telekomunikasi Nusantara'}
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
                    {t('contact.form.email')}
                  </label>
                  <input
                    id="corporateEmail"
                    type="email"
                    name="corporateEmail"
                    value={formData.corporateEmail}
                    onChange={handleChange}
                    placeholder={isEn ? 'name@company.com' : 'nama@perusahaan.co.id'}
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
                    {t('contact.form.phone')}
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
                  {t('contact.form.type')}
                </label>
                <select
                  id="solutionTopic"
                  name="solutionTopic"
                  value={formData.solutionTopic}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 bg-white"
                >
                  <option value="dwdm_optical_systems">
                    {isEn ? 'DWDM Systems & Optical Backbone (Volga I)' : 'Sistem DWDM & Transmisi Backbone Optik (Volga I)'}
                  </option>
                  <option value="datacenter_interconnect">
                    {isEn ? 'Data Center Interconnect (DCI High Density)' : 'Data Center Interconnect (DCI High Density)'}
                  </option>
                  <option value="fiber_infrastructure">
                    {isEn ? 'Fiber Optic Cable Infrastructure & Turnkey OSP' : 'Infrastruktur Kabel Serat Optik & Turnkey OSP'}
                  </option>
                  <option value="nms_otdr_monitoring">
                    {isEn ? 'OTDR Ramenka Monitoring & NMS Titan' : 'Pemantauan OTDR Ramenka & NMS Titan'}
                  </option>
                  <option value="partnership_compliance">
                    {isEn ? 'Distribution Partnership & Procurement RFP' : 'Kemitraan Distribusi & Pengadaan Tender'}
                  </option>
                  <option value="other">
                    {isEn ? 'Other Requirements' : 'Kebutuhan Lainnya'}
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                  {t('contact.form.msg')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isEn ? 'Please detail your transmission link distance, capacity targets (e.g., 100G/400G), or equipment needs...' : 'Jelaskan perkiraan jarak link, kapasitas (misal 100G/400G), titik terminasi, atau kebutuhan perangkat...'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-none focus:ring-2 resize-none ${
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
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full gap-2 py-3.5 text-base shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>{t('contact.form.submitting')}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{t('contact.form.submit')}</span>
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

      </div>

      {/* Success Modal */}
      <Modal
        isOpen={!!submittedInquiryId}
        onClose={() => setSubmittedInquiryId(null)}
        title={isEn ? 'Inquiry Successfully Submitted' : 'Permintaan Konsultasi Diterima'}
      >
        <div className="space-y-4 text-center py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h4 className="text-lg font-bold text-slate-900">
            {isEn ? 'Thank you for consulting with IDTN' : 'Terima Kasih atas Pengajuan Anda'}
          </h4>
          <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
            {t('contact.form.success')}
          </p>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-xs text-slate-700">
            {isEn ? 'Inquiry Reference Ticket' : 'Nomor Tiket Referensi'}: <span className="font-bold text-sky-700">{submittedInquiryId}</span>
          </div>
          <div className="pt-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setSubmittedInquiryId(null)}
              className="w-full"
            >
              {isEn ? 'Close Window' : 'Tutup'}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
