'use client';

import React, { useState } from 'react';
import { ArrowLeft, Coins, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react';

interface Step2IntentProps {
  selectedMonth: string;
  selectedIntent?: string;
  onSelectIntent: (intent: string) => void;
  onBack: () => void;
}

const INTENT_OPTIONS = [
  {
    id: 'prosperidad',
    title: 'Prosperidad y Abundancia',
    subtitle: 'Abrir puertas financieras y pagar deudas pendientes',
    icon: Coins,
  },
  {
    id: 'salud',
    title: 'Salud y Sanación',
    subtitle: 'Restauración física y bienestar para el cuerpo y mente',
    icon: HeartPulse,
  },
  {
    id: 'paz',
    title: 'Paz Espiritual y Claridad',
    subtitle: 'Aliviar la ansiedad, angustia y encontrar serenidad',
    icon: Sparkles,
  },
  {
    id: 'familia',
    title: 'Protección para la Familia',
    subtitle: 'Blindar el hogar y guiar a los seres queridos',
    icon: ShieldCheck,
  },
];

export const Step2Intent: React.FC<Step2IntentProps> = ({
  selectedMonth,
  selectedIntent: initialIntent,
  onSelectIntent,
  onBack,
}) => {
  const [selected, setSelected] = useState<string | null>(initialIntent || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (id: string) => {
    if (isSubmitting) return;
    setSelected(id);
    setIsSubmitting(true);

    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(35);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      onSelectIntent(id);
      setIsSubmitting(false);
    }, 280);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      {/* Barra superior */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver atrás"
          id="btn-back-intent"
          className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
            {selectedMonth}
          </span>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Paso 2 de 3
          </span>
        </div>
      </div>

      {/* Título da pergunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          ¿Cuál es tu mayor bendición anhelada hoy?
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-medium">
          La oración sagrada canaliza su energía hacia tu principal necesidad
        </p>
      </div>

      {/* Lista de opções verticais para impacto no mobile */}
      <div className="flex flex-col gap-3 w-full pb-6">
        {INTENT_OPTIONS.map((option) => {
          const isCurrentSelected = selected === option.id;
          const Icon = option.icon;

          return (
            <button
              key={option.id}
              type="button"
              id={`intent-option-${option.id}`}
              onClick={() => handleSelect(option.id)}
              className={`
                group relative flex items-center gap-3.5 p-4 rounded-xl font-bold text-white text-left
                shadow-md transition-all duration-200 cursor-pointer select-none
                ${
                  isCurrentSelected
                    ? 'bg-[#B5850F] scale-[0.98] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                    : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] active:bg-[#a2750a]'
                }
              `}
            >
              <div
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${
                    isCurrentSelected
                      ? 'bg-white text-[#D4A017]'
                      : 'bg-white/20 text-white group-hover:bg-white/30'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                  {option.title}
                </span>
                <span className="text-xs text-amber-100 font-normal mt-0.5 leading-snug opacity-90">
                  {option.subtitle}
                </span>
              </div>

              {/* Indicador tipo rádio */}
              <div
                className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0
                  ${
                    isCurrentSelected
                      ? 'border-white bg-white text-[#D4A017]'
                      : 'border-white/70'
                  }
                `}
              >
                {isCurrentSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
