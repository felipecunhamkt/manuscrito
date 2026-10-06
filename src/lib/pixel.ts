export const FB_PIXEL_ID = '2861555854215270';
export const FB_PIXEL_ID_2 = process.env.NEXT_PUBLIC_FB_PIXEL_ID_2 || '';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * Inicializa o snippet base do Meta Pixel no navegador
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
      (window as any).fbq?.('init', FB_PIXEL_ID);
      if (FB_PIXEL_ID_2) {
        (window as any).fbq?.('init', FB_PIXEL_ID_2);
      }
    } catch (err) {
      console.warn('[Pixel] Init error:', err);
    }
  }
};

/**
 * Dispara evento padrão do Facebook Pixel com segurança
 */
export const trackFbq = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== 'undefined') {
    if (!window.fbq) {
      initPixel();
    }
    try {
      if (typeof window.fbq === 'function') {
        if (params) {
          window.fbq('track', event, params);
        } else {
          window.fbq('track', event);
        }
      }
    } catch (err) {
      console.warn(`[Pixel] Error tracking ${event}:`, err);
    }
  }
};

/**
 * 1. PageView - Na 1ª tela do Quiz / páginas
 */
export const trackPageView = () => {
  trackFbq('PageView');
};

/**
 * 2. Lead - Ao concluir a última resposta do Quiz (ao transicionar para a VSL)
 */
export const trackLead = () => {
  trackFbq('Lead');
};

/**
 * 3. ViewContent - Na tela da VSL onde roda o vídeo de vendas
 */
export const trackViewContent = (contentName = 'VSL Manuscrito de los Milagros') => {
  trackFbq('ViewContent', { content_name: contentName });
};

/**
 * 4. InitiateCheckout - No clique do botão de compra da VSL
 */
export const trackInitiateCheckout = () => {
  trackFbq('InitiateCheckout');
};

/**
 * Captura e persiste parâmetros da URL (UTMs, fbclid, etc.)
 */
const STORAGE_UTM_KEY = 'latam_utm_params';

export const captureIncomingParams = () => {
  if (typeof window === 'undefined') return;

  try {
    const search = window.location.search;
    if (search && search.length > 1) {
      // Salva os parâmetros iniciais no sessionStorage para não perder entre navegações
      sessionStorage.setItem(STORAGE_UTM_KEY, search);
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
    // 1. Obter query string atual ou a salva em sessão
    let queryString = window.location.search;
    if (!queryString || queryString.length <= 1) {
      queryString = sessionStorage.getItem(STORAGE_UTM_KEY) || '';
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
      // Preserva checkoutMode se já existir na URL base
      if (key === 'checkoutMode' && targetUrl.searchParams.has('checkoutMode')) {
        return;
      }
      targetUrl.searchParams.set(key, value);
    });

    return targetUrl.toString();
  } catch {
    // Fallback com concatenação segura por string
    const cleanSearch = (
      window.location.search || sessionStorage.getItem(STORAGE_UTM_KEY) || ''
    ).replace(/^\?/, '');

    if (!cleanSearch) return baseUrl;
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${cleanSearch}`;
  }
};
