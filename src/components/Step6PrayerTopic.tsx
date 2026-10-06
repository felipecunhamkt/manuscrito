'use client';

import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Step6PrayerTopicProps {
  userName: string;
  selectedTopic?: string;
  onSelectTopic: (topic: string) => void;
  onBack: () => void;
}

const OPTIONS = [
  'Sí, así es.',
  'Sí, le he estado pidiendo mucho a Dios.',
  'Sí, hay algunas cosas por las que he estado orando.',
  'Aún no lo he puesto en oración.',
];

export const Step6PrayerTopic: React.FC<Step6PrayerTopicProps> = ({
  userName = 'amigo(a)',
  selectedTopic: initialSelected,
  onSelectTopic,
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
      onSelectTopic(option);
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
            id="btn-back-topic"
            className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Paso 6 de 9
          </span>
        </div>

        {/* Título Dinâmico */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            <span className="text-[#D4A017]">{userName}</span>, ¿hay algo que le has estado pidiendo a Dios en tus oraciones?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1.5 font-medium">
            Abre tu corazón con total honestidad
          </p>
        </div>

        {/* Opções (botões verticais em lista) */}
        <div className="flex flex-col gap-3 w-full">
          {OPTIONS.map((option, index) => {
            const isCurrentSelected = selected === option;

            return (
              <button
                key={option}
                type="button"
                id={`topic-option-${index}`}
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
                {/* Ícone de rádio/círculo */}
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

      {/* Rodapé */}
      <div className="py-4 text-center">
        <p className="text-xs text-stone-500 italic font-medium">
          *Por favor, sé sincero(a).*
        </p>
      </div>
    </div>
  );
};
