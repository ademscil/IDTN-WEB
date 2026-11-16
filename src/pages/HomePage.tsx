import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Network, Building2, PhoneCall } from 'lucide-react';
import { HeroSection } from '../components/sections/HeroSection';
import { TrustStripSection } from '../components/sections/TrustStripSection';
import { FAQSection } from '../components/sections/FAQSection';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { useLanguage } from '../context';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      to: '/about',
      badge: t('home.card.about.tag'),
      title: t('home.card.about.title'),
      desc: t('home.card.about.desc'),
      cta: t('home.card.about.cta'),
      icon: Building2,
      accent: 'hover:border-sky-500 hover:shadow-sky-500/10',
      iconBg: 'bg-sky-50 text-sky-600',
    },
    {
      to: '/equipment',
      badge: t('home.card.equipment.tag'),
      title: t('home.card.equipment.title'),
      desc: t('home.card.equipment.desc'),
      cta: t('home.card.equipment.cta'),
      icon: Cpu,
      accent: 'hover:border-rose-500 hover:shadow-rose-500/10',
      iconBg: 'bg-rose-50 text-rose-600',
    },
    {
      to: '/clients',
      badge: t('home.card.clients.tag'),
      title: t('home.card.clients.title'),
      desc: t('home.card.clients.desc'),
      cta: t('home.card.clients.cta'),
      icon: Network,
      accent: 'hover:border-emerald-500 hover:shadow-emerald-500/10',
      iconBg: 'bg-emerald-50 text-emerald-600',
    },
    {
      to: '/contact',
      badge: t('home.card.contact.tag'),
      title: t('home.card.contact.title'),
      desc: t('home.card.contact.desc'),
      cta: t('home.card.contact.cta'),
      icon: PhoneCall,
      accent: 'hover:border-amber-500 hover:shadow-amber-500/10',
      iconBg: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="space-y-16 md:space-y-24">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trust Strip */}
      <TrustStripSection />

      {/* 3. Core Strategic Capabilities & Direct Portal Navigation */}
      <section className="py-12 bg-gradient-to-b from-white via-slate-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3 sm:space-y-4">
            <Badge variant="cyan">{t('home.overview.tag')}</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('home.overview.title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              {t('home.overview.desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
            {cards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Link
                  key={card.to}
                  to={card.to}
                  className={`group relative p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/90 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.accent}`}
                >
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center ${card.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-mono font-bold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-sky-600 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-base text-slate-600 leading-relaxed mb-4 sm:mb-6">
                    {card.desc}
                  </p>

                  <div className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-bold text-sky-600 group-hover:text-sky-700">
                    <span>{card.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. DWDM Knowledge Base & FAQ (Optimized for Direct Answer Search Engine Snippets) */}
      <FAQSection />

      {/* 5. High-Impact Call to Action Banner */}
      <section className="pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 px-5 py-8 sm:px-14 sm:py-16 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.25),transparent_50%)] pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-5">
              <Badge variant="cyan" className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-xs">
                {t('home.banner.badge')}
              </Badge>
              <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                {t('home.banner.title')}
              </h2>
              <p className="text-xs sm:text-sm lg:text-base text-slate-300 leading-relaxed">
                {t('home.banner.desc')}
              </p>
              <div className="pt-2 sm:pt-3">
                <Link to="/contact" className="block sm:inline-block">
                  <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center gap-2.5 shadow-lg shadow-sky-500/20 text-sm sm:text-base">
                    <span>{t('home.banner.cta')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
