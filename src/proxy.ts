import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Lista de identificadores de bots de Meta (Facebook/Instagram),
 * crawlers de preview e inspeção automatizada de anúncios.
 */
const BOT_USER_AGENTS = [
  'facebookexternalhit',
  'facebot',
  'meta-externalagent',
  'meta-externalfetcher',
  'facebookcatalog',
  'meta-webindexer',
  'facebookplatform',
  'google-inspectiontool',
  'google-adwords-instant',
  'adsbot-google',
  'twitterbot',
  'linkedinbot',
  'pinterestbot',
  'slackbot',
  'telegrambot',
  'whatsapp',
  'headlesschrome',
  'puppeteer',
  'playwright',
  'selenium',
  'phantomjs',
  'python-requests',
  'python',
  'aiohttp',
  'curl',
  'wget',
  'go-http-client',
  'postmanruntime',
  'bytespider',
];

/**
 * HTML institucional neutro servido exclusivamente aos crawlers/scrapers da Meta.
 * Conteúdo 100% institucional sobre acervo documental, termos de uso e contato,
 * sem palavras-chave sensíveis ou referências religiosas.
 */
const NEUTRAL_BOT_HTML = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portal Oficial - Acervo y Documentos Históricos</title>
  <meta name="description" content="Plataforma oficial para la preservación, consulta y catalogación de documentos históricos y registros patrimoniales digitalizados.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://el-portal-oficial.online/">

  <!-- Open Graph -->
  <meta property="og:title" content="Portal Oficial - Acervo y Documentos Históricos">
  <meta property="og:description" content="Plataforma oficial para la preservación, consulta y catalogación de documentos históricos y registros patrimoniales digitalizados.">
  <meta property="og:url" content="https://el-portal-oficial.online/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Portal Oficial">
  <meta property="og:locale" content="es_ES">

  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Portal Oficial - Acervo y Documentos Históricos">
  <meta name="twitter:description" content="Plataforma oficial para la preservación, consulta y catalogación de documentos históricos y registros patrimoniales digitalizados.">

  <!-- Schema.org Institucional Neutro -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Portal Oficial",
    "url": "https://el-portal-oficial.online/",
    "description": "Preservación, consulta y catalogación de documentos históricos y registros patrimoniales digitalizados.",
    "publisher": {
      "@type": "Organization",
      "name": "Portal Oficial",
      "url": "https://el-portal-oficial.online/"
    }
  }
  </script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      line-height: 1.6;
    }
    header {
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 1.25rem 2rem;
    }
    .header-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .logo {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .logo-badge {
      background: #0f172a;
      color: #ffffff;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      text-transform: uppercase;
      font-weight: 600;
    }
    nav a {
      color: #64748b;
      text-decoration: none;
      margin-left: 1.5rem;
      font-size: 0.9rem;
      font-weight: 500;
      transition: color 0.15s;
    }
    nav a:hover { color: #0f172a; }
    .container {
      max-width: 1100px;
      margin: 2.5rem auto;
      padding: 0 1.5rem;
    }
    .hero {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 3rem 2.5rem;
      margin-bottom: 2rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    .hero-tag {
      display: inline-block;
      font-size: 0.8rem;
      font-weight: 600;
      color: #475569;
      background: #f1f5f9;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      margin-bottom: 1rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    h1 {
      font-size: 2.25rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }
    .lead {
      font-size: 1.125rem;
      color: #475569;
      max-width: 800px;
      margin-bottom: 1.5rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2.5rem;
    }
    .card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 1.75rem;
      box-shadow: 0 1px 2px rgba(0,0,0,0.03);
    }
    .card h2 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 0.75rem;
    }
    .card p {
      color: #64748b;
      font-size: 0.95rem;
    }
    .legal-section {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 2rem;
      margin-bottom: 2.5rem;
    }
    .legal-section h2 {
      font-size: 1.25rem;
      color: #0f172a;
      margin-bottom: 1rem;
    }
    .legal-section p {
      color: #64748b;
      font-size: 0.95rem;
      margin-bottom: 1rem;
    }
    footer {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 2.5rem 2rem;
      color: #94a3b8;
      font-size: 0.875rem;
      text-align: center;
    }
    footer p { margin-bottom: 0.5rem; }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="logo">
        <span>PORTAL OFICIAL</span>
        <span class="logo-badge">Acervo Digital</span>
      </div>
      <nav>
        <a href="#acervo">Acervo</a>
        <a href="#metodologia">Metodología</a>
        <a href="#terminos">Términos de Servicio</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <div class="hero">
      <span class="hero-tag">Repositorio y Consulta Documental</span>
      <h1>Preservación y Consulta de Documentos Históricos Digitalizados</h1>
      <p class="lead">
        Plataforma oficial dedicada a la preservación técnica, transcripción y archivo de manuscritos,
        registros culturales y fuentes documentales de valor histórico para fines educativos y de consulta general.
      </p>
    </div>

    <section class="grid" id="acervo">
      <div class="card">
        <h2>Preservación Digital</h2>
        <p>
          Catalogación sistemática y archivo de documentos históricos conforme a protocolos internacionales
          de conservación y reproducción de patrimonio documental.
        </p>
      </div>
      <div class="card" id="metodologia">
        <h2>Metodología de Consulta</h2>
        <p>
          Estructura de navegación orientada a la verificación de fuentes primarias, transcripciones de referencia
          y análisis de registros cronológicos.
        </p>
      </div>
      <div class="card">
        <h2>Conformidad y Acceso</h2>
        <p>
          Servicio de consulta pública accesible y optimizado, respetando los estándares de privacidad,
          derechos de difusión y directivas de información digital.
        </p>
      </div>
    </section>

    <section class="legal-section" id="terminos">
      <h2>Términos de Servicio y Privacidad</h2>
      <p>
        Este portal opera conforme a las normativas de protección de datos personales vigentes, incluyendo el
        Reglamento General de Protección de Datos (RGPD / GDPR). Toda interacción de navegación se realiza de
        manera segura y con fines estrictamente informativos y de consulta documental.
      </p>
      <p id="contacto">
        Para solicitudes institucionales, aclaraciones o contacto administrativo, comuníquese a través de
        nuestro canal de soporte oficial: <strong>contacto@el-portal-oficial.online</strong>.
      </p>
    </section>
  </main>

  <footer>
    <p>&copy; 2026 Portal Oficial &bull; el-portal-oficial.online &bull; Todos los derechos reservados.</p>
    <p>Documentación, archivo y registros históricos en línea.</p>
  </footer>
</body>
</html>`;

/**
 * Next.js 16 Proxy
 * Intercepta requisições no servidor antes da renderização.
 */
export function proxy(request: NextRequest) {
  const userAgent = (request.headers.get('user-agent') || '').toLowerCase();
  const url = request.nextUrl;

  // Permitir teste da visualização de bot via query (?preview_bot=1) ou header
  const isBotPreview =
    url.searchParams.get('preview_bot') === '1' ||
    request.headers.get('x-preview-bot') === '1';

  // Detecção de ASN da infraestrutura da Meta (AS32934 / AS63293) encaminhado pelo Edge/Vercel
  const vercelAsn = request.headers.get('x-vercel-ip-as-number') || '';
  const isMetaAsn = vercelAsn === '32934' || vercelAsn === '63293';

  // Detecção de headers internos de crawler da Meta
  const hasMetaCrawlerHeader =
    request.headers.has('x-fb-http-engine') ||
    request.headers.has('x-facebook-origin');

  // Verifica se o User-Agent corresponde a algum bot conhecido da Meta ou inspetor de anúncios
  const isBotUserAgent = BOT_USER_AGENTS.some((botToken) =>
    userAgent.includes(botToken)
  );

  const isBot =
    isBotPreview ||
    isMetaAsn ||
    hasMetaCrawlerHeader ||
    isBotUserAgent;

  if (isBot) {
    // Retorna a página neutra institucional com HTTP 200 diretamente para os robôs
    return new NextResponse(NEUTRAL_BOT_HTML, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'x-robots-tag': 'index, follow',
        'cache-control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  }

  // Usuários reais (navegadores normais, Europa, mobile, web) recebem a aplicação completa
  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Aplica o proxy para rotas do site, excluindo arquivos estáticos,
     * imagens, ícones e assets do Next.js
     */
    '/((?!_next/static|_next/image|favicon\\.ico|icon\\.jpg|apple-icon\\.jpg|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)$).*)',
  ],
};
