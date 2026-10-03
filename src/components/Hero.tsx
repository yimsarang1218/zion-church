import React from 'react';
import { Clock, PlayCircle, MapPin, CreditCard, ShieldCheck } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface HeroProps {
  onOpenBulletin?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <div
      id="section0"
      className="relative min-h-[700px] h-screen flex items-center justify-center text-center text-white px-4 sm:px-6 overflow-hidden"
      style={{
        background: `linear-gradient(rgba(15, 23, 42, 0.65), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1920&q=85') center/cover no-repeat`,
      }}
    >
      {/* Central Content */}
      <div className="max-w-[900px] mx-auto -mt-12 sm:-mt-16 z-10">
        <div className="text-xs sm:text-sm tracking-[2px] text-[#C5A059] font-bold uppercase mb-4 sm:mb-5">
          Hanam Zion Church
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.3] mb-5 sm:mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          말씀으로 회복되고
          <br />
          은혜로 세워지는 공동체
        </h1>

        <p className="text-base sm:text-xl text-white/90 font-light max-w-[680px] mx-auto mb-8 sm:mb-12 leading-[1.8]">
          십자가의 크신 사랑과 은혜 안에서 참된 안식을 누리고,
          <br className="hidden sm:inline" />
          하나님 나라의 빛과 소금으로 세상 속에서 승리하는 하남 시온성교회입니다.
        </p>
      </div>

      {/* Floating Quick Bar */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-[92%] max-w-[1080px] bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.25)] border border-white/40 grid grid-cols-2 lg:grid-cols-4 overflow-hidden z-20">
        {/* Quick Item 1 */}
        <a
          href="#section2"
          className="p-4 sm:p-6 flex flex-col items-center justify-center gap-1.5 text-slate-800 hover:bg-[#F1F5F9] transition-all border-r border-b lg:border-b-0 border-slate-200/80 group cursor-pointer"
        >
          <Clock className="w-6 h-6 text-[#1A365D] group-hover:-translate-y-0.5 group-hover:text-[#C5A059] transition-all" />
          <strong className="text-sm sm:text-base font-bold text-slate-900">예배시간</strong>
          <span className="text-[11px] sm:text-xs text-slate-500">주일 / 주중 안내</span>
        </a>

        {/* Quick Item 2 */}
        <a
          href={CHURCH_INFO.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 sm:p-6 flex flex-col items-center justify-center gap-1.5 text-slate-800 hover:bg-[#F1F5F9] transition-all border-b lg:border-b-0 lg:border-r border-slate-200/80 group cursor-pointer"
        >
          <PlayCircle className="w-6 h-6 text-[#1A365D] group-hover:-translate-y-0.5 group-hover:text-[#C5A059] transition-all" />
          <strong className="text-sm sm:text-base font-bold text-slate-900">온라인 설교</strong>
          <span className="text-[11px] sm:text-xs text-slate-500">유튜브 라이브 (10:00 / 11:40)</span>
        </a>

        {/* Quick Item 3 */}
        <a
          href="#section4"
          className="p-4 sm:p-6 flex flex-col items-center justify-center gap-1.5 text-slate-800 hover:bg-[#F1F5F9] transition-all border-r border-slate-200/80 group cursor-pointer"
        >
          <MapPin className="w-6 h-6 text-[#1A365D] group-hover:-translate-y-0.5 group-hover:text-[#C5A059] transition-all" />
          <strong className="text-sm sm:text-base font-bold text-slate-900">오시는 길</strong>
          <span className="text-[11px] sm:text-xs text-slate-500">서하남로 278-30 (셔틀 운행)</span>
        </a>

        {/* Quick Item 4 */}
        <a
          href="#section4"
          className="p-4 sm:p-6 flex flex-col items-center justify-center gap-1.5 text-slate-800 hover:bg-[#F1F5F9] transition-all group cursor-pointer"
        >
          <CreditCard className="w-6 h-6 text-[#1A365D] group-hover:-translate-y-0.5 group-hover:text-[#C5A059] transition-all" />
          <strong className="text-sm sm:text-base font-bold text-slate-900">온라인 헌금</strong>
          <span className="text-[11px] sm:text-xs text-slate-500">신협 131-020-284906</span>
        </a>
      </div>
    </div>
  );
};
