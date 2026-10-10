import React from 'react';
import { Menu, PlayCircle } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface HeaderNavProps {
  onOpenMegaMenu: () => void;
  onGoHome: () => void;
  onNavigateSection?: (sectionId: string, subMenuId?: string) => void;
  onNavigateSubPage?: (sectionId: string, subMenuId?: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onOpenMegaMenu,
  onGoHome,
  onNavigateSection,
  onNavigateSubPage,
}) => {
  const navigate = onNavigateSection || onNavigateSubPage;

  const menuItems = [
    { id: 'worship', label: '01 예배와 말씀', defaultSub: 'sunday-sermon' },
    { id: 'qt', label: '02 날마다 큐티', defaultSub: 'qtin-guide' },
    { id: 'community', label: '03 공동체와 양육', defaultSub: 'sarangbang' },
    { id: 'ministry', label: '04 사역과 선교', defaultSub: 'ministry-intro' },
    { id: 'newfamily', label: '05 새가족 안내', defaultSub: 'welcome-greeting' },
    { id: 'about', label: '06 교회소개', defaultSub: 'vision-slogan' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* 선명하게 복원된 정식 로고 (이미지 깨짐 방지 텍스트 엠블럼) */}
        <button 
          onClick={onGoHome} 
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center font-black text-base sm:text-lg text-[#C49A45] shadow-xs group-hover:scale-105 transition-transform">
            시온
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight group-hover:text-[#C49A45] transition-colors">
              하남 시온성교회
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider">
              ZION PRESBYTERIAN CHURCH
            </span>
          </div>
        </button>

        {/* 상단 01~06 네비게이션 */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate && navigate(item.id, item.defaultSub)}
              className="px-3 py-2 rounded-lg text-xs font-extrabold text-slate-700 hover:text-[#C49A45] hover:bg-slate-50 transition-all cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 우측 액션: 온라인 예배 & 3단 햄버거 메뉴 */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://www.youtube.com/@zionchurch"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>온라인 예배</span>
          </a>

          <button
            onClick={onOpenMegaMenu}
            className="p-2 sm:p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
            aria-label="전체 메뉴 열기"
          >
            <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
