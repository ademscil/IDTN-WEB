import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="relative pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & RFP Action (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex flex-wrap items-center gap-2">
              <Badge variant="cyan" className="py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                <span>{t('hero.badge.provider')}</span>
              </Badge>
              <Badge variant="coral" className="py-1 px-2.5 sm:px-3 text-[11px] sm:text-xs">
                <span>{t('hero.badge.partner')}</span>
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-[1.14]">
              {t('hero.title.lead')} <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#9f1b32]">
                {t('hero.title.highlight')}
              </span>{' '}
              {t('hero.title.end')}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl">
              {t('hero.description')}
            </p>

            {/* Single High-Priority Action CTA */}
            <div className="pt-2">
              <Link to="/contact" className="block sm:inline-block">
                <Button size="lg" variant="primary" className="w-full sm:w-auto justify-center gap-2.5 text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-3.5 shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30">
                  <span>{t('hero.cta.rfp')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Authentic T8 Optical Transmission Render Image (5 Cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Soft Ambient Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400/20 via-rose-300/10 to-indigo-500/20 rounded-3xl blur-2xl opacity-60 pointer-events-none" />

              <div className="relative bg-white/85 backdrop-blur-sm border border-slate-200/80 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl shadow-slate-900/5 overflow-hidden">
                <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xs sm:text-sm font-bold text-slate-900">{t('hero.graphic.title')}</h2>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-mono font-medium">{t('hero.graphic.subtitle')}</p>
                  </div>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="relative mt-3 sm:mt-4 flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-xl sm:rounded-2xl p-3 sm:p-6 overflow-hidden">
                  <img
                    src={`${import.meta.env.BASE_URL}assets/t8/hero_render.png`}
                    alt="T8 DWDM Optical Platform Chassis Render"
                    className="max-h-[260px] sm:max-h-[380px] lg:max-h-[420px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-103"
                    loading="eager"
                  />
                  {/* Subtle Badge Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 flex items-center justify-between shadow-xs gap-1">
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-800">T8 Volga I</span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Multi-Terabit Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
