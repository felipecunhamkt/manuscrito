'use client';

import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';

interface Step5UserNameProps {
  initialName?: string;
  onSubmitName: (name: string) => void;
  onBack: () => void;
}

export const Step5UserName: React.FC<Step5UserNameProps> = ({
  initialName = '',
  onSubmitName,
  onBack,
}) => {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);

  const cleanFirstName = (raw: string) => {
    // Trim and take only the first token if user typed multiple names
    const trimmed = raw.trim();
    const parts = trimmed.split(/\s+/);
    return parts[0] || '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only letters and standard accents
    const val = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]/g, '');
    setName(val);
    if (error) setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const firstName = cleanFirstName(name);

    if (!firstName || firstName.length < 2) {
      setError('Por favor, ingresa un nombre válido.');
      return;
    }

    if (name.trim().split(/\s+/).length > 1) {
      setError('Por favor, ingresa ÚNICAMENTE tu primer nombre sin apellidos.');
      return;
    }

    // Capitalize first letter properly
    const formatted = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    onSubmitName(formatted);
  };

  const isValid = name.trim().length >= 2;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-between min-h-[calc(100vh-2rem)] px-4 py-3 sm:py-5 animate-fade-in">
      <div>
        {/* Barra superior com botão voltar */}
        <div className="w-full flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver atrás"
            id="btn-back-name"
            className="p-2 -ml-2 rounded-full text-stone-700 hover:text-stone-900 hover:bg-stone-200/60 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
            Paso 5 de 9
          </span>
        </div>

        {/* Título da pergunta */}
        <div className="text-center mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Ahora Escribe Solo tu Primer Nombre
          </h2>

        </div>

        {/* Formulário de captura */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="w-full flex flex-col text-left">
            <label
              htmlFor="first-name-input"
              className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-[#D4A017]" />
              <span>Nombre</span>
            </label>
            <div className="relative">
              <input
                id="first-name-input"
                type="text"
                autoFocus
                autoComplete="given-name"
                value={name}
                onChange={handleChange}
                placeholder="Primer nombre..."
                className={`
                  w-full px-4 py-4 rounded-xl text-lg font-bold text-stone-900 bg-white border-2
                  focus:outline-none transition-all shadow-inner
                  ${error
                    ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-stone-300 focus:border-[#D4A017] focus:ring-3 focus:ring-amber-200/60'
                  }
                `}
              />
            </div>
            {error && (
              <p className="text-xs text-red-600 font-bold mt-1.5 ml-1">
                {error}
              </p>
            )}
          </div>

          {/* Botão CTA: Continuar */}
          <button
            type="submit"
            id="cta-continue-name"
            disabled={!isValid}
            className={`
              w-full py-4 px-6 rounded-xl font-extrabold text-lg text-white shadow-lg transition-all duration-200
              flex items-center justify-center gap-2 cursor-pointer select-none mt-2
              ${isValid
                ? 'bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] active:bg-[#a2750a] shadow-amber-500/25 pulse-gold'
                : 'bg-stone-300 cursor-not-allowed shadow-none'
              }
            `}
          >
            <span>Continuar</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>

        {/* Alerta abaixo do botão */}
        <div className="w-full mt-4 p-3.5 rounded-xl bg-red-50 border border-red-200/90 text-red-800 text-xs sm:text-sm font-semibold text-center leading-snug flex items-center justify-center gap-2">
          <span>
            ⚠️ <strong>SOLO tu primer nombre</strong>, si escribes algo más que eso, tu resultado saldrá incorrecto.
          </span>
        </div>
      </div>

      <div className="py-2 text-center">
        <p className="text-[11px] text-stone-400">
          Tu privacidad e identidad espiritual están protegidas.
        </p>
      </div>
    </div>
  );
};
