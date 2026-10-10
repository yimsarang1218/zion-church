import React, { useEffect } from 'react';
import { X, ExternalLink, Calendar, Heart } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface MegaMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
  onOpenSubDetail?: (type: any) => void;
  onNavigateSubPage?: (sectionId: string, subMenuId?: string) => void;
  onNavigateSection?: (sectionId: string, subMenuId?: string) => void;
}

export const MegaMenuOverlay: React.FC<MegaMenuOverlayProps> = ({
  isOpen,
  onClose,
  onOpenBulletin,
  onOpenPrayer,
  onNavigateSubPage,
  onNavigateSection,
}) => {
  const navigate = onNavigateSection || onNavigateSubPage;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // 하위 메뉴 클릭 시 올바른 서브페이지 탭으로 직통 이동
  const handleItemClick = (sectionId: string, subId: string, isExternal?: boolean, url?: string) => {
    if (isExternal && url) {
      window.open(url, '_blank');
      onClose();
      return;
    }

    if (subId === 'bulletin-view') {
      onOpenBulletin();
      onClose();
      return;
    }

    if (subId === 'intercessory-prayer') {
      onOpenPrayer();
      onClose();
      return;
    }

    if (navigate) {
      navigate(sectionId, subId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/95 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* 헤더 바 */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-700/80 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-sm text-[#C49A45]">
              시온
            </div>
            <div>
              <span className="text-xs font-bold text-amber-400 tracking-widest uppercase block">
                ZION PRESBYTERIAN CHURCH
              </span>
              <span className="text-sm sm:text-base font-extrabold text-white">
                전체 메뉴 안내
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 6대 카테고리 전체 메뉴 그리드 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          
          {/* 01 예배와 말씀 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('worship', 'sunday-sermon')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">01</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                예배와 말씀
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('worship', 'sunday-sermon')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  주일예배 설교
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('worship', 'wednesday-worship')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  수요행복예배
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('worship', 'friday-worship')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  금요기도회
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('worship', 'tue-thu-prayer')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  화·목 저녁기도회
                </button>
              </li>
            </ul>
          </div>

          {/* 02 날마다 큐티 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('qt', 'qtin-guide')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">02</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                날마다 큐티
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('qt', 'qtin-guide')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  큐티인 묵상안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('qt', 'daily-meditation')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  매일 묵상 나눔
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('qt', 'nextgen-qt')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  다음세대 큐티
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('qt', 'bulletin-view')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  금주의 주보
                </button>
              </li>
            </ul>
          </div>

          {/* 03 공동체와 양육 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('community', 'sarangbang')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">03</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                공동체와 양육
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('community', 'sarangbang')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  사랑방 목장소개
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('community', 'group-types')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  목장모임 유형
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('community', 'discipleship')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  성경공부·제자훈련
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('community', 'intercessory-prayer')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  중보기도 요청
                </button>
              </li>
            </ul>
          </div>

          {/* 04 사역과 선교 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('ministry', 'ministry-intro')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">04</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                사역과 선교
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('ministry', 'ministry-intro')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  사역부서 안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('ministry', 'qt-school')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  큐티학교 사역
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('ministry', 'mission-relief')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  국내외 선교·구제
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('ministry', 'ministry-gallery')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  사역 갤러리
                </button>
              </li>
            </ul>
          </div>

          {/* 05 새가족 안내 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('newfamily', 'welcome-greeting')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">05</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                새가족 안내
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('newfamily', 'welcome-greeting')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  환영인사·등록안내
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('newfamily', 'four-week-course')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  새가족 4주 정착과정
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('newfamily', 'shuttle-bus')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  셔틀차량 운행노선
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('newfamily', 'consultation-inquiry')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  신앙상담 및 문의
                </button>
              </li>
            </ul>
          </div>

          {/* 06 교회소개 */}
          <div className="space-y-4">
            <button
              onClick={() => handleItemClick('about', 'vision-slogan')}
              className="text-left w-full group cursor-pointer"
            >
              <span className="text-[11px] font-mono font-bold text-amber-400 block mb-0.5">06</span>
              <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                교회소개
              </h3>
            </button>
            <ul className="space-y-2 border-t border-slate-800 pt-3">
              <li>
                <button
                  onClick={() => handleItemClick('about', 'vision-slogan')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  표어와 비전
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('about', 'pastor-greeting')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  담임목사 인사말
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('about', 'pastoral-team')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  섬기는 이들
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleItemClick('about', 'location-guide')}
                  className="text-xs sm:text-sm text-slate-400 hover:text-white hover:translate-x-1 transition-all py-1 w-full text-left cursor-pointer"
                >
                  오시는 길·셔틀
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* 하단 퀵 모달 바 */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => { onClose(); onOpenBulletin(); }}
            className="px-5 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-slate-700"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>금주의 주보 보기</span>
          </button>

          <button
            onClick={() => { onClose(); onOpenPrayer(); }}
            className="px-5 py-2.5 rounded-full bg-[#C49A45] hover:bg-[#A27B2B] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Heart className="w-3.5 h-3.5 text-rose-300" />
            <span>온라인 중보기도 요청</span>
          </button>
        </div>

      </div>
    </div>
  );
};
