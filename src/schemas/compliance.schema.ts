import { z } from 'zod';

export const ComplianceItemSchema = z.object({
  id: z.string(),
  category: z.enum(['legalitas', 'sertifikasi', 'laporan_audit', 'izin_khusus']),
  title: z.string(),
  issuingBody: z.string(),
  regNumber: z.string(),
  summary: z.string(),
  badge: z.string(),
  status: z.enum(['draft', 'pending_verification', 'approved']),
  details: z.string(),
});

export const ComplianceDatasetSchema = z.array(ComplianceItemSchema);
export type ComplianceItem = z.infer<typeof ComplianceItemSchema>;
