import { describe, it, expect } from 'vitest';
import companyData from '../../data/company.json';
import complianceData from '../../data/compliance.json';
import clientsData from '../../data/clients.json';
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

  it('should validate clients.json has 4 strategic industry segments with required fields', () => {
    expect(Array.isArray(clientsData)).toBe(true);
    expect(clientsData.length).toBe(4);
    for (const client of clientsData) {
      expect(client.id).toBeTruthy();
      expect(client.name).toBeTruthy();
      expect(client.category).toBeTruthy();
      expect(client.role).toBeTruthy();
      expect(client.description).toBeTruthy();
    }
  });

  it('should validate company.json philosophy and etymology match 4 pillars and 4 cards', () => {
    expect(companyData.philosophy.pillars.length).toBe(4);
    expect(companyData.nameEtymology.length).toBe(4);
    expect(companyData.twoPillars.length).toBe(2);
    for (const pillar of companyData.twoPillars) {
      expect(pillar.points.length).toBe(3);
    }
    expect(companyData.mission.length).toBe(3);
  });
});
