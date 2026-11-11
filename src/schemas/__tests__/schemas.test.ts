import { describe, it, expect } from 'vitest';
import companyData from '../../data/company.json';
import complianceData from '../../data/compliance.json';
import { CompanyProfileSchema } from '../company.schema';
import { ComplianceDatasetSchema } from '../compliance.schema';

describe('Local CMS Datasets Validation', () => {
  it('should validate company.json against CompanyProfileSchema', () => {
    const result = CompanyProfileSchema.safeParse(companyData);
    expect(result.success).toBe(true);
  });

  it('should validate compliance.json against ComplianceDatasetSchema', () => {
    const result = ComplianceDatasetSchema.safeParse(complianceData);
    expect(result.success).toBe(true);
  });
});
