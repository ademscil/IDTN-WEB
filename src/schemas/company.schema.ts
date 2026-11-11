import { z } from 'zod';

export const CompanyProfileSchema = z.object({
  legalName: z.string().min(3),
  brandName: z.string(),
  tagline: z.string(),
  shortDescription: z.string(),
  aboutText: z.string(),
  foundedYear: z.number().int(),
  industry: z.string(),
  focus: z.string(),
  marketPath: z.string(),
  philosophy: z.object({
    headline: z.string(),
    subheadline: z.string(),
    pillars: z.array(
      z.object({
        title: z.string(),
        desc: z.string(),
      })
    ),
  }),
  nameEtymology: z.array(
    z.object({
      word: z.string(),
      meaning: z.string(),
    })
  ),
  vision: z.string(),
  mission: z.array(z.string()),
  coreValues: z.array(
    z.object({
      code: z.string(),
      title: z.string(),
      desc: z.string(),
    })
  ),
  twoPillars: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
      points: z.array(z.string()),
    })
  ),
  applicationSectors: z.array(
    z.object({
      title: z.string(),
      desc: z.string(),
      badge: z.string(),
    })
  ),
  headquarters: z.object({
    address: z.string(),
    city: z.string(),
    province: z.string(),
    postalCode: z.string(),
    country: z.string(),
  }),
  contact: z.object({
    officialEmail: z.string().email(),
    phoneOffice: z.string(),
    whatsappHotline: z.string(),
    workingHours: z.string(),
  }),
});

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
