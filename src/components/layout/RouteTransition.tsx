import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTransitionVeil } from '../common/PageTransitionVeil';

interface RouteTransitionProps {
  children: React.ReactNode;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // 1. Activate transition veil (fade-in veil)
    setIsTransitioning(true);

    // 2. Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    let observer: IntersectionObserver | null = null;

    // 3. Reveal elements on the newly mounted page
    const timer = setTimeout(() => {
      setIsTransitioning(false);

      // Trigger scroll reveal observer for new page elements
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        const observerCallback: IntersectionObserverCallback = (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-active');
              obs.unobserve(entry.target);
            }
          });
        };

        observer = new IntersectionObserver(observerCallback, {
          root: null,
          rootMargin: '0px 0px -40px 0px',
          threshold: 0.1,
        });

        document.querySelectorAll('.reveal-on-scroll').forEach((el) => observer?.observe(el));
      }
    }, 280);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [location.pathname]);

  return (
    <>
      <PageTransitionVeil isTransitioning={isTransitioning} />
      <div className="animate-fade-in">{children}</div>
    </>
  );
};
