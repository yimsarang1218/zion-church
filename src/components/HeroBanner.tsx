import React from 'react';
import { Radio } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[480px] sm:min-h-[520px] py-16 flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden bg-[#FAF8F5]"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.25), rgba(15, 23, 42, 0.25)), url('/hero-2026.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
       {/* Central Content */}
      <div className="max-w-[900px] mx-auto mt-24 sm:mt-36">
        <p className="text-base sm:text-xl text-white/95 font-medium max-w-[680px] mx-auto leading-relaxed drop-shadow-md [word-break:keep-all]">
          말씀이 들리고 영혼이 살아나는 공동체, 하남 시온성교회에 오신 것을 진심으로 환영합니다.
        </p>
      </div>
      
        {/* Live Broadcast Hours Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E11D48]/85 border border-[#E11D48] text-white text-xs font-semibold backdrop-blur-xs shadow-md">
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>실시간 생중계: 주일 1부 I 2부 · 수요행복예배 · 금요예배</span>
        </div>
      </div>
    </section>
  );
};
