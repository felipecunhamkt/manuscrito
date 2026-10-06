'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, RotateCcw, ShieldCheck, Sparkles, Volume2 } from 'lucide-react';
import { QuizAnswers } from '@/types/quiz';

interface Step4ResultProps {
  answers: QuizAnswers;
  onRestart: () => void;
  onGoToVSL?: () => void;
}

export const Step4Result: React.FC<Step4ResultProps> = ({
  answers,
  onRestart,
  onGoToVSL,
}) => {
  const {
    userName = 'Amigo(a)',
    birthDay,
    birthMonth = 'tu mes',
    birthYear,
  } = answers;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-[calc(100vh-2rem)] px-4 py-4 sm:py-6 animate-fade-in">
      {/* Top status */}
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Frecuencia 100.0 FM Sintonizada
        </span>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-500 hover:text-stone-800 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reiniciar
        </button>
      </div>

      {/* Hero Headline */}
      <div className="text-center mb-5">
        <div className="inline-block px-3.5 py-1 bg-amber-100/90 rounded-full border border-amber-300 text-amber-900 font-extrabold text-xs tracking-wider uppercase mb-2">
          {userName} • {birthDay ? `${birthDay} de ` : ''}{birthMonth} {birthYear || ''}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
          Tu Oración Oculta de las{' '}
          <span className="text-[#D4A017] underline decoration-amber-300 underline-offset-4">
            20 Palabras
          </span>{' '}
          Ha Sido Activada
        </h2>
      </div>

      {/* Sacred Parchment Card */}
      <div className="w-full relative rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 p-5 sm:p-6 shadow-xl mb-5 overflow-hidden">
        {/* Subtle decorative scroll corners */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-200/50 to-transparent pointer-events-none" />
        <div className="flex items-center justify-center gap-2 text-[#D4A017] mb-3">
          <Sparkles className="w-5 h-5" />
          <span className="text-xs font-extrabold tracking-widest uppercase">
            Las 20 Palabras Sagradas
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        <blockquote className="text-center font-serif text-lg sm:text-xl font-bold text-stone-900 leading-relaxed italic bg-white/60 p-4 rounded-xl border border-amber-200/70 shadow-inner">
          &ldquo;Padre celestial, abre los cielos sobre mi vida hoy: derrama salud inquebrantable, prosperidad divina y bendición abundante sobre todo mi hogar.&rdquo;
        </blockquote>

        <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium text-stone-600">
          <Volume2 className="w-4 h-4 text-[#D4A017]" />
          <span>Pronuncia estas palabras con fe antes de dormir</span>
        </div>
      </div>

      {/* Mini preview video card */}
      <div className="w-full bg-stone-900 text-white rounded-2xl p-4 mb-5 shadow-lg border border-stone-800 flex items-center gap-3.5">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-700">
          <Image
            src="/images/chosen-jesus-scroll.jpg"
            alt="Preview video"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-[#D4A017] flex items-center justify-center text-white text-xs pl-0.5">
              ▶
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
            Video Revelación Oficial
          </span>
          <p className="text-xs sm:text-sm font-semibold text-stone-200 leading-snug">
            Descubre el secreto de 2 minutos para sellar esta oración en tu vida.
          </p>
        </div>
      </div>

      {/* Main CTA */}
      <div className="w-full mt-auto pb-4">
        <button
          type="button"
          onClick={onGoToVSL}
          id="cta-ver-video-final"
          className="w-full py-4 px-6 rounded-xl bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] text-white font-black text-lg sm:text-xl tracking-wide shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 transition-all duration-200 pulse-gold text-center cursor-pointer"
        >
          <span>Ver Video con la Revelación Completa</span>
          <ArrowRight className="w-5 h-5 inline stroke-[2.5]" />
        </button>

        <div className="flex items-center justify-center gap-2 mt-3 text-stone-500 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Acceso inmediato y protegido</span>
        </div>
      </div>
    </div>
  );
};
