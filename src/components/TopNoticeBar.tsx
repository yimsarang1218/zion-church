import React from 'react';
import { Radio, Youtube, MapPin, CreditCard, FileText, MessageCircle, Phone } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface TopNoticeBarProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const TopNoticeBar: React.FC<TopNoticeBarProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  return (
    <div className="bg-[#111827] text-[#F3F4F6] text-xs py-2 px-4 sm:px-6 border-b border-white/5">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Notice: Live Broadcast Notice */}
        <div className="flex items-center gap-2 text-xs flex-wrap justify-center sm:justify-start">
          <span className="bg-[#E11D48] text-white px-2 py-0.5 rounded font-bold text-[11px] inline-flex items-center gap-1 shadow-xs">
            <Radio className="w-3 h-3 animate-pulse" />
            LIVE
          </span>
          <span className="text-slate-300">
            온라인 실시간 생중계: <strong className="text-white font-semibold">주일 1부 I 2부 · 수요행복예배 · 금요예배</strong>
          </span>
        </div>

        {/* Right Top User Menu */}
        <ul className="flex items-center gap-4 text-slate-400 text-xs list-none">
          <li>
            <a
              href={CHURCH_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Youtube className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              <span>유튜브 채널</span>
            </a>
          </li>
          <li>
            <button
              onClick={onOpenBulletin}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>금주의 주보</span>
            </button>
          </li>
          <li>
            <a href="#location" className="hover:text-white transition-colors">
              오시는 길
            </a>
          </li>
          <li>
            <a href="#offering" className="hover:text-white transition-colors">
              온라인 헌금
            </a>
          </li>
          <li>
            <a
              href={`tel:${CHURCH_INFO.counselingPhone}`}
              className="text-[#C49A45] hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>전화 상담 {CHURCH_INFO.counselingPhone}</span>
            </a>
          </li>
          <li>
            <button
              onClick={onOpenPrayer}
              className="hover:text-[#C49A45] text-slate-300 font-medium transition-colors flex items-center gap-1 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>상담·기도</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
