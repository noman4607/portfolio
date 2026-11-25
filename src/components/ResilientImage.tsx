import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
  priority?: boolean;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = 'w-full h-full object-cover',
  priority = false,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F7F9FC] dark:bg-[#111B2E] cad-grid-bg text-[#64748B] dark:text-[#94A3B8]"
      >
        <Layers className="w-6 h-6 mb-3 text-[#2563EB] dark:text-[#60A5FA]" strokeWidth={1.5} />
        <p className="text-sm font-medium text-[#17243A] dark:text-[#F1F5F9]">{fallbackTitle}</p>
        <p className="text-xs mt-1 text-[#64748B] dark:text-[#94A3B8]">Engineering Visual Asset</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
