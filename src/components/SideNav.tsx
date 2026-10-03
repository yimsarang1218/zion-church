import React, { useState, useEffect } from 'react';

interface NavPoint {
  id: string;
  title: string;
}

const NAV_POINTS: NavPoint[] = [
  { id: 'section0', title: 'HOME' },
  { id: 'section1', title: '비전 & 사명' },
  { id: 'section2', title: '예배시간' },
  { id: 'section3', title: '말씀 & 유튜브' },
  { id: 'gallery', title: '시온성 갤러리' },
  { id: 'section4', title: '오시는길 & 헌금' },
];

export const SideNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('section0');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (let i = NAV_POINTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_POINTS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_POINTS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside aria-label="섹션 탐색" className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-4">
      {NAV_POINTS.map((point) => {
        const isActive = activeSection === point.id;
        return (
          <button
            key={point.id}
            onClick={() => scrollTo(point.id)}
            className="group relative flex items-center justify-center p-1 focus:outline-none"
            aria-label={`${point.title} 섹션으로 이동`}
          >
            {/* Tooltip on left */}
            <span className="absolute right-6 px-2.5 py-1 rounded bg-slate-900/90 text-white text-[11px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md">
              {point.title}
            </span>

            {/* Dot */}
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? 'w-3 h-3 bg-[#C5A059] scale-125 shadow-[0_0_12px_rgba(197,160,89,0.9)] ring-2 ring-white/60'
                  : 'w-2.5 h-2.5 bg-slate-400/50 hover:bg-[#C5A059]/70 hover:scale-110'
              }`}
            />
          </button>
        );
      })}
    </aside>
  );
};
