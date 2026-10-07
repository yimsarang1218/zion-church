import React from 'react';
import { Menu, PlayCircle } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ZionLogo } from './ZionLogo';

interface HeaderNavProps {
  onToggleMegaMenu: () => void;
  onOpenPrayer?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onToggleMegaMenu }) => {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB] z-40 transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[72px] sm:h-[78px] flex items-center justify-between">
        {/* 교회 로고 */}
        <a href="#" className="flex items-center gap-2.5 no-underline group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 shadow-2xs group-hover:border-amber-200 transition-colors">
            <ZionLogo size={36} />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-2xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
              하남 시온성교회
            </span>
            <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wider">
              {CHURCH_INFO.englishName}
            </span>
          </div>
        </a>

        {/* PC 전용 6대 메뉴 (01 ~ 06) */}
        <nav className="hidden lg:flex items-center h-full">
          <ul className="flex list-none h-full gap-1">
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#worship" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                01 예배와 말씀
              </a>
            </li>
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#qt" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                02 날마다 큐티
              </a>
            </li>
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#community" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                03 공동체와 양육
              </a>
            </li>
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#ministry" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                04 사역과 선교
              </a>
            </li>
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#newcomers" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                05 새가족 안내
              </a>
            </li>
            <li className="flex items-center px-3 h-full cursor-pointer">
              <a href="#about" className="text-[0.92rem] font-bold text-[#1F2937] hover:text-[#C49A45] transition-colors py-6 whitespace-nowrap">
                06 교회소개
              </a>
            </li>
          </ul>
        </nav>

        {/* 우측 빨간색 온라인 예배 버튼 & 전체메뉴(≡) 버튼 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://youtu.be/1azfrCPgb84"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-bold transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>온라인 예배</span>
          </a>

          {/* 햄버거 토글 메뉴 */}
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
