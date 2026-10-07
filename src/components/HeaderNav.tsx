import React from 'react';
import { Menu, Phone } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ZionLogo } from './ZionLogo';

interface HeaderNavProps {
  onToggleMegaMenu: () => void;
  onOpenPrayer?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onToggleMegaMenu }) => {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] z-40 transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[64px] sm:h-[76px] flex items-center justify-between">
        {/* Brand Logo with Zion Emblem */}
        <a href="#" className="flex items-center gap-2.5 no-underline group">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 shadow-2xs group-hover:border-amber-200 transition-colors">
            <ZionLogo size={32} />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-2xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
              하남 시온성교회
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wider">
              {CHURCH_INFO.englishName}
            </span>
          </div>
        </a>

        {/* 6대 핵심 메뉴 (데스크톱 GNB) */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex list-none h-full">
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#worship" className="text-[0.95rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                01 예배와 말씀
              </a>
            </li>
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#qt" className="text-[0.95rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                02 날마다 큐티
              </a>
            </li>
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#community" className="text-[0.95rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                03 공동체와 양육
              </a>
            </li>
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#newcomers" className="text-[0.95rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                05 새가족 안내
              </a>
            </li>
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#about" className="text-[0.95rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                06 교회소개
              </a>
            </li>
          </ul>
        </nav>

        {/* 모바일 & 데스크톱 우측 바로가기 액션 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${CHURCH_INFO.counselingPhone}`}
            className="p-2 sm:px-3 sm:py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors inline-flex items-center gap-1.5"
            title="신앙상담 전화"
            aria-label="전화 문의"
          >
            <Phone className="w-4 h-4 text-[#C49A45]" />
            <span className="hidden sm:inline">전화상담</span>
          </a>
          {/* 전체메뉴 햄버거 토글 버튼 */}
          <button
            onClick={onToggleMegaMenu}
            className="p-2 text-[#1F2937] hover:text-[#C49A45] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="전체메뉴 열기"
            title="전체메뉴"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
