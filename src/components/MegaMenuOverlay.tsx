import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ZionLogo } from './ZionLogo';

interface MegaMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const MegaMenuOverlay: React.FC<MegaMenuOverlayProps> = ({
  isOpen,
  onClose,
  onOpenBulletin,
  onOpenPrayer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#111827]/98 backdrop-blur-md overflow-y-auto p-6 sm:p-12 text-white animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer text-3xl"
        aria-label="전체메뉴 닫기"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Header title */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16 pt-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C49A45] uppercase tracking-wider mb-2">
          <ZionLogo size={28} />
          <span>{CHURCH_INFO.englishName}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
          전체 메뉴 안내
        </h3>
        <p className="text-sm text-slate-400">
          하남 시온성교회 웹사이트 맵 & 빠른 이동
        </p>
      </div>

      {/* 6 Columns Mega Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 pb-16">
        {/* 01 예배와 말씀 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            01 예배와 말씀
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">주일예배 설교</a></li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">수요행복예배 (생중계)</a></li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">금요예배 (생중계)</a></li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">화-목 기도회</a></li>
            <li>
              <a href={CHURCH_INFO.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 transition-colors block font-semibold">
                유튜브 실시간 방송 ↗
              </a>
            </li>
          </ul>
        </div>

        {/* 02 날마다 큐티 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            02 날마다 큐티
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#qt" onClick={onClose} className="hover:text-white transition-colors block">말씀 묵상 안내</a></li>
            <li>
              <a href={CHURCH_INFO.meditationBlogUrl} target="_blank" rel="noopener noreferrer" className="text-[#03C75A] font-bold hover:text-emerald-300 transition-colors block">
                오늘의 묵상 (블로그 ↗)
              </a>
            </li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">큐티스쿨 (다음세대)</a></li>
            <li>
              <button onClick={() => { onClose(); onOpenBulletin(); }} className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer">
                금주의 주보 보기
              </button>
            </li>
          </ul>
        </div>

        {/* 03 공동체와 양육 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            03 공동체와 양육
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#community" onClick={onClose} className="hover:text-white transition-colors block">목장(소그룹) 소개</a></li>
            <li><a href="#community" onClick={onClose} className="hover:text-white transition-colors block">부부 / 청년 / 직장 목장</a></li>
            <li><a href="#community" onClick={onClose} className="hover:text-white transition-colors block">기초 신앙 양육</a></li>
            <li>
              <button onClick={() => { onClose(); onOpenPrayer(); }} className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer">
                중보기도 신청하기
              </button>
            </li>
          </ul>
        </div>

        {/* 04 사역과 선교 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            04 사역과 선교
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#ministry" onClick={onClose} className="hover:text-white transition-colors block">사역부서 안내</a></li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">큐티스쿨 (어린이·청소년)</a></li>
            <li><a href="#ministry" onClick={onClose} className="hover:text-white transition-colors block">선교 및 지역 구제</a></li>
            <li><a href="#gallery" onClick={onClose} className="hover:text-white transition-colors block">사역 앨범</a></li>
          </ul>
        </div>

        {/* 05 새가족 안내 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            05 새가족 안내
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#newcomers" onClick={onClose} className="hover:text-white transition-colors block">처음 오신 분께</a></li>
            <li><a href="#newcomers" onClick={onClose} className="hover:text-white transition-colors block">새가족 등록 과정</a></li>
            <li><a href="#location" onClick={onClose} className="hover:text-white transition-colors block">셔틀버스 (개롱·거여·마천)</a></li>
            <li>
              <button onClick={() => { onClose(); onOpenPrayer(); }} className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer">
                카카오톡 1:1 상담
              </button>
            </li>
          </ul>
        </div>

        {/* 06 교회소개 */}
        <div>
          <h4 className="text-sm sm:text-base font-bold text-[#C49A45] mb-4 pb-2 border-b border-white/20">
            06 교회소개
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li><a href="#about" onClick={onClose} className="hover:text-white transition-colors block">비전과 핵심가치</a></li>
            <li><a href="#worship" onClick={onClose} className="hover:text-white transition-colors block">예배 시간표</a></li>
            <li><a href="#offering" onClick={onClose} className="hover:text-white transition-colors block">온라인 헌금 계좌</a></li>
            <li><a href="#location" onClick={onClose} className="hover:text-white transition-colors block">오시는 길 (서하남로 278-30)</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};
