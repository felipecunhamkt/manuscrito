'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step1BirthMonthProps {
  selectedMonth?: string;
  onSelectMonth: (month: string) => void;
  onBack: () => void;
}

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const Step1BirthMonth: React.FC<Step1BirthMonthProps> = ({
  selectedMonth: initialSelected,
  onSelectMonth,
  onBack,
}) => {
  const [selected, setSelected] = useState<string | null>(initialSelected || null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (month: string) => {
    if (isSubmitting) return;
    setSelected(month);
    setIsSubmitting(true);

    // Provide subtle haptic feedback on supported mobile devices
    if (typeof window !== 'undefined' && window.navigator && 'vibrate' in window.navigator) {
      try {
        window.navigator.vibrate(35);
      } catch {
        // Ignore if restricted
      }
    }

    // Small delay to allow the user to see the selection state before sliding to next
    setTimeout(() => {
      onSelectMonth(month);
      setIsSubmitting(false);
    }, 280);
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      {/* Barra superior com botão voltar */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Volver atrás"
          id="btn-back-month"
          className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
        </button>
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Paso 1 de 9
        </span>
      </div>

      {/* Título da pergunta */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Selecciona tu mes de Nacimiento
        </h2>

      </div>

      {/* Grid de opções em 2 colunas com 12 botões ao todo */}
      <div className="grid grid-cols-2 gap-3 w-full pb-6">
        {MONTHS.map((month, index) => {
          const isCurrentSelected = selected === month;

          return (
            <button
              key={month}
              type="button"
              id={`month-option-${month.toLowerCase()}`}
              onClick={() => handleSelect(month)}
              className={`
                group relative flex items-center gap-2.5 px-3.5 py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white
                shadow-md transition-all duration-200 cursor-pointer select-none
                ${isCurrentSelected
                  ? 'bg-[#B5850F] scale-[0.98] ring-2 ring-white ring-offset-2 ring-offset-[#D4A017] shadow-lg'
                  : 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] active:bg-[#a2750a]'
                }
              `}
            >
              {/* Ícone de círculo/radio à esquerda */}
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

              {/* Nome do mês */}
              <span className="truncate tracking-wide">{month}</span>

              {/* Indicador numérico discreto do mês (01, 02...) */}
              <span className="ml-auto text-[10px] font-medium text-white/50 group-hover:text-white/80">
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto py-2 text-center">
        <p className="text-[11px] text-stone-400">
          Tus datos se mantienen en estricta reserva espiritual.
        </p>
      </div>
    </div>
  );
};
