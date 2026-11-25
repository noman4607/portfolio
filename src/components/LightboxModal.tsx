import { useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

export interface LightboxImageItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  alt: string;
}

interface LightboxModalProps {
  items: LightboxImageItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && items[activeIndex] !== undefined;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowRight' && items.length > 1) {
        onSelectIndex((activeIndex + 1) % items.length);
      } else if (event.key === 'ArrowLeft' && items.length > 1) {
        onSelectIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onSelectIndex]);

  if (!isOpen || activeIndex === null) {
    return null;
  }

  const current = items[activeIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1220]/90 backdrop-blur-sm p-4 sm:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-white dark:bg-[#111B2E] border border-[#E2E8F0] dark:border-[#1E293B] rounded-xl overflow-hidden shadow-2xl"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#E2E8F0] dark:border-[#1E293B]">
          <div className="min-w-0">
            <p className="font-display text-sm font-semibold text-[#17243A] dark:text-[#F1F5F9] truncate">
              {current.title}
            </p>
            {items.length > 1 && (
              <p className="text-xs font-mono tabular-nums text-[#64748B] dark:text-[#94A3B8]">
                Image {activeIndex + 1} of {items.length}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] text-[#17243A] dark:text-[#F1F5F9] hover:bg-[#F7F9FC] dark:hover:bg-[#1E293B] transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* High-res Image Stage */}
        <div className="relative bg-[#F7F9FC] dark:bg-[#0B1220] flex items-center justify-center max-h-[72vh] overflow-hidden">
          <div className="w-full aspect-[4/3] max-h-[72vh]">
            <ResilientImage
              src={current.imageUrl}
              alt={current.alt}
              fallbackTitle={current.title}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex - 1 + items.length) % items.length)}
                aria-label="Previous image"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/95 dark:bg-[#111B2E]/95 border border-[#E2E8F0] dark:border-[#1E293B] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#2563EB] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex + 1) % items.length)}
                aria-label="Next image"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/95 dark:bg-[#111B2E]/95 border border-[#E2E8F0] dark:border-[#1E293B] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#2563EB] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        <div className="px-5 py-4 border-t border-[#E2E8F0] dark:border-[#1E293B]">
          <p className="text-sm text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            {current.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
