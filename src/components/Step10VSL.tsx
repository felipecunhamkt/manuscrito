'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Play, RotateCcw, Volume2, VolumeX, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import {
  trackPageView,
  trackViewContent,
  trackInitiateCheckout,
  buildCheckoutUrl,
  captureIncomingParams,
} from '@/lib/pixel';

interface Step10VSLProps {
  checkoutUrl?: string;
}

interface CommentItem {
  id: string;
  name: string;
  avatarImg: string;
  text: string;
  likes: number;
  time: string;
  reply?: {
    name: string;
    avatarImg: string;
    text: string;
    likes: number;
    time: string;
  };
}

const COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    name: 'Javier Fernández',
    avatarImg: '/images/avatars/avatar-1.jpg',
    text: 'Dios mío... oré llorando anoche pidiendo una dirección. Jonathan apareció como un ángel. Viendo desde aquí 🙏',
    likes: 87,
    time: '3 min',
  },
  {
    id: 'c2',
    name: 'Carmen García',
    avatarImg: '/images/avatars/avatar-2.jpg',
    text: '¿Será que esto realmente funciona? Ya he intentado de todo para salir de las deudas y nada funciona.',
    likes: 14,
    time: '8 min',
    reply: {
      name: 'Lucía Navarro',
      avatarImg: '/images/avatars/avatar-3.jpg',
      text: 'Carmen, ¡sigue viendo! Lo que él dice sobre la traducción de la Biblia tiene todo el sentido, se me puso la piel de gallina aquí.',
      likes: 22,
      time: '15 min',
    },
  },
  {
    id: 'c3',
    name: 'Alejandro Gómez',
    avatarImg: '/images/avatars/avatar-4.jpg',
    text: 'Comencé la oración ahora y sentí una paz que no sentía hace años. ¡Gloria a Dios!',
    likes: 56,
    time: '11 min',
  },
  {
    id: 'c4',
    name: 'Sofía Martínez',
    avatarImg: '/images/avatars/avatar-5.jpg',
    text: 'Compartiendo con toda mi familia. ¡Esto tiene que llegar a más personas! ❤️',
    likes: 41,
    time: '14 min',
  },
];

const UNLOCK_TIME_SECONDS = 1478; // 24 minutos e 38 segundos
const VIDEO_SRC = 'https://pub-b11907f5eab547d8bbe1145bbcd2296c.r2.dev/menor.mp4';

export const Step10VSL: React.FC<Step10VSLProps> = ({ checkoutUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const maxWatchedTimeRef = useRef<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [checkoutUnlocked, setCheckoutUnlocked] = useState<boolean>(false);
  const [currentDateStr, setCurrentDateStr] = useState<string>('');

  // Base checkout URL for Hotmart
  const baseHotmartUrl =
    checkoutUrl ||
    process.env.NEXT_PUBLIC_CHECKOUT_URL ||
    'https://pay.hotmart.com/B107909684E?checkoutMode=10';

  const [finalCheckoutUrl, setFinalCheckoutUrl] = useState<string>(baseHotmartUrl);

  // Format today's date dynamically, build UTM checkout link, track ViewContent
  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    setCurrentDateStr(formatted);

    // Repasse dinâmico de parâmetros e UTMs
    captureIncomingParams();
    setFinalCheckoutUrl(buildCheckoutUrl(baseHotmartUrl));

    // Disparar eventos na tela da VSL
    trackPageView();
    trackViewContent('VSL Manuscrito de los Milagros');

    // Check localStorage for previously unlocked checkout
    try {
      const saved = localStorage.getItem('vsl_unlocked_checkout');
      if (saved === 'true') {
        setCheckoutUnlocked(true);
      }
    } catch {
      // ignore storage restriction
    }
  }, [baseHotmartUrl]);

  // Keyboard anti-skip lock listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block common seek keys: Left, Right, Up, Down, Home, End, PageUp, PageDown, j, l, numbers
      const blockedKeys = [
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'Home',
        'End',
        'PageUp',
        'PageDown',
        'j',
        'J',
        'l',
        'L',
      ];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  // Handle Autoplay attempt on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try muted autoplay first
    video.muted = true;
    setIsMuted(true);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy: show initial tap-to-play overlay
          setIsPaused(true);
          setIsPlaying(false);
        });
    }
  }, []);

  // Time update monitor with anti-skip clamp
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;

    // Anti-skip enforcement: if current time jumped ahead by more than 2 seconds, revert it
    if (currentTime > maxWatchedTimeRef.current + 2) {
      video.currentTime = maxWatchedTimeRef.current;
      return;
    }

    if (currentTime > maxWatchedTimeRef.current) {
      maxWatchedTimeRef.current = currentTime;
    }

    // Trigger unlock at 1478 seconds (24m 38s)
    if (currentTime >= UNLOCK_TIME_SECONDS && !checkoutUnlocked) {
      setCheckoutUnlocked(true);
      try {
        localStorage.setItem('vsl_unlocked_checkout', 'true');
      } catch {
        // ignore
      }
    }
  };

  const handleEnded = () => {
    setCheckoutUnlocked(true);
    try {
      localStorage.setItem('vsl_unlocked_checkout', 'true');
    } catch {
      // ignore
    }
  };

  // Video interaction controls
  const handleVideoClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setIsPaused(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleContinueWatching = () => {
    const video = videoRef.current;
    if (!video) return;

    // If muted, try unmuting on user gesture
    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }

    video.play().then(() => {
      setIsPlaying(true);
      setIsPaused(false);
      setHasStarted(true);
    });
  };

  const handleWatchFromStart = () => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    maxWatchedTimeRef.current = 0;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }

    video.play().then(() => {
      setIsPlaying(true);
      setIsPaused(false);
      setHasStarted(true);
    });
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleCheckoutClick = () => {
    // Disparar 'InitiateCheckout' no clique do botão de compra da VSL
    trackInitiateCheckout();
  };

  return (
    <div className="w-full min-h-screen bg-[#FAFAFA] flex flex-col items-center pb-12 selection:bg-red-200">
      {/* 1. Barra Superior Fixa (Top Bar) */}
      <header className="sticky top-0 z-50 w-full bg-[#B91C1C] text-white py-2 px-3 text-center shadow-md">
        <div className="flex items-center justify-center gap-1.5 leading-tight">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span className="text-xs sm:text-sm font-black tracking-wider uppercase">
            EN VIVO EXCLUSIVO
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-white/80 font-medium tracking-tight mt-0.5">
          The Chosen • Transmisión Urgente
        </p>
      </header>

      <main className="w-full max-w-md mx-auto px-4 pt-4 sm:pt-6 flex flex-col items-center">
        {/* 2. Headline da VSL */}
        <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 text-center leading-snug sm:leading-tight mb-4 px-1">
          Actor Que Interpreta a{' '}
          <span className="text-red-600 font-bold decoration-red-200 underline decoration-2 underline-offset-2">
            Jesús en la Serie The Chosen
          </span>{' '}
          Revela: Oración Oculta Por 2 Mil Años Para Atraer{' '}
          <span className="text-red-600 font-bold">
            Prosperidad y Salud
          </span>
        </h1>

        {/* 3. Player de Vídeo Seguro (Cloudflare R2 Direct MP4 - Tamanho Completo Sem Cortes) */}
        <div
          className="w-full relative bg-black rounded-2xl overflow-hidden shadow-2xl border border-stone-800 select-none group"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Elemento de Vídeo com proporção e tamanho completos */}
          <video
            ref={videoRef}
            src={VIDEO_SRC}
            playsInline
            preload="auto"
            controls={false}
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onContextMenu={(e) => e.preventDefault()}
            className="w-full h-auto block pointer-events-none"
          />

          {/* Camada transparente anti-duplo-toque e clique de controle */}
          <div
            onClick={handleVideoClick}
            onDoubleClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="absolute inset-0 z-10 cursor-pointer"
          />

          {/* Badge EN VIVO no canto superior esquerdo durante a reprodução */}
          <div className="absolute top-3 left-3 z-15 pointer-events-none flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-black uppercase tracking-wider shadow-md backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            <span>EN VIVO</span>
          </div>

          {/* Botão de Som Mute/Unmute no canto superior direito */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            className="absolute top-3 right-3 z-25 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-transform active:scale-95 cursor-pointer shadow-lg"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            )}
          </button>

          {/* Aviso Flutuante se estiver mudo no início */}
          {isMuted && isPlaying && (
            <div
              onClick={handleContinueWatching}
              className="absolute bottom-4 left-4 right-4 z-25 bg-[#D4A017] hover:bg-[#c18f12] text-white py-2.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all animate-bounce"
            >
              <Volume2 className="w-4 h-4 stroke-[2.5]" />
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide">
                🔊 Toca aquí para escuchar con sonido
              </span>
            </div>
          )}

          {/* Overlay Customizado de Pausa / Smart Autoplay */}
          {(isPaused || (!hasStarted && !isPlaying)) && (
            <div
              className="absolute inset-0 z-30 bg-black/85 backdrop-blur-xs flex flex-col items-center justify-center p-5 text-center animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black tracking-wider uppercase mb-3 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>EN VIVO</span>
              </div>

              <h2 className="text-white text-base sm:text-lg font-black max-w-xs leading-snug mb-5">
                🔴 Esta transmisión saldrá del aire pronto
              </h2>

              <div className="flex flex-col gap-3 w-full max-w-xs">
                {/* Botão 1: Continuar vendo */}
                <button
                  type="button"
                  onClick={handleContinueWatching}
                  id="vsl-btn-continue"
                  className="w-full py-3.5 px-4 rounded-xl bg-[#D4A017] hover:bg-[#c18f12] active:scale-[0.98] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all pulse-gold"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>▶ ¿Continuar viendo?</span>
                </button>

                {/* Botão 2: Ver do início */}
                <button
                  type="button"
                  onClick={handleWatchFromStart}
                  id="vsl-btn-restart"
                  className="w-full py-3 px-4 rounded-xl bg-stone-800/90 hover:bg-stone-700 active:scale-[0.98] text-stone-200 font-bold text-xs sm:text-sm tracking-wide border border-stone-700 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>🔄 ¿Ver desde el inicio?</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4 & 5. Botão de Checkout (Liberado após 1478 segundos / 24m38s) */}
        {checkoutUnlocked && (
          <div className="w-full mt-4 animate-fade-in" id="checkout-section">
            <a
              href={finalCheckoutUrl}
              onClick={handleCheckoutClick}
              id="cta-checkout-manuscritos"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-5 rounded-xl bg-[#16A34A] hover:bg-green-700 active:scale-[0.98] text-white font-extrabold text-base sm:text-lg uppercase tracking-wide shadow-xl shadow-green-600/40 flex flex-col items-center justify-center gap-1 text-center transition-all duration-200 animate-pulse group cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2 leading-tight">
                <span>QUIERO LOS MANUSCRITOS DEL MILAGRO</span>
                <ArrowRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="text-[11px] sm:text-xs font-medium text-green-100 normal-case">
                (Haz clic aquí para asegurar tu acceso con garantía)
              </span>
            </a>

            <div className="flex items-center justify-center gap-2 mt-2 text-stone-500 text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Garantía incondicional de satisfacción • Compra segura</span>
            </div>
          </div>
        )}

        {/* 6. Prova Social e Urgência com Data Dinâmica */}
        <div className="w-full mt-4 flex flex-col items-center gap-2 text-center">
          {/* Pessoas assistindo agora */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/80 border border-purple-200/80 text-purple-900 text-xs font-bold tracking-tight shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600" />
            </span>
            <span>🟣 825 personas están viendo ahora...</span>
          </div>

          {/* Aviso de escassez com data dinâmica */}
          <div className="w-full mt-10 bg-amber-50 border border-amber-200/90 rounded-xl p-3 text-center">
            <p className="text-xs sm:text-sm font-extrabold text-stone-900 leading-snug">
              ⚠️ <u>ESTE VIDEO SALDRÁ DEL AIRE EL DÍA {currentDateStr || 'HOY'}</u>
            </p>
          </div>
        </div>

        {/* Divisória elegante */}
        <hr className="w-full my-6 border-stone-200" />

        {/* 7. Seção de Comentários (Estilo Social em CSS Puro - Nomes Espanhóis) */}
        <section className="w-full flex flex-col text-left mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs sm:text-sm font-bold text-stone-500 tracking-wide uppercase">
              Mostrando 8 de 663 comentarios
            </h2>
            <span className="text-[11px] text-stone-400 font-medium">
              Más relevantes
            </span>
          </div>

          {/* Lista de Comentários */}
          <div className="flex flex-col gap-3.5 w-full">
            {COMMENTS.map((comment) => (
              <div key={comment.id} className="flex flex-col gap-2 w-full">
                {/* Comentário Principal */}
                <div className="flex items-start gap-2.5">
                  {/* Foto do Comentário com Imagem enviada */}
                  <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 shadow-xs border border-stone-200 bg-stone-100">
                    <Image
                      src={comment.avatarImg}
                      alt={comment.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>

                  {/* Card do Comentário */}
                  <div className="flex-1 bg-[#F3F4F6] rounded-2xl px-3.5 py-2.5 shadow-xs border border-stone-200/50">
                    <span className="text-xs font-bold text-stone-900 block leading-tight">
                      {comment.name}
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 font-normal mt-1 leading-relaxed">
                      {comment.text}
                    </p>
                  </div>
                </div>

                {/* Rodapé de Interação */}
                <div className="ml-11 flex items-center gap-3 text-[11px] text-stone-500 font-semibold select-none">
                  <button type="button" className="hover:text-blue-600 cursor-pointer">
                    Me gusta
                  </button>
                  <span>·</span>
                  <button type="button" className="hover:text-blue-600 cursor-pointer">
                    Responder
                  </button>
                  <span>·</span>
                  <span className="inline-flex items-center gap-0.5 text-stone-700 font-bold bg-white px-1.5 py-0.5 rounded-full border border-stone-200 shadow-2xs">
                    👍 {comment.likes}
                  </span>
                  <span>·</span>
                  <span className="text-stone-400 font-normal">{comment.time}</span>
                </div>

                {/* Resposta Aninhada (se houver) */}
                {comment.reply && (
                  <div className="ml-9 sm:ml-10 mt-1 pl-3 border-l-2 border-stone-200 flex flex-col gap-1.5">
                    <div className="flex items-start gap-2">
                      <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 shadow-xs border border-stone-200 bg-stone-100">
                        <Image
                          src={comment.reply.avatarImg}
                          alt={comment.reply.name}
                          fill
                          sizes="28px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 bg-[#F3F4F6] rounded-2xl px-3 py-2 shadow-xs border border-stone-200/50">
                        <span className="text-[11px] font-bold text-stone-900 block leading-tight">
                          {comment.reply.name}
                        </span>
                        <p className="text-xs text-stone-800 font-normal mt-0.5 leading-relaxed">
                          {comment.reply.text}
                        </p>
                      </div>
                    </div>

                    <div className="ml-9 flex items-center gap-2.5 text-[10px] text-stone-500 font-semibold select-none">
                      <button type="button" className="hover:text-blue-600 cursor-pointer">
                        Me gusta
                      </button>
                      <span>·</span>
                      <button type="button" className="hover:text-blue-600 cursor-pointer">
                        Responder
                      </button>
                      <span>·</span>
                      <span className="inline-flex items-center gap-0.5 text-stone-700 font-bold bg-white px-1 py-0.2 rounded-full border border-stone-200">
                        👍 {comment.reply.likes}
                      </span>
                      <span>·</span>
                      <span className="text-stone-400 font-normal">{comment.reply.time}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Rodapé discreto e seguro */}
        <footer className="w-full pt-4 text-center border-t border-stone-200/80">
          <div className="flex items-center justify-center gap-1.5 text-stone-400 text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Transmisión Oficial En Criptografía Segura</span>
          </div>
          <p className="text-[10px] text-stone-400 mt-1">
            © {new Date().getFullYear()} The Chosen • Todos los derechos reservados.
          </p>
        </footer>
      </main>
    </div>
  );
};
