'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Radio } from 'lucide-react';

interface Step9FrequencyBridgeProps {
  userName: string;
  onContinue: () => void;
  onBack: () => void;
}

export const Step9FrequencyBridge: React.FC<Step9FrequencyBridgeProps> = ({
  userName = 'amigo(a)',
  onContinue,
  onBack,
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      <div>
        {/* Barra superior com botão voltar */}
        <div className="w-full flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver atrás"
            id="btn-back-frequency"
            className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Paso 9 de 9
          </span>
        </div>

        {/* Título com destaque em vermelho */}
        <div className="text-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
            {userName},{' '}
            <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-lg inline-block shadow-sm">
              no es falta de fe.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-3 font-medium leading-relaxed px-1">
            No necesitas rogar. No necesitas repetir la misma oración decenas de veces, solo estás orando en la frecuencia equivocada.
          </p>
        </div>

        {/* Card central escuro/preto com o gráfico comparativo de frequências */}
        <div className="w-full bg-stone-950 text-white rounded-2xl p-4 sm:p-5 border border-stone-800 shadow-2xl mb-5 relative overflow-hidden">
          {/* Subtle glowing background ambient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-900/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header do Card */}
          <div className="flex items-center justify-between pb-3 border-b border-stone-800/80 mb-4">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#D4A017]" />
              Espectrograma Espiritual
            </span>
            <span className="text-[10px] font-semibold bg-stone-800 text-stone-300 px-2 py-0.5 rounded">
              Sintonizador
            </span>
          </div>

          {/* Frequência Alinhada (Topo: 100.0 FM - Roxo) */}
          <div className="mb-5 bg-stone-900/80 rounded-xl p-3 border border-purple-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-extrabold text-purple-300 flex items-center gap-1.5">
                <span>✅ 100.0 FM</span>
                <span className="text-[10px] font-normal text-purple-400/80">Sintonía Sagrada</span>
              </span>
              <span className="text-[10px] font-bold text-purple-300 bg-purple-950/70 border border-purple-500/40 px-2 py-0.5 rounded-full">
                100% Conexión
              </span>
            </div>

            {/* Onda Senoidal Pura Harmônica em Roxo */}
            <div className="w-full h-12 flex items-center justify-center overflow-hidden bg-black/40 rounded-lg px-2">
              <svg className="w-full h-10" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleWave" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818CF8" />
                    <stop offset="50%" stopColor="#C084FC" />
                    <stop offset="100%" stopColor="#E879F9" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,20 Q25,-2 50,20 T100,20 T150,20 T200,20 T250,20 T300,20"
                  stroke="url(#purpleWave)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
              </svg>
            </div>
            <p className="text-[10px] text-purple-300/80 mt-1.5 font-medium text-right">
              Flujo directo hacia el Creador sin interferencias
            </p>
          </div>

          {/* Frequência Desalinhada (Base: 99.8 FM - Laranja / Ruído) */}
          <div className="bg-stone-900/80 rounded-xl p-3 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-extrabold text-amber-400 flex items-center gap-1.5">
                <span>❌ 99.8 FM</span>
                <span className="text-[10px] font-normal text-amber-400/80">Frecuencia Equivocada</span>
              </span>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded-full">
                Bloqueo Espiritual
              </span>
            </div>

            {/* Onda Irregular / Ruído Errático em Laranja */}
            <div className="w-full h-12 flex items-center justify-center overflow-hidden bg-black/40 rounded-lg px-2">
              <svg className="w-full h-10" viewBox="0 0 300 40" fill="none" preserveAspectRatio="none">
                <path
                  d="M0,20 L15,10 L30,30 L45,18 L60,22 L75,5 L90,35 L105,12 L120,28 L135,16 L150,34 L165,8 L180,24 L195,14 L210,32 L225,6 L240,26 L255,18 L270,30 L285,14 L300,20"
                  stroke="#FB923C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[10px] text-amber-400/80 mt-1.5 font-medium text-right">
              Ruido estático: las oraciones se disipan en el aire
            </p>
          </div>
        </div>

        {/* Botão CTA Principal: DESCUBRIR MI FRECUENCIA */}
        <button
          type="button"
          onClick={onContinue}
          id="cta-discover-frequency"
          className="w-full py-4 px-6 rounded-xl bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] active:bg-[#a2750a] text-white font-black text-lg sm:text-xl tracking-wider uppercase shadow-xl shadow-amber-500/30 flex items-center justify-center gap-3 cursor-pointer select-none transition-all duration-200 pulse-gold"
        >
          <span>DESCUBRIR MI FRECUENCIA</span>
          <ArrowRight className="w-5 h-5 stroke-[3]" />
        </button>
      </div>

      {/* Texto em rodapé */}
      <div className="pt-4 pb-2 text-center">
        <p className="text-xl font-extrabold text-stone-900 leading-snug">
          El Creador no es sordo.
        </p>
        <p className="text-xs text-stone-500 mt-1 font-medium leading-relaxed">
          Lo que necesitas es aprender a dirigir tu oración a la frecuencia correcta.
        </p>
      </div>
    </div>
  );
};
