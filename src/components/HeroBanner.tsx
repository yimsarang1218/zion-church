import React from 'react';
import { Radio } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative min-h-[580px] sm:min-h-[720px] py-16 flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.15), rgba(15, 23, 42, 0.15)), url('/hero-2026.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content */}
      <div className="relative z-10 max-w-[960px] mx-auto flex flex-col items-center justify-center pt-56 sm:pt-72 pb-6">
        {/* 말씀이 들리고 영혼이 살아나는 공동체 문구 */}
        <p className="text-sm sm:text-lg text-white font-medium max-w-[720px] mx-auto mb-6 leading-relaxed [word-break:keep-all] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          말씀이 들리고 영혼이 살아나는 공동체, 하남 시온성교회에 오신 것을 진심으로 환영합니다.
        </p>

        {/* Live Broadcast Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E11D48]/85 border border-[#FCE7D4] text-white text-xs font-semibold backdrop-blur-sm shadow-md">
          <Radio className="w-3.5 h-3.5 text-white animate-pulse" />
          <span>실시간 생중계: 주일 1부 12부 · 수요행복예배 · 금요예배</span>
        </div>
      </div>
    </section>
  );
};
