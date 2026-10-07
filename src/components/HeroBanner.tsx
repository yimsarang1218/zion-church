import React from 'react';
import { Radio } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section
      className="relative w-full min-h-[720px] sm:min-h-[860px] flex flex-col justify-end text-center text-white px-4 sm:px-6 overflow-hidden bg-[#0F172A]"
      style={{
        backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.2)), url('/hero-2026.png')",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 빨간색 원 영역(교회 건물 창가 및 중앙 벽면)에 정확히 맞춘 위치 */}
      <div className="relative z-10 max-w-[960px] mx-auto w-full flex flex-col items-center pb-36 sm:pb-48">
        {/* 환영 문구 */}
        <p className="text-base sm:text-2xl text-white font-bold max-w-[760px] mx-auto mb-4 leading-relaxed [word-break:keep-all] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          말씀이 들리고 영혼이 살아나는 공동체, 
          <br/>
          하남 시온성교회에 오신 것을 진심으로 환영합니다.
        </p>

        {/* Live Broadcast Notice */}
        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#E11D48]/90 border border-[#FCE7D4]/50 text-white text-xs sm:text-sm font-semibold backdrop-blur-sm shadow-lg">
          <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
          <span>실시간 생중계: 주일 1부ㅣ2부 · 수요행복예배 · 금요예배</span>
        </div>
      </div>
    </section>
  );
};
