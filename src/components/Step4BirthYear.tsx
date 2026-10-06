'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step4BirthYearProps {
  decade: number;
  selectedYear?: number;
  onSelectYear: (year: number) => void;
  onBack: () => void;
}

export const Step4BirthYear: React.FC<Step4BirthYearProps> = ({
  decade = 1980,
  selectedYear: initialSelected,
  onSelectYear,
  onBack,
}) => {
  const [selected, setSelected] = useState<number | null>(initialSelected || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate the 10 years of the chosen decade (e.g. 1970 -> [1970, 1971, ... 1979])
  const years = Array.from({ length: 10 }, (_, i) => decade + i);

  const handleSelect = (year: number) => {
    if (isSubmitting) return;
    setSelected(year);
    setIsSubmitting(true);

    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      onSelectYear(year);
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
          id="btn-back-year"
          className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Paso 4 de 9
        </span>
      </div>

      {/* Título da pergunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Selecciona el Año de tu Nacimiento
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-medium">
          Años correspondientes a la década de los <span className="font-bold text-[#D4A017]">{decade}s</span>
        </p>
      </div>

      {/* Layout: Grelha responsiva de 3 colunas */}
      <div className="grid grid-cols-3 gap-3 w-full pb-6">
        {years.map((year, index) => {
          const isCurrentSelected = selected === year;
          // The 10th item (index 9) can be centered or span nicely
          const isLastSingle = index === years.length - 1;

          return (
            <button
              key={year}
              type="button"
              id={`year-option-${year}`}
              onClick={() => handleSelect(year)}
              className={`
                group relative flex items-center justify-center gap-1.5 sm:gap-2 py-3.5 px-2 rounded-xl font-extrabold text-base text-white
                shadow-md transition-all duration-150 cursor-pointer select-none
                ${isLastSingle ? 'col-span-3 sm:col-span-1 sm:col-start-2' : ''}
                ${
                  isCurrentSelected
                    ? 'bg-[#B5850F] scale-[0.97] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                    : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.97] active:bg-[#a2750a]'
                }
              `}
            >
              {/* Círculo de seleção sutil */}
              <div
                className={`
                  w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                  ${
                    isCurrentSelected
                      ? 'border-white bg-white text-[#D4A017]'
                      : 'border-white/70 group-hover:border-white'
                  }
                `}
              >
                {isCurrentSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                )}
              </div>

              {/* Ano */}
              <span className="tracking-wide leading-none">{year}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto py-2 text-center">
        <p className="text-[11px] text-stone-400">
          Tu año calibra el ciclo de bendición específico de las 20 palabras.
        </p>
      </div>
    </div>
  );
};
