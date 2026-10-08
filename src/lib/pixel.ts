export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || '29097881223163934';
export const FB_PIXEL_ID_2 = process.env.NEXT_PUBLIC_FB_PIXEL_ID_2 || '';
export const OFFICIAL_DOMAIN = 'https://el-portal-oficial.online';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Retorna a URL canônica e limpa sob o novo domínio neutro el-portal-oficial.online,
 * sem parâmetros de consulta (query strings) nem termos de nicho sensível.
 */
export const getCleanEventSourceUrl = (customPath?: string): string => {
  if (typeof window === 'undefined') {
    return customPath ? `${OFFICIAL_DOMAIN}${customPath.startsWith('/') ? customPath : `/${customPath}`}` : OFFICIAL_DOMAIN;
  }

  const path = customPath || window.location.pathname || '/';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${OFFICIAL_DOMAIN}${cleanPath}`;
};

/**
 * Inicializa o snippet base do Meta Pixel no navegador
 * Desativa o autoConfig para impedir que os bots de microdados da Meta façam
 * raspagem automática do DOM e classifiquem o site em categorias sensíveis.
 */
export const initPixel = () => {
  if (typeof window === 'undefined') return;

  if (!window.fbq) {
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(
      window,
      document,
      'script',
      'https://connect.facebook.net/en_US/fbevents.js'
    );

    try {
      // Desativa raspagem automática de microdados e formulários (GDPR / Categorias Sensíveis)
      (window as any).fbq?.('set', 'autoConfig', false, FB_PIXEL_ID);
      (window as any).fbq?.('init', FB_PIXEL_ID);

      if (FB_PIXEL_ID_2) {
        (window as any).fbq?.('set', 'autoConfig', false, FB_PIXEL_ID_2);
        (window as any).fbq?.('init', FB_PIXEL_ID_2);
      }
    } catch (err) {
      console.warn('[Pixel] Init error:', err);
    }
  }
};

/**
 * Dispara evento padrão do Facebook Pixel com segurança,
 * sempre injetando o event_source_url sob el-portal-oficial.online
 */
export const trackFbq = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    if (!window.fbq) {
      initPixel();
    }
    try {
      if (typeof window.fbq === 'function') {
        const cleanPayload: Record<string, unknown> = {
          event_source_url: getCleanEventSourceUrl(),
          ...params,
        };
        window.fbq('track', event, cleanPayload);
      }
    } catch (err) {
      console.warn(`[Pixel] Error tracking ${event}:`, err);
    }
  }
};

/**
 * 1. PageView - Disparado na visualização de página
 */
export const trackPageView = (path?: string) => {
  trackFbq('PageView', {
    event_source_url: getCleanEventSourceUrl(path),
  });
};

/**
 * 2. Lead - Ao concluir o quiz / transicionar para a VSL
 */
export const trackLead = (path = '/vsl') => {
  trackFbq('Lead', {
    content_name: 'Lead Qualificado',
    event_source_url: getCleanEventSourceUrl(path),
  });
};

/**
 * 3. ViewContent - Na tela da VSL onde roda a apresentação
 * Nome de conteúdo 100% neutro e institucional
 */
export const trackViewContent = (contentName = 'Presentacion Oficial') => {
  trackFbq('ViewContent', {
    content_name: contentName,
    event_source_url: getCleanEventSourceUrl('/vsl'),
  });
};

/**
 * 4. InitiateCheckout - No clique do botão de compra da VSL
 */
export const trackInitiateCheckout = (contentName = 'Acceso Oficial') => {
  trackFbq('InitiateCheckout', {
    content_name: contentName,
    event_source_url: getCleanEventSourceUrl('/vsl'),
  });
};

/**
 * Palavras sensíveis em UTMs que devem ser higienizadas da barra de endereço
 * para que o fbevents.js não registre termos de nicho espiritual/religioso
 */
const SENSITIVE_PARAM_KEYWORDS = [
  'oracion',
  'milagro',
  'jesus',
  'fe',
  'espirit',
  'creencia',
  'deuda',
  'sagrado',
  'divin',
];

/**
 * Captura e persiste parâmetros da URL (UTMs, fbclid, etc.) no sessionStorage
 * e limpa termos sensíveis da URL no navegador se detectados.
 */
const STORAGE_UTM_KEY = 'latam_utm_params';

export const captureIncomingParams = () => {
  if (typeof window === 'undefined') return;

  try {
    const search = window.location.search;
    if (search && search.length > 1) {
      // 1. Salva integralmente no sessionStorage para repasse posterior à Hotmart
      sessionStorage.setItem(STORAGE_UTM_KEY, search);

      // 2. Higieniza parâmetros sensíveis da barra de endereço
      const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
      let hasSensitive = false;

      const cleanParams = new URLSearchParams();
      params.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        const lowerVal = value.toLowerCase();

        const isSensitive = SENSITIVE_PARAM_KEYWORDS.some(
          (k) => lowerKey.includes(k) || lowerVal.includes(k)
        );

        if (isSensitive) {
          hasSensitive = true;
        } else {
          cleanParams.set(key, value);
        }
      });

      if (hasSensitive) {
        const cleanQuery = cleanParams.toString();
        const newUrl = `${window.location.pathname}${cleanQuery ? `?${cleanQuery}` : ''}${window.location.hash}`;
        window.history.replaceState(null, '', newUrl);
      }
    }
  } catch {
    // ignore
  }
};

/**
 * Repasse Dinâmico de Parâmetros e UTMs para o Link do Checkout da Hotmart
 * Respeita a sintaxe existente: se baseUrl já possui "?checkoutMode=10",
 * concatena com "&" sem duplicar interrogação nem sobrescrever checkoutMode.
 */
export const buildCheckoutUrl = (
  baseUrl = 'https://pay.hotmart.com/B107909684E?checkoutMode=10'
): string => {
  if (typeof window === 'undefined') return baseUrl;

  try {
    // 1. Obter query string salva em sessão ou atual
    let queryString = sessionStorage.getItem(STORAGE_UTM_KEY) || '';
    if (!queryString || queryString.length <= 1) {
      queryString = window.location.search;
    }

    if (!queryString || queryString.length <= 1) {
      return baseUrl;
    }

    // 2. Usar URL e URLSearchParams para merge limpo e seguro
    const targetUrl = new URL(baseUrl);
    const sourceParams = new URLSearchParams(
      queryString.startsWith('?') ? queryString.substring(1) : queryString
    );

    // 3. Adicionar cada parâmetro encontrado (utm_*, fbclid, src, sck, etc.)
    sourceParams.forEach((value, key) => {
      if (key === 'checkoutMode' && targetUrl.searchParams.has('checkoutMode')) {
        return;
      }
      targetUrl.searchParams.set(key, value);
    });

    return targetUrl.toString();
  } catch {
    // Fallback com concatenação segura por string
    const cleanSearch = (
      sessionStorage.getItem(STORAGE_UTM_KEY) || window.location.search || ''
    ).replace(/^\?/, '');

    if (!cleanSearch) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${cleanSearch}`;
  }
};

/**
 * Estrutura padronizada para Conversions API (CAPI)
 * Garante que o event_source_url enviado via servidor seja 100% limpo
 * sob https://el-portal-oficial.online/
 */
export interface CapiPayloadInput {
  eventName: string;
  eventId?: string;
  customPath?: string;
  userData?: {
    em?: string[];
    ph?: string[];
    client_ip_address?: string;
    client_user_agent?: string;
    fbc?: string;
    fbp?: string;
  };
  customData?: Record<string, unknown>;
}

export const formatCapiEventPayload = (input: CapiPayloadInput) => {
  return {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        event_source_url: getCleanEventSourceUrl(input.customPath),
        action_source: 'website',
        user_data: input.userData || {},
        custom_data: {
          content_name: 'Presentacion Oficial',
          ...input.customData,
        },
      },
    ],
  };
};
