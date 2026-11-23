import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Aplica rolamento suave com inércia leve no scroll do mouse (desktop) e volta ao topo ao trocar de rota
function SmoothScroll() {
  const { pathname } = useLocation();

  // Ao trocar de página, rola suavemente para o topo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  // Rolamento inerte (smooth wheel lerp) para roda do mouse no desktop
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) return undefined;

    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let animationId = null;

    function step() {
      const diff = targetY - currentY;
      currentY += diff * 0.12;

      window.scrollTo(0, currentY);

      if (Math.abs(diff) > 0.5) {
        animationId = window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetY);
        animationId = null;
      }
    }

    function handleWheel(event) {
      // Deixa trackpads precisos ou zoom (Ctrl + scroll) com comportamento nativo
      if (event.ctrlKey || Math.abs(event.deltaY) < 20) return;

      event.preventDefault();

      if (animationId === null) {
        currentY = window.scrollY;
        targetY = window.scrollY;
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(maxScroll, targetY + event.deltaY));

      if (animationId === null) {
        animationId = window.requestAnimationFrame(step);
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (animationId !== null) {
        window.cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return null;
}

export default SmoothScroll;
