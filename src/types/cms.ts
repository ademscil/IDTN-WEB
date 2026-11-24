export interface BilingualText {
  id: string;
  en: string;
}

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
}

export interface StrategicSegment {
  id: string;
  name: string;
  category: string;
  role: string;
  description: string;
  status_badge?: string;
  is_partner?: boolean;
}

export interface PhilosophyPillar {
  title: string;
  desc: string;
}

export interface EtymologyCard {
  word: string;
  meaning: string;
}

export interface BusinessPillar {
  title: string;
  desc: string;
  points: string[];
}

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export interface TrustMetric {
  title: string;
  subtitle: string;
}

export type CmsSectionValue =
  | string
  | number
  | boolean
  | string[]
  | PhilosophyPillar[]
  | EtymologyCard[]
  | BusinessPillar[]
  | StrategicSegment[]
  | FaqItem[]
  | TrustMetric[]
  | Record<string, string>;

export interface PageContentData {
  seo: {
    id: PageSeo;
    en: PageSeo;
  };
  hero: {
    id: Record<string, string>;
    en: Record<string, string>;
  };
  sections: {
    id: Record<string, CmsSectionValue>;
    en: Record<string, CmsSectionValue>;
  };
  updated_at?: string;
}

export interface FooterContactData {
  email: string;
  phone: string;
  whatsapp: string;
  linkedin_url: string;
  sdppi_status: BilingualText;
}

export interface FooterSettingsData {
  company_summary: BilingualText;
  philosophy_quote: BilingualText;
  copyright: BilingualText;
  address: BilingualText;
  contact: FooterContactData;
  updated_at?: string;
}

export interface CmsProduct {
  id: number;
  slug: string;
  name: string;
  category: string;
  form_factor: string;
  capacity: string;
  description: BilingualText;
  specs: Record<string, string>;
  datasheet_url?: string;
  sort_order: number;
  is_active?: boolean;
}

export interface CmsClient {
  id: number;
  name: string;
  category: string;
  logo_url: string;
  is_partner: boolean;
  sort_order: number;
  is_active?: boolean;
}

export interface CmsInquiry {
  id: number;
  full_name: string;
  company: string;
  work_email: string;
  phone: string;
  solution_interest: string;
  project_summary: string;
  status: 'unread' | 'contacted' | 'archived';
  ip_address?: string;
  created_at: string;
}

export interface CmsMediaFile {
  id: number;
  original_name: string;
  file_name: string;
  file_path: string;
  file_type: string;
  file_size: number;
  uploaded_at: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name: string;
  created_at?: string;
  last_login?: string | null;
}
