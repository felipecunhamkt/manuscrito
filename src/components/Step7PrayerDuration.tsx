'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step7PrayerDurationProps {
  selectedDuration?: string;
  onSelectDuration: (duration: string) => void;
  onBack: () => void;
}

const OPTIONS = [
  'Hace pocas semanas',
  'Hace varios meses',
  'Hace más de un año',
  'Ya perdí la cuenta',
];

export const Step7PrayerDuration: React.FC<Step7PrayerDurationProps> = ({
  selectedDuration: initialSelected,
  onSelectDuration,
  onBack,
}) => {
  const [selected, setSelected] = useState<string | null>(initialSelected || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (option: string) => {
    if (isSubmitting) return;
    setSelected(option);
    setIsSubmitting(true);

    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      onSelectDuration(option);
      setIsSubmitting(false);
    }, 240);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      <div>
        {/* Barra superior com botão voltar */}
        <div className="w-full flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver atrás"
            id="btn-back-duration"
            className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Paso 7 de 9
          </span>
        </div>

        {/* Título da pergunta */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            ¿Cuánto tiempo llevas poniendo esto en oración?
          </h2>

        </div>

        {/* Opções */}
        <div className="flex flex-col gap-3 w-full">
          {OPTIONS.map((option, index) => {
            const isCurrentSelected = selected === option;

            return (
              <button
                key={option}
                type="button"
                id={`duration-option-${index}`}
                onClick={() => handleSelect(option)}
                className={`
                  group relative flex items-center gap-3.5 p-4 rounded-xl font-bold text-white text-left
                  shadow-md transition-all duration-150 cursor-pointer select-none
                  ${isCurrentSelected
                    ? 'bg-[#B5850F] scale-[0.98] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                    : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] active:bg-[#a2750a]'
                  }
                `}
              >
                {/* Ícone de rádio */}
                <div
                  className={`
                    w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                    ${isCurrentSelected
                      ? 'border-white bg-white text-[#D4A017]'
                      : 'border-white/80 group-hover:border-white'
                    }
                  `}
                >
                  {isCurrentSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D4A017]" />
                  )}
                </div>

                <span className="text-base sm:text-lg font-bold tracking-tight text-white leading-snug">
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-[11px] text-stone-400">
          Tu persistencia está a punto de encontrar la clave correcta.
        </p>
      </div>
    </div>
  );
};
