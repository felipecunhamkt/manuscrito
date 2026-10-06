'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Step0LandingProps {
  onContinue: () => void;
}

export const Step0Landing: React.FC<Step0LandingProps> = ({ onContinue }) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-between min-h-[calc(100vh-2rem)] px-4 py-4 sm:py-6 animate-fade-in">
      <div className="w-full flex flex-col items-center">
        {/* Título de destaque superior com marca-texto sutil */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-4 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#D4A017]" />
          <span>
            Descubre la <mark className="bg-amber-300/80 text-amber-950 font-bold px-1 rounded">oración de 20 palabras</mark>
          </span>
        </div>

        {/* Imagem Central: Card com bordas levemente arredondadas */}
        <div className="w-full relative rounded-2xl overflow-hidden shadow-xl border border-stone-200/80 bg-white mb-4 group">
          <div className="relative w-full aspect-square max-h-[380px] overflow-hidden bg-stone-100">
            <Image
              src="/images/chosen-jesus-scroll.jpg"
              alt="Actor interpretando a Jesús sosteniendo la oración sagrada"
              fill
              priority
              className="object-cover object-center group-hover:scale-102 transition-transform duration-700 ease-out"
              sizes="(max-width: 640px) 100vw, 448px"
            />
          </div>
        </div>

        {/* Headline de impacto com suporte a cores destacadas */}
        <h1 className="text-xl mt-4 sm:text-2xl font-extrabold text-stone-900 text-center leading-snug sm:leading-tight mb-6 px-1">
          Actor Que Interpreta a{' '}
          <span className="text-red-600 font-black decoration-red-200 underline decoration-2 underline-offset-4">
            Jesús en la Serie The Chosen
          </span>{' '}
          Revela: Oración Oculta Por 2 Mil Años Para Atraer{' '}
          <span className="text-red-600 font-black">
            Prosperidad y Salud
          </span>
        </h1>

        {/* Prova de urgência / garantia sutil mobile-first */}

      </div>

      {/* Botão de ação (CTA) */}
      <div className="w-full pt-2 pb-4">
        <button
          type="button"
          onClick={onContinue}
          id="cta-step0-continue"
          className="w-full py-4 px-6 rounded-xl bg-[#D4A017] hover:bg-[#c18f12] active:bg-[#a2750a] active:scale-[0.98] text-white font-extrabold text-lg sm:text-xl tracking-wide shadow-lg shadow-amber-500/25 transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer select-none pulse-gold"
        >
          <span>Continuar</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </button>
        <p className="text-center text-[11px] text-stone-400 mt-2">
          🔒 Confidencial y 100% gratuito
        </p>
      </div>
    </div>
  );
};
