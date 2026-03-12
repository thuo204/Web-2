'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AdBannerProps {
  placement: 'homepage_banner' | 'blog_sidebar' | 'article_inline' | 'article_sidebar' | 'blog_header';
  className?: string;
}

const NO_ADS_PATHS = ['/courses', '/checkout', '/dashboard'];

const AD_FORMATS: Record<AdBannerProps['placement'], { format: string; style: React.CSSProperties }> = {
  homepage_banner: { format: 'horizontal', style: { display: 'block', width: '100%', height: '90px' } },
  blog_sidebar: { format: 'rectangle', style: { display: 'block', width: '300px', height: '250px' } },
  article_inline: { format: 'fluid', style: { display: 'block', textAlign: 'center' } },
  article_sidebar: { format: 'rectangle', style: { display: 'block', width: '300px', height: '600px' } },
  blog_header: { format: 'leaderboard', style: { display: 'block', width: '728px', height: '90px' } },
};

export function AdBanner({ placement, className = '' }: AdBannerProps) {
  const pathname = usePathname();
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  const isRestrictedPage = NO_ADS_PATHS.some(p => pathname.startsWith(p));
  if (isRestrictedPage || !adsenseId) return null;

  const adFormat = AD_FORMATS[placement];

  return (
    <div className={`ad-container overflow-hidden text-center ${className}`} data-placement={placement}>
      <ins
        className="adsbygoogle"
        style={adFormat.style}
        data-ad-client={adsenseId}
        data-ad-format={adFormat.format}
        data-full-width-responsive="true"
      />
      <AdScript />
    </div>
  );
}

function AdScript() {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {}
  }, []);
  return null;
}
