import React from 'react';
import { PlayCircle, Menu } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ZionLogo } from './ZionLogo';

interface HeaderNavProps {
  onToggleMegaMenu: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ onToggleMegaMenu }) => {
  return (
    <header className="sticky top-0 bg-white border-b border-[#E5E7EB] z-40 transition-all duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-[78px] flex items-center justify-between">
        {/* Brand Logo with PDF Zion Emblem */}
        <a href="#" className="flex items-center gap-2.5 no-underline">
          <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-0.5 shadow-2xs">
            <ZionLogo size={38} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold text-[#1F2937] tracking-tight leading-tight">
              하남 시온성교회
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">
              {CHURCH_INFO.englishName}
            </span>
          </div>
        </a>

        {/* 6대 대메뉴 + 마우스 호버 드롭다운 (GNB) */}
        <nav className="hidden xl:flex items-center h-full">
          <ul className="flex list-none h-full">
            {/* 01. 예배와 말씀 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#worship" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                01 예배와 말씀
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">주일설교</a></li>
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">수요행복예배(생중계)</a></li>
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">금요예배(생중계)</a></li>
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">화-목 기도회</a></li>
                <li><a href={CHURCH_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="block px-5 py-2 text-xs text-red-600 font-semibold hover:bg-[#F9FAFB]">실시간 온라인 예배 ↗</a></li>
              </ul>
            </li>

            {/* 02. 날마다 큐티 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#qt" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                02 날마다 큐티
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#qt" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">말씀 묵상이란?</a></li>
                <li><a href={CHURCH_INFO.meditationBlogUrl} target="_blank" rel="noopener noreferrer" className="block px-5 py-2 text-xs text-[#03C75A] font-bold hover:bg-[#F9FAFB] hover:text-[#02B351] transition-all">오늘의 묵상(블로그) ↗</a></li>
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">어린이·청소년 큐티스쿨</a></li>
              </ul>
            </li>

            {/* 03. 공동체와 양육 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#community" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                03 공동체와 양육
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#community" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">목장(소그룹) 소개</a></li>
                <li><a href="#community" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">목장 나눔 훈련</a></li>
                <li><a href="#community" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">기초 양육과정</a></li>
              </ul>
            </li>

            {/* 04. 사역과 선교 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#ministry" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                04 사역과 선교
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#ministry" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">사역부서 안내</a></li>
                <li><a href="#worship" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">큐티스쿨 (교회학교)</a></li>
                <li><a href="#ministry" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">국내외 선교 및 구제</a></li>
              </ul>
            </li>

            {/* 05. 새가족 안내 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#newcomers" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                05 새가족 안내
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#newcomers" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">처음 오셨나요?</a></li>
                <li><a href="#newcomers" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">등록 및 정착 과정</a></li>
                <li><a href="#location" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">셔틀버스 이용안내</a></li>
              </ul>
            </li>

            {/* 06. 교회소개 */}
            <li className="relative group flex items-center px-4 h-full cursor-pointer">
              <a href="#about" className="text-[0.98rem] font-bold text-[#111827] group-hover:text-[#C49A45] transition-colors py-6">
                06 교회소개
              </a>
              <ul className="absolute top-[78px] left-1/2 -translate-x-1/2 w-48 bg-white border border-[#E5E7EB] rounded-b-xl shadow-xl py-3 hidden group-hover:block list-none z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <li><a href="#about" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">교회 비전</a></li>
                <li><a href="#about" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">담임목사 인사말</a></li>
                <li><a href="#gallery" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">시온성 갤러리</a></li>
                <li><a href="#location" className="block px-5 py-2 text-xs text-slate-600 hover:bg-[#F9FAFB] hover:text-[#C49A45] hover:font-bold transition-all">오시는 길</a></li>
              </ul>
            </li>
          </ul>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <a
            href={CHURCH_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#E11D48] hover:bg-[#BE123C] text-white px-4 py-2 rounded-full text-xs font-bold transition-all shadow-xs hover:shadow-md cursor-pointer whitespace-nowrap"
          >
            <PlayCircle className="w-4 h-4 fill-white text-[#E11D48]" />
            <span>온라인 예배</span>
          </a>

          <button
            onClick={onToggleMegaMenu}
            className="p-2 text-[#1F2937] hover:text-[#C49A45] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            aria-label="전체메뉴"
            title="사이트 전체메뉴 보기"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
