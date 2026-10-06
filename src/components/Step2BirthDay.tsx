'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step2BirthDayProps {
  selectedDay?: number | string;
  onSelectDay: (day: number | string) => void;
  onBack: () => void;
}

export const Step2BirthDay: React.FC<Step2BirthDayProps> = ({
  selectedDay: initialSelected,
  onSelectDay,
  onBack,
}) => {
  const [selected, setSelected] = useState<number | string | null>(initialSelected || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate days 1 to 31 formatted with leading zero
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSelect = (day: number) => {
    if (isSubmitting) return;
    setSelected(day);
    setIsSubmitting(true);

    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(30);
      } catch {
        // ignore
      }
    }

    setTimeout(() => {
      onSelectDay(day);
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
          id="btn-back-day"
          className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Paso 2 de 9
        </span>
      </div>

      {/* Título da pergunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Selecciona tu día de Nacimiento
        </h2>

      </div>

      {/* Layout: Grelha com 4 colunas (grid-cols-4) contendo 31 botões */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full pb-6">
        {days.map((day) => {
          const isCurrentSelected = selected === day;
          const formattedDay = String(day).padStart(2, '0');

          return (
            <button
              key={day}
              type="button"
              id={`day-option-${formattedDay}`}
              onClick={() => handleSelect(day)}
              className={`
                group relative flex items-center justify-center gap-1.5 py-3 sm:py-3.5 px-1.5 rounded-xl font-extrabold text-sm sm:text-base text-white
                shadow-md transition-all duration-150 cursor-pointer select-none
                ${isCurrentSelected
                  ? 'bg-[#B5850F] scale-[0.96] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                  : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.96] active:bg-[#a2750a]'
                }
              `}
            >
              {/* Círculo de seleção sutil à esquerda */}
              <div
                className={`
                  w-3.5 h-3.5 rounded-full border-1.5 flex items-center justify-center shrink-0 transition-colors
                  ${isCurrentSelected
                    ? 'border-white bg-white text-[#D4A017]'
                    : 'border-white/70 group-hover:border-white'
                  }
                `}
              >
                {isCurrentSelected && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017]" />
                )}
              </div>

              {/* Número do dia */}
              <span className="tracking-wide leading-none">{formattedDay}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto py-2 text-center">
        <p className="text-[11px] text-stone-400">
          🔒 Conexión segura y privada.
        </p>
      </div>
    </div>
  );
};
