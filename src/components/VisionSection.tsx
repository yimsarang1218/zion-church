import React from 'react';
import { BookOpen, HeartHandshake, Sparkles, Quote, UserCheck } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const VisionSection: React.FC = () => {
  return (
    <section id="section1" className="py-24 sm:py-28 px-4 sm:px-6 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C5A059] font-bold text-xs sm:text-sm tracking-[1.5px] uppercase mb-2">
            Vision & Core Values
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A365D] mb-3">
            하남 시온성교회 3대 비전
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            믿음의 뿌리를 든든히 내리고 이웃과 세상을 품는 건강한 신앙의 요람입니다.
          </p>
        </div>

        {/* 3 Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-3">
              말씀과 기도
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              성경 말씀 위에 삶의 기초를 세우고, 기도의 능력을 통해 날마다 성령의 충만함과 영적 성장을 경험합니다.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center mb-6">
              <HeartHandshake className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-3">
              사랑과 교제
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              판단하기보다 보듬고 격려하며, 주님의 따뜻한 십자가 사랑으로 한 몸 된 성도의 깊은 교제를 나눕니다.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300">
            <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center mb-6">
              <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-3">
              다음 세대 & 선교
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              다음 세대를 믿음의 거목으로 길러내며, 지역 사회와 열방을 향해 복음의 선한 영향력을 흘려보냅니다.
            </p>
          </div>
        </div>

        {/* Pastoral Greeting Banner */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1A365D] uppercase tracking-wider mb-3">
              <UserCheck className="w-4 h-4 text-[#C5A059]" />
              <span>환영의 말씀</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 leading-snug">
              “주님의 사랑 안에서 모든 분들을 진심으로 환영하고 축복합니다”
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              하남 시온성교회는 광암동에 세워져 말씀으로 영혼을 살리고 하나님의 평안을 전하는 은혜의 방주입니다.
              지친 일상에 참된 쉼을 얻고, 십자가 복음의 능력으로 회복되기를 소망하시는 모든 분들을 두 팔 벌려 환영합니다.
            </p>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#C5A059] font-medium italic">
                “{CHURCH_INFO.themeVerse}”
              </span>
              <span className="font-semibold text-[#1A365D]">
                대한예수교장로회 하남 시온성교회
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
