'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Step3CalculatingProps {
  userName?: string;
  birthMonth?: string;
  birthDay?: number | string;
  birthYear?: number;
  onComplete: () => void;
}

export const Step3Calculating: React.FC<Step3CalculatingProps> = ({
  userName = 'amigo(a)',
  birthMonth = 'tu mes',
  birthDay = '',
  birthYear,
  onComplete,
}) => {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  const phases = [
    `Calibrando la fecha ${birthDay ? birthDay + ' de ' : ''}${birthMonth} ${birthYear || ''}...`,
    'Eliminando el ruido estático de 99.8 FM...',
    `Sintonizando la frecuencia sagrada de 100.0 FM para ${userName}...`,
    '¡Frecuencia divina activada con éxito!',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 55);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress > 35 && phaseIndex === 0) setPhaseIndex(1);
    if (progress > 68 && phaseIndex === 1) setPhaseIndex(2);
    if (progress >= 98 && phaseIndex === 2) {
      setPhaseIndex(3);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4A017', '#F59E0B', '#A855F7', '#E5E7EB'],
        });
      } catch {
        // ignore
      }
      setTimeout(() => {
        onComplete();
      }, 750);
    }
  }, [progress, phaseIndex, onComplete]);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] px-6 py-8 text-center animate-fade-in">
      {/* Icon with pulsing golden & purple glow */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#D4A017] via-amber-400 to-purple-500 p-1 flex items-center justify-center shadow-xl pulse-gold">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            {progress >= 100 ? (
              <CheckCircle2 className="w-12 h-12 text-[#D4A017] animate-bounce" />
            ) : (
              <Sparkles className="w-12 h-12 text-[#D4A017] animate-pulse" />
            )}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-stone-900 mb-2">
        Alineando Tu Frecuencia
      </h2>
      <p className="text-sm text-stone-600 mb-6">
        Preparando la revelación sagrada para{' '}
        <span className="font-bold text-[#D4A017]">{userName}</span>
      </p>

      {/* Modern Progress Bar */}
      <div className="w-full bg-amber-100/70 h-3 rounded-full overflow-hidden mb-3 border border-amber-200/60 p-0.5">
        <div
          className="h-full bg-gradient-to-r from-[#D99B16] via-[#D4A017] to-amber-300 rounded-full transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between w-full text-xs font-semibold text-stone-500 mb-6 px-1">
        <span>Sintonizando</span>
        <span className="text-[#D4A017] font-bold">{progress}%</span>
      </div>

      {/* Dynamic phase text */}
      <div className="h-12 flex items-center justify-center gap-2 text-stone-700 text-sm font-semibold px-2">
        {progress < 100 && <Loader2 className="w-4 h-4 animate-spin text-[#D4A017] shrink-0" />}
        <span className="transition-all duration-300">{phases[phaseIndex]}</span>
      </div>
    </div>
  );
};
