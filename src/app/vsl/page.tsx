import { Metadata } from 'next';
import { Step10VSL } from '@/components/Step10VSL';

export const metadata: Metadata = {
  title: 'Transmisión Exclusiva - Oración Oculta The Chosen',
  description:
    'Actor que interpreta a Jesús en The Chosen revela la oración oculta por 2 mil años para atraer prosperidad y salud.',
  robots: 'noindex, nofollow',
};

export default function VSLPage() {
  return <Step10VSL />;
}
