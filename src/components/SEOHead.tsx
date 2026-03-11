import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}

export const SEOHead = ({ title, description, canonical, ogImage }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:url', `https://elitecardpro.com${canonical}`, true);
    if (ogImage) setMeta('og:image', ogImage, true);

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `https://elitecardpro.com${canonical}`;
  }, [title, description, canonical, ogImage]);

  return null;
};
