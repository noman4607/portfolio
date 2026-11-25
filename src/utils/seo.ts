import { sitePath } from './sitePath';
import { useEffect } from 'react';

interface DocumentSeoOptions {
  title: string;
  description: string;
  canonicalPath: string;
  structuredData?: Record<string, unknown> | null;
}

function upsertMeta(selector: string, attributeName: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attributeName, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function useDocumentSeo({ title, description, canonicalPath, structuredData }: DocumentSeoOptions) {
  useEffect(() => {
    document.title = title;

    const canonicalUrl = `${window.location.origin}${sitePath(canonicalPath)}`;

    upsertMeta('meta[name="description"]', 'name', 'description', description);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);

    let canonicalLink = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    const existingDynamicScript = document.getElementById('structured-data-route');
    if (structuredData) {
      const script = existingDynamicScript ?? document.createElement('script');
      script.id = 'structured-data-route';
      script.setAttribute('type', 'application/ld+json');
      script.textContent = JSON.stringify(structuredData);
      if (!existingDynamicScript) {
        document.head.appendChild(script);
      }
    } else if (existingDynamicScript) {
      existingDynamicScript.remove();
    }
  }, [title, description, canonicalPath, structuredData]);
}
