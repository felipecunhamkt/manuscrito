'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  showPercent?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress, showPercent = false }) => {
  return (
    <div className="w-full relative">
      <div className="w-full h-1.5 sm:h-2 bg-amber-100/60 overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-[#D99B16] via-[#D4A017] to-[#E6B325] transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${Math.min(Math.max(progress, 3), 100)}%` }}
        />
      </div>
      {showPercent && (
        <div className="flex justify-end px-4 py-1">
          <span className="text-[11px] font-semibold text-amber-800/70 tracking-tight">
            {progress}% completado
          </span>
        </div>
      )}
    </div>
  );
};
