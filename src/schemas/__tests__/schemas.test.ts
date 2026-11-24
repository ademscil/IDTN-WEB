import { describe, it, expect } from 'vitest';
import companyData from '../../data/company.json';
import complianceData from '../../data/compliance.json';
import clientsData from '../../data/clients.json';
import { defaultPages, mergePageWithDefaults } from '../../data/defaultCmsData';
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

  it('should validate defaultPages about has all Pak Andik requested sections', () => {
    const aboutId = defaultPages.about.sections.id;
    const aboutEn = defaultPages.about.sections.en;
    expect(aboutId.intro_lead).toBeTruthy();
    expect(aboutId.intro_desc).toBeTruthy();
    expect(aboutId.metric1_val).toBe('8.514,22');
    expect(aboutId.metric2_val).toBe('800');
    expect(aboutId.metric3_val).toBe('R&D & Pelatihan');
    expect((aboutId.philosophy_pillars as unknown[]).length).toBe(4);
    expect((aboutId.etymology_cards as unknown[]).length).toBe(4);
    expect((aboutId.two_pillars as unknown[]).length).toBe(2);
    expect((aboutId.mission_points as unknown[]).length).toBe(3);

    expect(aboutEn.intro_lead).toBeTruthy();
    expect(aboutEn.intro_desc).toBeTruthy();
    expect(aboutEn.metric1_val).toBe('8,514.22');
    expect(aboutEn.metric2_val).toBe('800');
    expect(aboutEn.metric3_val).toBe('R&D & Training');
    expect((aboutEn.philosophy_pillars as unknown[]).length).toBe(4);
    expect((aboutEn.etymology_cards as unknown[]).length).toBe(4);
    expect((aboutEn.two_pillars as unknown[]).length).toBe(2);
    expect((aboutEn.mission_points as unknown[]).length).toBe(3);
  });

  it('should validate defaultPages client has 4 strategic industry segments in dual language', () => {
    const clientSecId = defaultPages.client.sections.id;
    const clientSecEn = defaultPages.client.sections.en;
    expect((clientSecId.strategic_segments as unknown[]).length).toBe(4);
    expect((clientSecEn.strategic_segments as unknown[]).length).toBe(4);
  });

  it('should deep-merge partial server page without dropping missing default sections', () => {
    const partialServerAbout = {
      seo_title_id: 'Custom About Title',
      sections: {
        id: { intro_lead: 'CUSTOM INTRO LEAD' },
        en: {}
      }
    };
    const merged = mergePageWithDefaults('about', partialServerAbout as unknown as Partial<typeof defaultPages['about']>);
    expect(merged.seo.id.title).toBe('Custom About Title');
    expect(merged.sections.id.intro_lead).toBe('CUSTOM INTRO LEAD');
    // Default sections must be preserved:
    expect(merged.sections.id.metric1_val).toBe('8.514,22');
    expect((merged.sections.id.philosophy_pillars as unknown[]).length).toBe(4);
    expect((merged.sections.id.etymology_cards as unknown[]).length).toBe(4);
  });
});
