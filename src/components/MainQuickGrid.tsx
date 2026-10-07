import React from 'react';
import { Video, BookOpen, Users, Smile, ChevronRight, Phone, Heart, FileText, MapPin, CreditCard } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface MainQuickGridProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const MainQuickGrid: React.FC<MainQuickGridProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-20">
      {/* ========================================================= */}
      {/* 1. 모바일 전용 (스마트폰에서만 보이는 콤팩트 3구 그리드)    */}
      {/* ========================================================= */}
      <div className="block md:hidden -mt-5 mb-10">
        <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
          {/* 주보 */}
          <button
            onClick={onOpenBulletin}
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 active:bg-amber-50 active:scale-95 transition-all text-center cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/15 text-[#C49A45] flex items-center justify-center mb-1.5">
              <FileText className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937]">금주의 주보</strong>
            <span className="text-[10px] text-slate-500">예배 순서·소식</span>
          </button>

          {/* 오시는 길 */}
          <a
            href="#location"
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 active:bg-emerald-50 active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center mb-1.5">
              <MapPin className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937]">오시는 길</strong>
            <span className="text-[10px] text-slate-500">서하남 IC 3분</span>
          </a>

          {/* 헌금 */}
          <a
            href="#offering"
            className="flex flex-col items-center justify-center p-2.5 rounded-xl bg-slate-50 active:bg-blue-50 active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/15 text-blue-600 flex items-center justify-center mb-1.5">
              <CreditCard className="w-5 h-5" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937]">온라인 헌금</strong>
            <span className="text-[10px] text-slate-500">계좌번호 안내</span>
          </a>
        </div>

        {/* 모바일 하단 상담 & 기도 바 */}
        <div className="mt-2.5 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[11px] font-semibold text-slate-500">상담:</span>
            <a
              href={`tel:${CHURCH_INFO.counselingPhone}`}
              className="font-bold text-[#1F2937] inline-flex items-center gap-1 text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#C49A45]" />
              <span>{CHURCH_INFO.counselingPhone}</span>
            </a>
          </div>
          <button
            onClick={onOpenPrayer}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-1 rounded-md active:bg-amber-200 transition-colors cursor-pointer shrink-0"
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>기도 요청</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PC 전용 (숫자 제거 & 사진 원본과 동일한 4개 카드)         */}
      {/* ========================================================= */}
      <div className="hidden md:block -mt-12 mb-14">
        <div className="grid grid-cols-4 gap-3.5">
          {/* 예배와 말씀 */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#C49A45] tracking-wider uppercase">WORSHIP</span>
                <Video className="w-4 h-4 text-[#C49A45]" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937] mb-1.5">예배와 말씀</h3>
              <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4">
                주일(10:00/11:40) 및 수요·금요 온·오프라인 예배로 하나님을 만납니다.
              </p>
            </div>
            <a
              href={CHURCH_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#1F2937] hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors"
            >
              <span>유튜브 설교 보기</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 날마다 큐티 */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#C49A45] tracking-wider uppercase">QUIET TIME</span>
                <BookOpen className="w-4 h-4 text-[#C49A45]" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937] mb-1.5">날마다 큐티</h3>
              <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4">
                말씀을 삶에 비추어 내 죄를 보고 회개하는 구속사 말씀 묵상과 큐티스쿨입니다.
              </p>
            </div>
            <button
              onClick={onOpenBulletin}
              className="text-xs font-bold text-[#1F2937] hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors cursor-pointer text-left"
            >
              <span>금주의 묵상 & 주보</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 공동체와 나눔 */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#C49A45] tracking-wider uppercase">COMMUNITY</span>
                <Users className="w-4 h-4 text-[#C49A45]" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937] mb-1.5">공동체와 나눔</h3>
              <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4">
                가면을 벗고 솔직한 상처와 연약함을 나누며 서로를 살리는 따뜻한 목장입니다.
              </p>
            </div>
            <a
              href="#community"
              className="text-xs font-bold text-[#1F2937] hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors"
            >
              <span>목장 및 양육 안내</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 새가족 안내 */}
          <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-[#C49A45] tracking-wider uppercase">NEW FAMILY</span>
                <Smile className="w-4 h-4 text-[#C49A45]" />
              </div>
              <h3 className="text-base font-bold text-[#1F2937] mb-1.5">새가족 안내</h3>
              <p className="text-[11px] text-[#6B7280] leading-relaxed mb-4">
                시온성교회에 처음 오신 성도님들을 주님의 이름으로 진심으로 환영합니다.
              </p>
            </div>
            <button
              onClick={onOpenPrayer}
              className="text-xs font-bold text-[#1F2937] hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors cursor-pointer text-left"
            >
              <span>등록 및 상담 문의</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
