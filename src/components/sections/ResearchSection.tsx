import { ArrowUpRight, BookOpen } from 'lucide-react';
import { researchThesis } from '../../data/portfolioData';
import { ResilientImage } from '../ResilientImage';
import { Reveal } from '../Reveal';

interface ResearchSectionProps {
  navigate: (to: string) => void;
}

/**
 * Clean conceptual engineering schematic depicting a reciprocating wedge-shaped
 * wave-maker plunger inside a laboratory wave tank. Retained as fallback if no
 * uploaded CAD diagram image is configured.
 */
export function WaveTankSchematic() {
  if (researchThesis.geometryImageUrl) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-white p-2">
        <ResilientImage
          src={researchThesis.geometryImageUrl}
          alt={researchThesis.geometryImageAlt}
          fallbackTitle="Wave Tank & Plunger CAD Domain"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <svg
      viewBox="0 0 560 300"
      role="img"
      aria-label="Conceptual schematic of a laboratory wave tank with a reciprocating wedge-shaped plunger"
      className="w-full h-auto text-[#14213D] dark:text-[#E2E8F0]"
    >
      {/* Subtle drafting coordinate grid */}
      <defs>
        <pattern id="tank-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path
            d="M 28 0 L 0 0 0 28"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.06"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="560" height="300" fill="url(#tank-grid)" />

      {/* Tank Outer Walls & Floor */}
      <path
        d="M 52 72 L 52 246 L 512 246 L 512 72"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="square"
      />

      {/* Water Volume Subtle Fill */}
      <path
        d="M 54 152 Q 150 152, 184 142 T 264 146 T 344 144 T 424 147 T 510 146 L 510 244 L 54 244 Z"
        fill="#2563EB"
        fillOpacity="0.09"
      />

      {/* Still Water Datum Dashed Line */}
      <line
        x1="54"
        y1="146"
        x2="510"
        y2="146"
        stroke="#64748B"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Conceptual Free Surface Profile Line */}
      <path
        d="M 134 158 Q 168 134, 202 146 T 274 146 T 346 146 T 418 146 T 510 146"
        fill="none"
        stroke="#2563EB"
        strokeWidth="2"
      />

      {/* Reciprocating Vertical Actuator Guide Rod */}
      <line
        x1="88"
        y1="30"
        x2="88"
        y2="108"
        stroke="currentColor"
        strokeWidth="2.2"
      />
      <rect
        x="76"
        y="48"
        width="24"
        height="16"
        rx="2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />

      {/* Bidirectional Reciprocation Motion Arrows */}
      <path
        d="M 116 44 L 116 78 M 111 50 L 116 44 L 121 50 M 111 72 L 116 78 L 121 72"
        fill="none"
        stroke="#2563EB"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Wedge-Shaped Plunger Cross-Section */}
      <polygon
        points="62,108 134,108 62,196"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Wave Propagation Direction Indicator */}
      <path
        d="M 244 114 L 314 114 M 307 109 L 314 114 L 307 119"
        fill="none"
        stroke="#64748B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Technical Callout Labels (Strictly geometric identifiers, no fabricated numbers) */}
      <g
        fill="currentColor"
        fillOpacity="0.72"
        fontFamily="IBM Plex Mono, monospace"
        fontSize="10"
      >
        <text x="130" y="64">RECIPROCATING STROKE</text>
        <text x="64" y="226">WEDGE PLUNGER</text>
        <text x="234" y="104">WAVE PROPAGATION</text>
        <text x="394" y="136">FREE SURFACE</text>
        <text x="52" y="270">CONCEPTUAL GEOMETRY DIAGRAM · NUMERICAL WAVE TANK DOMAIN</text>
      </g>
    </svg>
  );
}

export function ResearchSection({ navigate }: ResearchSectionProps) {
  return (
    <section
      id="research"
      className="py-20 sm:py-24 bg-[#F7F9FC] dark:bg-[#0E1729] border-b border-[#E2E8F0] dark:border-[#1E293B]"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="rounded-xl border border-[#E2E8F0] dark:border-[#1E293B] bg-white dark:bg-[#111B2E] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Thesis Context & Abstract Placeholder */}
              <div className="lg:col-span-6">
                <div className="flex items-center gap-2 text-xs font-medium text-[#2563EB] dark:text-[#60A5FA]">
                  <BookOpen className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  <span>Undergraduate Research</span>
                </div>

                <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#14213D] dark:text-[#F8FAFC] leading-snug">
                  {researchThesis.title}
                </h2>

                <p className="mt-2.5 text-sm font-medium text-[#64748B] dark:text-[#94A3B8]">
                  {researchThesis.institution} · {researchThesis.department}
                </p>

                <div className="mt-5 pt-5 border-t border-[#E2E8F0] dark:border-[#1E293B]">
                  <p className="text-xs font-semibold text-[#17243A] dark:text-[#E2E8F0]">
                    Research Overview ({researchThesis.abstractStatus})
                  </p>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#475569] dark:text-[#CBD5E1]">
                    {researchThesis.abstractPlaceholder}
                  </p>
                </div>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => navigate('/research')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg border border-[#CBD5E1] dark:border-[#334155] text-[#17243A] dark:text-[#F1F5F9] hover:border-[#2563EB] hover:text-[#2563EB] dark:hover:border-[#60A5FA] dark:hover:text-[#60A5FA] transition-colors cursor-pointer"
                  >
                    <span>View Research Details</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.75} />
                  </button>
                </div>
              </div>

              {/* Right Column: Official CAD Geometry Diagram & Asset Notice */}
              <div className="lg:col-span-6">
                <div className="rounded-lg border border-[#E2E8F0] dark:border-[#1E293B] bg-[#F7F9FC] dark:bg-[#0D1526] p-3 sm:p-4">
                  <WaveTankSchematic />
                </div>
                <p className="mt-3 text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {researchThesis.geometryImageCaption}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
