import { useCallback, useEffect, useState } from 'react';

import { sitePath } from '../utils/sitePath';

export interface RouteState {
  pathname: string;
  hash: string;
}

function getCurrentRoute(): RouteState {
  return {
    pathname: window.location.pathname.slice(sitePath('/').length - 1).replace(/\/+$/, '') || '/',
    hash: window.location.hash || '',
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(getCurrentRoute);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (route.hash) {
      document.getElementById(route.hash.slice(1))?.scrollIntoView();
    }
  }, [route]);

  const navigate = useCallback((to: string) => {
    const [rawPath, rawHash] = to.split('#');
    const targetPath = rawPath || '/';
    const targetHash = rawHash ? `#${rawHash}` : '';
    const nextUrl = sitePath(`${targetPath}${targetHash}`);

    const isSamePath = getCurrentRoute().pathname === targetPath;
    if (!isSamePath || window.location.hash !== targetHash) {
      window.history.pushState({}, '', nextUrl);
      setRoute({ pathname: targetPath, hash: targetHash });
    }

    if (targetHash) {
      const elementId = targetHash.slice(1);
      const scrollNow = () => {
        const el = document.getElementById(elementId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      };
      if (isSamePath) scrollNow();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return { route, navigate };
}
