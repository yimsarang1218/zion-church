import React from 'react';
import { Eye, Lock } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { useVisitorStats } from '../hooks/useVisitorStats';

interface PortalFooterProps {
  onOpenAdmin?: () => void;
}

export const PortalFooter: React.FC<PortalFooterProps> = ({ onOpenAdmin }) => {
  const { today, total, loading } = useVisitorStats();

  return (
    <footer className="bg-[#111827] text-[#9CA3AF] py-14 px-4 sm:px-6 text-xs sm:text-sm border-t border-[#1F2937]">
      <div className="max-w-[1280px] mx-auto text-center sm:text-left">
        {/* Footer Quick Links & Visitor Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <ul className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 list-none font-medium text-slate-300">
            <li><a href="#about" className="hover:text-white transition-colors">교회소개</a></li>
            <li><a href="#worship" className="hover:text-white transition-colors">예배안내</a></li>
            <li><a href="#qt" className="hover:text-white transition-colors">날마다 큐티</a></li>
            <li><a href="#gallery" className="hover:text-white transition-colors">시온성 갤러리</a></li>
            <li><a href="#location" className="hover:text-white transition-colors">오시는 길</a></li>
            <li><a href="#offering" className="hover:text-white transition-colors">온라인 헌금</a></li>
          </ul>

          {/* 방문자 수 뱃지 */}
          <div className="inline-flex items-center justify-center gap-2 self-center sm:self-auto bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/80 text-xs text-slate-300">
            <Eye className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>오늘 방문자: <strong className="text-amber-400 font-mono">{loading ? '...' : today.toLocaleString()}</strong></span>
            <span className="text-slate-600">|</span>
            <span>전체: <strong className="text-white font-mono">{loading ? '...' : total.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Footer Info Lines */}
        <div className="border-t border-[#1F2937] pt-6 space-y-1.5 leading-relaxed text-slate-400 text-xs">
          <p className="text-white font-bold text-sm">
            {CHURCH_INFO.denomination} {CHURCH_INFO.name} ({CHURCH_INFO.englishName})
          </p>
          <p>
            주소: {CHURCH_INFO.address} {CHURCH_INFO.addressDetail} ({CHURCH_INFO.trafficInfo}) | 상담: <a href="tel:010-2741-2938" className="hover:text-white font-bold text-slate-200">010-2741-2938</a>
          </p>
          <p>
            카카오톡 ID: <strong className="text-amber-300">yimsarang1218</strong> | 이메일: <a href={`mailto:${CHURCH_INFO.email}`} className="text-slate-300 hover:underline">{CHURCH_INFO.email}</a>
          </p>
          <p>
            셔틀차량 문의: <a href="tel:010-4787-5395" className="text-slate-200 font-bold hover:underline">010-4787-5395</a>
          </p>
        </div>

        {/* Copyright & 은밀한 관리자 진입 버튼 */}
        <div className="mt-6 pt-4 text-slate-500 text-[11px] flex items-center justify-center sm:justify-between">
          <p>Copyright © 2026 하남시온성교회. All Rights Reserved.</p>
          
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer py-1 px-2 rounded-md hover:bg-slate-800"
              title="관리자 대시보드"
            >
              <Lock className="w-3 h-3" />
              <span>관리자</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
