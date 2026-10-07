import { Metadata } from 'next';
import { Step10VSL } from '@/components/Step10VSL';

export const metadata: Metadata = {
  title: 'Portal Oficial - Transmisión y Presentación Documental',
  description:
    'Consulta y presentación explicativa de registros y documentos históricos digitalizados.',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Portal Oficial - Transmisión y Presentación Documental',
    description:
      'Consulta y presentación explicativa de registros y documentos históricos digitalizados.',
    url: 'https://el-portal-oficial.online/vsl',
  },
};

export default function VSLPage() {
  return <Step10VSL />;
}
