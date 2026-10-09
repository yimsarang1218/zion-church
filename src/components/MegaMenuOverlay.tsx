import React, { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { ZionLogo } from './ZionLogo';
import { SubDetailType } from './SubDetailModal';

interface MegaMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
  onOpenSubDetail?: (type: SubDetailType) => void;
  onOpenSubPage?: (sectionId: string, subMenuId?: string) => void;
}

export const MegaMenuOverlay: React.FC<MegaMenuOverlayProps> = ({
  isOpen,
  onClose,
  onOpenBulletin,
  onOpenPrayer,
  onOpenSubDetail,
  onOpenSubPage,
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

  const handleItemClick = (sectionId: string, subMenuId: string, subDetailType?: SubDetailType) => {
    onClose();
    if (onOpenSubPage) {
      onOpenSubPage(sectionId, subMenuId);
    } else if (onOpenSubDetail && subDetailType) {
      onOpenSubDetail(subDetailType);
    }
  };

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
          하남 시온성교회 웹사이트 맵 & 서브페이지 게시판 바로가기
        </p>
      </div>

      {/* 6 Columns Mega Grid */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 pb-16">
        {/* 01 예배와 말씀 */}
        <div>
          <button
            onClick={() => handleItemClick('worship', 'wednesday-sermon', 'sermon')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            01 예배와 말씀
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <a 
                href={CHURCH_INFO.youtubeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1 font-semibold"
              >
                <span>주일예배 실시간 (유튜브)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('worship', 'wednesday-sermon', 'sermon')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                수요행복예배 (저녁 8시)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('worship', 'friday-sermon', 'sermon')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                금요예배 (저녁 8시)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('worship', 'evening-prayer', 'sermon')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                화-목 저녁 기도회
              </button>
            </li>
          </ul>
        </div>

        {/* 02 날마다 큐티 */}
        <div>
          <button
            onClick={() => handleItemClick('qt', 'qt-guide', 'qt')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            02 날마다 큐티
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <button 
                onClick={() => handleItemClick('qt', 'qt-guide', 'qt')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                QTIN 말씀 묵상(큐티)
              </button>
            </li>
            <li>
              <a 
                href={CHURCH_INFO.meditationBlogUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#03C75A] font-bold hover:text-emerald-300 transition-colors inline-flex items-center gap-1"
              >
                <span>오늘의 묵상 (블로그)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('ministry', 'nextgen-school', 'ministry')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                큐티스쿨 (다음세대)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onClose(); onOpenBulletin(); }} 
                className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer"
              >
                금주의 주보 보기
              </button>
            </li>
          </ul>
        </div>

        {/* 03 공동체와 양육 */}
        <div>
          <button
            onClick={() => handleItemClick('community', 'cell-intro', 'community')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            03 공동체와 양육
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <button 
                onClick={() => handleItemClick('community', 'cell-intro', 'community')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                사랑방 목장 소개
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('community', 'couple-cell', 'community')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                부부 / 청년 / 직장 목장
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('community', 'discipleship-10w', 'community')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                주일 양육반 (10주 과정)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onClose(); onOpenPrayer(); }} 
                className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer"
              >
                중보기도 신청하기
              </button>
            </li>
          </ul>
        </div>

        {/* 04 사역과 선교 */}
        <div>
          <button
            onClick={() => handleItemClick('ministry', 'ministry-team', 'ministry')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            04 사역과 선교
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <button 
                onClick={() => handleItemClick('ministry', 'ministry-team', 'ministry')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                사역부서 안내
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('ministry', 'nextgen-school', 'ministry')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                큐티스쿨 (어린이·청소년)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('ministry', 'local-relief', 'ministry')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                선교 및 지역 구제
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('ministry', 'ministry-team', 'ministry')} 
                className="hover:text-white transition-colors block text-left cursor-pointer"
              >
                시온성 사역 앨범
              </button>
            </li>
          </ul>
        </div>

        {/* 05 새가족 안내 */}
        <div>
          <button
            onClick={() => handleItemClick('newcomers', 'newcomers-welcome', 'newcomers')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            05 새가족 안내
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <button 
                onClick={() => handleItemClick('newcomers', 'newcomers-welcome', 'newcomers')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                처음 오신 분께 (환영)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('newcomers', 'newcomers-4weeks', 'newcomers')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                새가족 4주 등록 과정
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('newcomers', 'transit-guide', 'newcomers')} 
                className="hover:text-white transition-colors block text-left cursor-pointer"
              >
                셔틀버스 (개롱·거여·마천)
              </button>
            </li>
            <li>
              <button 
                onClick={() => { onClose(); onOpenPrayer(); }} 
                className="hover:text-[#C49A45] text-left transition-colors block cursor-pointer"
              >
                온라인 상담 & 등록 문의
              </button>
            </li>
          </ul>
        </div>

        {/* 06 교회소개 */}
        <div>
          <button
            onClick={() => handleItemClick('about', 'vision-slogan', 'about')}
            className="text-sm sm:text-base font-bold text-[#C49A45] hover:text-amber-300 mb-4 pb-2 border-b border-white/20 block w-full text-left cursor-pointer transition-colors"
          >
            06 교회소개
          </button>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 list-none">
            <li>
              <button 
                onClick={() => handleItemClick('about', 'vision-slogan', 'about')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                비전과 2026 표어
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('about', 'church-leaders', 'about')} 
                className="hover:text-white hover:font-bold transition-all block text-left cursor-pointer"
              >
                섬기는 이들 (목회자·장로)
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('about', 'about-worship-table', 'about')} 
                className="hover:text-white transition-colors block text-left cursor-pointer"
              >
                예배 시간표
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('about', 'about-offering-account', 'about')} 
                className="hover:text-white transition-colors block text-left cursor-pointer"
              >
                온라인 헌금 계좌
              </button>
            </li>
            <li>
              <button 
                onClick={() => handleItemClick('newcomers', 'parking-guide', 'about')} 
                className="hover:text-white transition-colors block text-left cursor-pointer"
              >
                오시는 길 (서하남로)
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
