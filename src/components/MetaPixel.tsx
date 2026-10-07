'use client';

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import {
  FB_PIXEL_ID,
  FB_PIXEL_ID_2,
  OFFICIAL_DOMAIN,
  initPixel,
  trackPageView,
  captureIncomingParams,
  getCleanEventSourceUrl,
} from '@/lib/pixel';

function PixelEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // 1. Capturar parâmetros de tráfego e sanitizar barra de endereço
    captureIncomingParams();

    // 2. Inicializar Pixel dinamicamente no DOM com autoConfig desativado
    initPixel();

    // 3. Disparar PageView
    // No primeiro carregamento, o Script inline já cuida do PageView inicial;
    // Em transições subsequentes de rota, dispara com o pathname atualizado.
    if (!isFirstRender.current) {
      trackPageView(pathname);
    } else {
      isFirstRender.current = false;
    }
  }, [pathname, searchParams]);

  return null;
}

export default function MetaPixel() {
  return (
    <>
      <Suspense fallback={null}>
        <PixelEvents />
      </Suspense>

      {/* Script oficial do Meta Pixel com autoConfig desativado e event_source_url limpo */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('set', 'autoConfig', false, '${FB_PIXEL_ID}');
            fbq('init', '${FB_PIXEL_ID}');
            ${
              FB_PIXEL_ID_2
                ? `fbq('set', 'autoConfig', false, '${FB_PIXEL_ID_2}'); fbq('init', '${FB_PIXEL_ID_2}');`
                : ''
            }
            fbq('track', 'PageView', {
              event_source_url: '${OFFICIAL_DOMAIN}/'
            });
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1&ed[event_source_url]=${encodeURIComponent(OFFICIAL_DOMAIN + '/')}`}
          alt=""
        />
        {FB_PIXEL_ID_2 && (
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID_2}&ev=PageView&noscript=1&ed[event_source_url]=${encodeURIComponent(OFFICIAL_DOMAIN + '/')}`}
            alt=""
          />
        )}
      </noscript>
    </>
  );
}
