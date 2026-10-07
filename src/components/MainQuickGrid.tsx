import React, { useState } from 'react';
import { FileText, MapPin, CreditCard, ChevronRight, Phone, Heart, Check, Copy } from 'lucide-react';
import { CHURCH_INFO, BANK_ACCOUNTS } from '../data/churchData';

interface MainQuickGridProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const MainQuickGrid: React.FC<MainQuickGridProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  const [copiedAccount, setCopiedAccount] = useState(false);

  const handleQuickCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const acc = BANK_ACCOUNTS[0].accountNumber.replace(/-/g, '');
    navigator.clipboard.writeText(acc);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-20">
      {/* ========================================================= */}
      {/* MOBILE-ONLY VIEW (모바일 전용 간편 원형 그리드)             */}
      {/* ========================================================= */}
      <div className="block md:hidden -mt-5 mb-10">
        <div className="grid grid-cols-3 gap-2.5 bg-white p-3 rounded-2xl border border-slate-200/90 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
          {/* 1. 주보보기 */}
          <button
            onClick={onOpenBulletin}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 active:bg-amber-50 active:scale-95 transition-all text-center group cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-amber-500/15 text-[#A27B2B] flex items-center justify-center mb-2 group-active:scale-110 transition-transform">
              <FileText className="w-5 h-5 text-[#C49A45]" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937] leading-tight">
              금주의 주보
            </strong>
            <span className="text-[10px] text-slate-500 mt-0.5">
              예배 순서·소식
            </span>
          </button>

          {/* 2. 오시는 길 */}
          <a
            href="#location"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 active:bg-emerald-50 active:scale-95 transition-all text-center group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center mb-2 group-active:scale-110 transition-transform">
              <MapPin className="w-5 h-5 text-emerald-600" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937] leading-tight">
              오시는 길
            </strong>
            <span className="text-[10px] text-slate-500 mt-0.5">
              서하남 IC 3분
            </span>
          </a>

          {/* 3. 온라인 헌금 */}
          <a
            href="#offering"
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 active:bg-blue-50 active:scale-95 transition-all text-center group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-500/15 text-blue-700 flex items-center justify-center mb-2 group-active:scale-110 transition-transform">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
            <strong className="text-xs font-bold text-[#1F2937] leading-tight">
              온라인 헌금
            </strong>
            <span className="text-[10px] text-slate-500 mt-0.5">
              계좌번호 안내
            </span>
          </a>
        </div>

        {/* 모바일 콤팩트 전화상담 & 기도요청 바 */}
        <div className="mt-3 px-3 py-2 rounded-xl bg-slate-100/90 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="text-[11px] font-semibold text-slate-500">신앙상담:</span>
            <a
              href={`tel:${CHURCH_INFO.counselingPhone}`}
              className="font-bold text-[#1F2937] active:text-[#C49A45] inline-flex items-center gap-1 text-[11px]"
            >
              <Phone className="w-3 h-3 text-[#C49A45]" />
              <span>{CHURCH_INFO.counselingPhone}</span>
            </a>
          </div>
          <button
            onClick={onOpenPrayer}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100/80 px-2 py-1 rounded-md active:bg-amber-200 transition-colors cursor-pointer shrink-0"
          >
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>기도 요청</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP-ONLY VIEW (PC 환경 3열 대형 카드)                   */}
      {/* ========================================================= */}
      <div className="hidden md:block -mt-12 mb-14">
        <div className="grid grid-cols-3 gap-6">
          {/* Card 1: 주보 */}
          <div
            onClick={onOpenBulletin}
            className="bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                  01. BULLETIN
                </span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-[#C49A45] group-hover:bg-[#C49A45] group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#C49A45] transition-colors">
                금주의 주보보기
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                이번 주일 예배 순서와 교회 소식, 설교 본문 말씀을 확인하세요.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors">
              <span>주보 열람하기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: 위치 & 셔틀 */}
          <a
            href="#location"
            className="bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group no-underline"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                  02. LOCATION & BUS
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700 group-hover:bg-[#1F2937] group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#C49A45] transition-colors">
                오시는 길 & 셔틀
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-6">
                하남시 광암동 (서하남 IC 3분), 주일 교회 셔틀버스 운행 안내.
              </p>
            </div>
            <div className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors">
              <span>위치 안내 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </a>

          {/* Card 3: 온라인 헌금 */}
          <div className="bg-white rounded-2xl p-7 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                  03. OFFERING
                </span>
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <CreditCard className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1F2937] mb-2 group-hover:text-[#C49A45] transition-colors">
                온라인 헌금 안내
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed mb-3">
                정성을 담은 헌금을 온 마음으로 하나님께 드립니다.
              </p>
              {/* 계좌 복사 상자 */}
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 block">농협 (시온성교회)</span>
                  <span className="text-xs font-mono font-bold text-slate-800">131-020-284906</span>
                </div>
                <button
                  onClick={handleQuickCopy}
                  className="px-2 py-1 rounded bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                  title="계좌번호 복사"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">복사됨</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-500" />
                      <span>복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <a
              href="#offering"
              className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors"
            >
              <span>상세 계좌 보기</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* 데스크톱 하단 신앙상담 바 */}
        <div className="mt-4 px-5 py-2.5 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">교회 대표 안내:</span>
            <a
              href={`tel:${CHURCH_INFO.counselingPhone}`}
              className="inline-flex items-center gap-1.5 font-bold text-slate-800 hover:text-[#C49A45] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>신앙·사역상담 {CHURCH_INFO.counselingPhone}</span>
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">교회 사무실 02-408-1191</span>
          </div>
          <button
            onClick={onOpenPrayer}
            className="inline-flex items-center gap-1.5 font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-500" />
            <span>온라인 기도요청</span>
          </button>
        </div>
      </div>
    </div>
  );
};
