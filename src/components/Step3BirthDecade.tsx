'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step3BirthDecadeProps {
  selectedDecade?: number;
  onSelectDecade: (decade: number) => void;
  onBack: () => void;
}

const DECADES = [1940, 1950, 1960, 1970, 1980, 1990, 2000];

export const Step3BirthDecade: React.FC<Step3BirthDecadeProps> = ({
  selectedDecade: initialSelected,
  onSelectDecade,
  onBack,
}) => {
  const [selected, setSelected] = useState<number | null>(initialSelected || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (decade: number) => {
    if (isSubmitting) return;
    setSelected(decade);
    setIsSubmitting(true);

    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      onSelectDecade(decade);
      setIsSubmitting(false);
    }, 240);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      {/* Barra superior com botão voltar */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver atrás"
          id="btn-back-decade"
          className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Paso 3 de 9
        </span>
      </div>

      {/* Título da pergunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Selecciona la Década de tu Nacimiento
        </h2>

      </div>

      {/* Layout: Grelha com 3 colunas (grid-cols-3) */}
      <div className="grid grid-cols-3 gap-3 w-full pb-6">
        {DECADES.map((decade, index) => {
          const isCurrentSelected = selected === decade;
          // The 7th item (index 6, '2000') can sit in col-span-3 or col-start-2 to look centered and balanced
          const isLastSingle = index === DECADES.length - 1;

          return (
            <button
              key={decade}
              type="button"
              id={`decade-option-${decade}`}
              onClick={() => handleSelect(decade)}
              className={`
                group relative flex items-center justify-center gap-2 py-4 px-2 rounded-xl font-extrabold text-base sm:text-lg text-white
                shadow-md transition-all duration-150 cursor-pointer select-none
                ${isLastSingle ? 'col-span-3 sm:col-span-1 sm:col-start-2' : ''}
                ${isCurrentSelected
                  ? 'bg-[#B5850F] scale-[0.97] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                  : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.97] active:bg-[#a2750a]'
                }
              `}
            >
              {/* Círculo de seleção sutil */}
              <div
                className={`
                  w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${isCurrentSelected
                    ? 'border-white bg-white text-[#D4A017]'
                    : 'border-white/70 group-hover:border-white'
                  }
                `}
              >
                {isCurrentSelected && (
                  <div className="w-2 h-2 rounded-full bg-[#D4A017]" />
                )}
              </div>

              {/* Década (Ex: 1970s / 1970) */}
              <span className="tracking-wide">{decade}s</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto py-2 text-center">
        <p className="text-[11px] text-stone-400">
          Selección confidencial para calcular tu resonancia.
        </p>
      </div>
    </div>
  );
};
