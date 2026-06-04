/**
 * Lightweight reCAPTCHA v2 wrapper.
 * Usage:
 *   const { captchaVerified, resetCaptcha } = useReCaptcha(containerRef);
 *   <ReCaptchaWidget containerRef={containerRef} />
 */
import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: {
        sitekey: string;
        callback: (token: string) => void;
        'expired-callback': () => void;
        'error-callback': () => void;
      }) => number;
      reset: (widgetId: number) => void;
    };
    onReCaptchaLoad?: () => void;
  }
}

export const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

let scriptLoaded = false;
const loadCallbacks: Array<() => void> = [];

function loadReCaptchaScript(onLoad: () => void) {
  if (scriptLoaded) { onLoad(); return; }
  loadCallbacks.push(onLoad);
  if (document.getElementById('recaptcha-script')) return;

  window.onReCaptchaLoad = () => {
    scriptLoaded = true;
    loadCallbacks.forEach(cb => cb());
    loadCallbacks.length = 0;
  };

  const script = document.createElement('script');
  script.id = 'recaptcha-script';
  script.src = 'https://www.google.com/recaptcha/api.js?onload=onReCaptchaLoad&render=explicit';
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

export function ReCaptchaWidget({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  if (!RECAPTCHA_SITE_KEY) return null;
  return <div ref={containerRef} className="my-2" />;
}

export function useReCaptcha() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const widgetIdRef = useRef<number | null>(null);
  const [verified, setVerified] = useState(false);

  const reset = useCallback(() => {
    setVerified(false);
    if (widgetIdRef.current !== null && window.grecaptcha) {
      window.grecaptcha.reset(widgetIdRef.current);
    }
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;

    loadReCaptchaScript(() => {
      if (!containerRef.current || widgetIdRef.current !== null) return;
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: () => setVerified(true),
        'expired-callback': () => setVerified(false),
        'error-callback': () => setVerified(false),
      });
    });
  }, []);

  // If no site key configured, bypass verification (dev mode)
  const captchaVerified = !RECAPTCHA_SITE_KEY || verified;

  return { captchaVerified, containerRef, resetCaptcha: reset };
}
