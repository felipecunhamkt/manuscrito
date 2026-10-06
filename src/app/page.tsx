'use client';
import React, { useEffect, useState } from 'react';
import { ProgressBar } from '@/components/ProgressBar';
import { Step0Landing } from '@/components/Step0Landing';
import { Step1BirthMonth } from '@/components/Step1BirthMonth';
import { Step2BirthDay } from '@/components/Step2BirthDay';
import { Step3BirthDecade } from '@/components/Step3BirthDecade';
import { Step4BirthYear } from '@/components/Step4BirthYear';
import { Step5UserName } from '@/components/Step5UserName';
import { Step6PrayerTopic } from '@/components/Step6PrayerTopic';
import { Step7PrayerDuration } from '@/components/Step7PrayerDuration';
import { Step8PrayerFeeling } from '@/components/Step8PrayerFeeling';
import { Step9FrequencyBridge } from '@/components/Step9FrequencyBridge';
import { Step10VSL } from '@/components/Step10VSL';
import { QuizAnswers, QuizStep } from '@/types/quiz';
import { captureIncomingParams, trackLead } from '@/lib/pixel';

export default function QuizFunnelPage() {
  const [step, setStep] = useState<QuizStep>('landing');
  const [answers, setAnswers] = useState<QuizAnswers>({});

  useEffect(() => {
    // Captura e armazena parâmetros UTM / fbclid da URL
    captureIncomingParams();
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getProgress = (currentStep: QuizStep): number => {
    switch (currentStep) {
      case 'landing':
        return 5;
      case 'birth-month':
        return 15;
      case 'birth-day':
        return 25;
      case 'birth-decade':
        return 35;
      case 'birth-year':
        return 45;
      case 'user-name':
        return 55;
      case 'prayer-topic':
        return 65;
      case 'prayer-duration':
        return 75;
      case 'prayer-feeling':
        return 85;
      case 'frequency-bridge':
        return 95;
      case 'calculating':
        return 98;
      case 'result':
        return 100;
      default:
        return 5;
    }
  };

  // Step 0: Landing
  const handleStep0Continue = () => {
    setStep('birth-month');
    scrollToTop();
  };

  // Step 1: Birth Month
  const handleSelectMonth = (month: string) => {
    setAnswers((prev) => ({ ...prev, birthMonth: month }));
    setStep('birth-day');
    scrollToTop();
  };

  // Step 2: Birth Day
  const handleSelectDay = (day: number | string) => {
    setAnswers((prev) => ({ ...prev, birthDay: day }));
    setStep('birth-decade');
    scrollToTop();
  };

  // Step 3: Birth Decade
  const handleSelectDecade = (decade: number) => {
    setAnswers((prev) => ({ ...prev, birthDecade: decade }));
    setStep('birth-year');
    scrollToTop();
  };

  // Step 4: Birth Year
  const handleSelectYear = (year: number) => {
    setAnswers((prev) => ({ ...prev, birthYear: year }));
    setStep('user-name');
    scrollToTop();
  };

  // Step 5: User Name
  const handleSubmitName = (name: string) => {
    setAnswers((prev) => ({ ...prev, userName: name }));
    setStep('prayer-topic');
    scrollToTop();
  };

  // Step 6: Prayer Topic
  const handleSelectTopic = (topic: string) => {
    setAnswers((prev) => ({ ...prev, prayerTopic: topic }));
    setStep('prayer-duration');
    scrollToTop();
  };

  // Step 7: Prayer Duration
  const handleSelectDuration = (duration: string) => {
    setAnswers((prev) => ({ ...prev, prayerDuration: duration }));
    setStep('prayer-feeling');
    scrollToTop();
  };

  // Step 8: Prayer Feeling
  const handleSelectFeeling = (feeling: string) => {
    setAnswers((prev) => ({ ...prev, prayerFeeling: feeling }));
    setStep('frequency-bridge');
    scrollToTop();
  };

  // Step 9: Frequency Bridge -> Direto para VSL (Etapa 10)
  const handleContinueFrequency = () => {
    trackLead(); // Meta Pixel: fbq('track', 'Lead')
    setStep('vsl');
    scrollToTop();
  };

  // Restart Funnel
  const handleRestart = () => {
    setAnswers({});
    setStep('landing');
    scrollToTop();
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center">
      {/* Barra de progresso contínua no topo (apenas etapas 0 a 9) */}
      {step !== 'vsl' && (
        <header className="sticky top-0 z-50 w-full bg-[#FAFAFA]/95 backdrop-blur-xs shadow-xs">
          <ProgressBar progress={getProgress(step)} />
        </header>
      )}

      {/* Conteúdo dinâmico de cada etapa */}
      <main className="w-full flex-1 flex flex-col justify-start">
        {step === 'landing' && (
          <Step0Landing onContinue={handleStep0Continue} />
        )}

        {step === 'birth-month' && (
          <Step1BirthMonth
            selectedMonth={answers.birthMonth}
            onSelectMonth={handleSelectMonth}
            onBack={() => {
              setStep('landing');
              scrollToTop();
            }}
          />
        )}

        {step === 'birth-day' && (
          <Step2BirthDay
            selectedDay={answers.birthDay}
            onSelectDay={handleSelectDay}
            onBack={() => {
              setStep('birth-month');
              scrollToTop();
            }}
          />
        )}

        {step === 'birth-decade' && (
          <Step3BirthDecade
            selectedDecade={answers.birthDecade}
            onSelectDecade={handleSelectDecade}
            onBack={() => {
              setStep('birth-day');
              scrollToTop();
            }}
          />
        )}

        {step === 'birth-year' && (
          <Step4BirthYear
            decade={answers.birthDecade || 1980}
            selectedYear={answers.birthYear}
            onSelectYear={handleSelectYear}
            onBack={() => {
              setStep('birth-decade');
              scrollToTop();
            }}
          />
        )}

        {step === 'user-name' && (
          <Step5UserName
            initialName={answers.userName}
            onSubmitName={handleSubmitName}
            onBack={() => {
              setStep('birth-year');
              scrollToTop();
            }}
          />
        )}

        {step === 'prayer-topic' && (
          <Step6PrayerTopic
            userName={answers.userName || 'amigo(a)'}
            selectedTopic={answers.prayerTopic}
            onSelectTopic={handleSelectTopic}
            onBack={() => {
              setStep('user-name');
              scrollToTop();
            }}
          />
        )}

        {step === 'prayer-duration' && (
          <Step7PrayerDuration
            selectedDuration={answers.prayerDuration}
            onSelectDuration={handleSelectDuration}
            onBack={() => {
              setStep('prayer-topic');
              scrollToTop();
            }}
          />
        )}

        {step === 'prayer-feeling' && (
          <Step8PrayerFeeling
            selectedFeeling={answers.prayerFeeling}
            onSelectFeeling={handleSelectFeeling}
            onBack={() => {
              setStep('prayer-duration');
              scrollToTop();
            }}
          />
        )}

        {step === 'frequency-bridge' && (
          <Step9FrequencyBridge
            userName={answers.userName || 'amigo(a)'}
            onContinue={handleContinueFrequency}
            onBack={() => {
              setStep('prayer-feeling');
              scrollToTop();
            }}
          />
        )}

        {step === 'vsl' && (
          <Step10VSL />
        )}
      </main>
    </div>
  );
}
