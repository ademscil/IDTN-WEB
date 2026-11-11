import { z } from 'zod';

export const InquiryRequestSchema = z.object({
  fullName: z
    .string()
    .min(3, 'Nama lengkap minimal 3 karakter')
    .max(100, 'Nama terlalu panjang')
    .regex(/^[a-zA-Z\s.,'-]+$/, 'Nama hanya boleh memuat huruf dan spasi'),
  companyName: z
    .string()
    .min(2, 'Nama perusahaan wajib diisi')
    .max(100, 'Nama perusahaan terlalu panjang'),
  corporateEmail: z
    .string()
    .email('Format alamat email korporat tidak valid'),
  phoneNumber: z
    .string()
    .min(10, 'Nomor telepon/WhatsApp minimal 10 digit')
    .max(16, 'Nomor telepon/WhatsApp maksimal 16 digit')
    .regex(/^\+?[0-9\s-]{10,16}$/, 'Format nomor telepon tidak valid'),
  solutionTopic: z.enum([
    'dwdm_optical_systems',
    'datacenter_interconnect',
    'fiber_infrastructure',
    'nms_otdr_monitoring',
    'partnership_compliance',
    'other',
  ]),
  message: z
    .string()
    .min(10, 'Pesan deskripsi kebutuhan minimal 10 karakter')
    .max(1000, 'Pesan maksimal 1000 karakter'),
  _gotcha: z.string().max(0, 'Spam detected').optional(), // Honeypot field
});

export type InquiryRequest = z.infer<typeof InquiryRequestSchema>;
