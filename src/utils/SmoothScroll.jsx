import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Garante rolamento suave para o topo ao trocar de página (sem travar a roda do mouse)
function SmoothScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default SmoothScroll;
