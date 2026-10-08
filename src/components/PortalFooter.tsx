import React from 'react';
import { Eye } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { useVisitorStats } from '../hooks/useVisitorStats';

export const PortalFooter: React.FC = () => {
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
          <div className="inline-flex items-center justify-center gap-2 self-center sm:self-auto bg-slate-800/80 px-3.5 py-1.5 rounded-full border border-slate-700/60 text-xs text-slate-300">
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
            주소: {CHURCH_INFO.address} {CHURCH_INFO.addressDetail} ({CHURCH_INFO.trafficInfo}) | 상담: <a href="tel:010-2741-2938" className="hover:text-white font-bold text-slate-200">010-2741-2938</a> | 교회: 02-408-1191 | 팩스: {CHURCH_INFO.fax}
          </p>
          <p>
            카카오톡 ID: <strong className="text-amber-300">limsarang1218</strong> | 이메일: <a href={`mailto:${CHURCH_INFO.email}`} className="text-slate-300 hover:underline">{CHURCH_INFO.email}</a> | 헌금계좌: 농협 131-020-284906 (시온성교회)
          </p>
          <p>
            셔틀차량 문의: <a href="tel:010-4707-5395" className="text-slate-200 font-bold hover:underline">010-4707-5395</a>
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-4 text-slate-500 text-[11px]">
          Copyright © 2026 하남시온성교회. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
