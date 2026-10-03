import React from 'react';
import { Radio } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[480px] sm:min-h-[520px] py-16 flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden bg-[#FAF8F5]"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.48), rgba(15, 23, 42, 0.58)), url('/changrip.jpg'), url('/창립.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-[860px] mx-auto pb-6 sm:pb-8">
        {/* Top Verse from banner */}
        <p className="text-xs sm:text-sm text-amber-200 font-semibold mb-3 tracking-wide drop-shadow-sm [word-break:keep-all]">
          “또 내가 네게 이르노니 너는 베드로라 내가 이 반석 위에 내 교회를 세우리니 음부의 권세가 이기지 못하리라 [마16:18]”
        </p>

        {/* English Church Name Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/25 backdrop-blur-xs border border-white/30 text-[#F59E0B] font-bold text-xs sm:text-sm tracking-wider uppercase mb-5 shadow-sm">
          <span>{CHURCH_INFO.englishName}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/90 font-medium">{CHURCH_INFO.denomination}</span>
        </div>

        {/* Celebration Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.25] text-white mb-4 drop-shadow-md">
          <span className="text-rose-400">사랑</span>합니다, 축복합니다
        </h1>

        {/* Subtitle Message */}
        <p className="text-sm sm:text-lg text-slate-100 font-light max-w-[720px] mx-auto mb-6 leading-relaxed [word-break:keep-all] drop-shadow-xs">
          말씀이 들리고 영혼이 살아나는 공동체, 하남 시온성교회에 오신 것을 <span className="inline-block whitespace-nowrap">진심으로 환영합니다.</span>
        </p>

        {/* Live Broadcast Hours Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E11D48]/85 border border-[#E11D48] text-white text-xs font-semibold backdrop-blur-xs shadow-md">
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>실시간 생중계: 주일 1부 I 2부 · 수요행복예배 · 금요예배</span>
        </div>
      </div>
    </section>
  );
};
