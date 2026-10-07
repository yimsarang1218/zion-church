import React from 'react';
import { FileText, MapPin, CreditCard, Phone, Heart } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface TopNoticeBarProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const TopNoticeBar: React.FC<TopNoticeBarProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  return (
    <div className="bg-[#111827] text-[#E5E7EB] text-xs py-2 px-4 sm:px-6 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        {/* Left: 모바일에서는 축약, PC에서는 전체 표어 표시 */}
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45] shrink-0" />
          <span className="text-slate-300 text-[11px] sm:text-xs">
            하남 시온성교회
            <span className="hidden md:inline text-slate-400"> | {CHURCH_INFO.slogan2026}</span>
          </span>
        </div>

        {/* Right: 모바일 터치 최적화 아이콘 링크 */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11px] sm:text-xs">
          <button
            onClick={onOpenBulletin}
            className="hover:text-[#C49A45] text-slate-200 transition-colors flex items-center gap-1 cursor-pointer font-medium"
            title="금주의 주보"
          >
            <FileText className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>주보</span>
          </button>
          <a
            href="#location"
            className="hover:text-[#C49A45] text-slate-300 transition-colors hidden sm:flex items-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>오시는길</span>
          </a>
          <a
            href="#offering"
            className="hover:text-[#C49A45] text-slate-300 transition-colors flex items-center gap-1 font-medium"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>헌금</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">|</span>
          {/* 전화 및 기도요청 */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <a
              href={`tel:${CHURCH_INFO.counselingPhone}`}
              className="inline-flex items-center gap-1 hover:text-white text-slate-300 transition-colors"
              title={`전화상담 (${CHURCH_INFO.counselingPhone})`}
            >
              <Phone className="w-3 h-3 text-[#C49A45]" />
              <span className="hidden md:inline">{CHURCH_INFO.counselingPhone}</span>
            </a>
            <button
              onClick={onOpenPrayer}
              className="hover:text-[#C49A45] text-slate-300 transition-colors cursor-pointer inline-flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-700"
              title="기도요청"
            >
              <Heart className="w-3 h-3 text-rose-400" />
              <span>기도</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
