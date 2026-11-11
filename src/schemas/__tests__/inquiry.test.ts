import { describe, it, expect } from 'vitest';
import { InquiryRequestSchema } from '../inquiry.schema';

describe('Inquiry Request Schema Validation', () => {
  it('should accept valid inquiry form payload', () => {
    const validData = {
      fullName: 'Budi Santoso',
      companyName: 'PT Telekomunikasi Nusantara',
      corporateEmail: 'budi@telkonusantara.co.id',
      phoneNumber: '+6281234567890',
      solutionTopic: 'dwdm_optical_systems',
      message: 'Permohonan penawaran sistem DWDM kapasitas 100G rute Jakarta - Surabaya.',
      _gotcha: '',
    };
    const result = InquiryRequestSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('should reject invalid email format', () => {
    const invalidData = {
      fullName: 'Budi Santoso',
      companyName: 'PT Telco',
      corporateEmail: 'budi-invalid-email',
      phoneNumber: '+6281234567890',
      solutionTopic: 'dwdm_optical_systems',
      message: 'Permohonan penawaran teknis.',
    };
    const result = InquiryRequestSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should reject bot submissions when honeypot is filled', () => {
    const botData = {
      fullName: 'Bot User',
      companyName: 'Spam Co',
      corporateEmail: 'bot@spam.com',
      phoneNumber: '+12345678901',
      solutionTopic: 'other',
      message: 'Buy our spam product now.',
      _gotcha: 'http://spam.link',
    };
    const result = InquiryRequestSchema.safeParse(botData);
    expect(result.success).toBe(false);
  });
});
