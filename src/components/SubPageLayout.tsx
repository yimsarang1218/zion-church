import React, { useState } from 'react';
import { Home, ChevronRight, Search, FileText, Calendar, User, Eye, ArrowLeft } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface SubPageLayoutProps {
  initialSectionId: string;
  initialSubMenuId?: string;
  onGoHome: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

interface MenuItem {
  id: string;
  name: string;
  isExternal?: boolean;
  link?: string;
}

interface MenuSection {
  id: string;
  title: string;
  subMenus: MenuItem[];
}

const SECTIONS: Record<string, MenuSection> = {
  worship: {
    id: 'worship',
    title: '예배와 말씀',
    subMenus: [
      { id: 'sunday-sermon', name: '주일설교요약' },
      { id: 'wednesday-sermon', name: '수요행복예배' },
      { id: 'friday-sermon', name: '금요기도회' },
      { id: 'evening-prayer', name: '화·목 저녁기도회' },
      { id: 'online-worship', name: '온라인 생중계', isExternal: true, link: CHURCH_INFO.youtubeUrl },
    ],
  },
  qt: {
    id: 'qt',
    title: '날마다 큐티',
    subMenus: [
      { id: 'qt-guide', name: '구속사 큐티 안내' },
      { id: 'qt-blog', name: '오늘의 묵상(블로그)', isExternal: true, link: CHURCH_INFO.meditationBlogUrl },
      { id: 'qt-bulletin', name: '금주의 주보 보기' },
    ],
  },
  community: {
    id: 'community',
    title: '공동체와 양육',
    subMenus: [
      { id: 'cell-intro', name: '목장(소그룹) 소개' },
      { id: 'couple-cell', name: '부부·가정 목장' },
      { id: 'young-cell', name: '청년·직장 목장' },
      { id: 'discipleship-10w', name: '10주 기초 신앙양육' },
      { id: 'prayer-request', name: '중보기도 신청' },
    ],
  },
  ministry: {
    id: 'ministry',
    title: '사역과 선교',
    subMenus: [
      { id: 'ministry-team', name: '사역부서 안내' },
      { id: 'nextgen-school', name: '다음세대 큐티스쿨' },
      { id: 'local-relief', name: '지역 구제 및 섬김' },
      { id: 'gallery-link', name: '사역 갤러리' },
    ],
  },
  newcomers: {
    id: 'newcomers',
    title: '새가족 안내',
    subMenus: [
      { id: 'newcomers-welcome', name: '처음 오신 분께' },
      { id: 'newcomers-4weeks', name: '4주 새가족 등록과정' },
      { id: 'transit-guide', name: '셔틀버스 안내' },
      { id: 'consulting', name: '온라인 상담 문의' },
    ],
  },
  about: {
    id: 'about',
    title: '교회소개',
    subMenus: [
      { id: 'vision-slogan', name: '2026 비전 및 표어' },
      { id: 'church-leaders', name: '섬기는 분들' },
      { id: 'about-worship-table', name: '예배 시간표' },
      { id: 'about-offering-account', name: '온라인 헌금 계좌' },
      { id: 'parking-guide', name: '오시는 길' },
    ],
  },
};

// 샘플 게시글 데이터 (추후 Firestore와 연동)
const SAMPLE_POSTS = [
  { id: 1, no: 1846, title: '[국문] 신명기 27:1~10 [명령하는 이 명령]', author: '관리자', date: '2026.10.04', views: 124 },
  { id: 2, no: 1845, title: '[국문] 신명기 23:15~23 [언약한 대로]', author: '관리자', date: '2026.09.28', views: 240 },
  { id: 3, no: 1844, title: '[국문] 신명기 20:10~20 [범죄하게 할까 함이니라]', author: '관리자', date: '2026.09.23', views: 188 },
  { id: 4, no: 1843, title: '[국문] 열왕기하 23:36~24:7 [즐겨하지 아니하시니라]', author: '관리자', date: '2026.09.11', views: 305 },
  { id: 5, no: 1842, title: '[국문] 열왕기하 23:31~35 [애굽으로 잡아갔더니]', author: '관리자', date: '2026.09.07', views: 279 },
  { id: 6, no: 1841, title: '[국문] 신명기 10:12~16 [마음을 다한 사랑]', author: '관리자', date: '2026.08.31', views: 312 },
];

export const SubPageLayout: React.FC<SubPageLayoutProps> = ({
  initialSectionId,
  initialSubMenuId,
  onGoHome,
  onOpenBulletin,
  onOpenPrayer,
}) => {
  const [currentSectionId, setCurrentSectionId] = useState(initialSectionId || 'worship');
  const section = SECTIONS[currentSectionId] || SECTIONS.worship;
  const [currentSubMenuId, setCurrentSubMenuId] = useState(
    initialSubMenuId || section.subMenus[0]?.id || 'sunday-sermon'
  );
  const [activeTab, setActiveTab] = useState<'all' | 'ko' | 'en'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const currentSubMenu = section.subMenus.find((m) => m.id === currentSubMenuId) || section.subMenus[0];

  const handleSubMenuClick = (menu: MenuItem) => {
    if (menu.isExternal && menu.link) {
      window.open(menu.link, '_blank');
      return;
    }
    if (menu.id === 'qt-bulletin') {
      onOpenBulletin();
      return;
    }
    if (menu.id === 'prayer-request' || menu.id === 'consulting') {
      onOpenPrayer();
      return;
    }
    setCurrentSubMenuId(menu.id);
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 sm:py-12 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* 상단 홈 복귀 버튼 */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#C49A45] transition-colors cursor-pointer bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈으로 돌아가기</span>
          </button>
        </div>

        {/* 2단 그리드: 좌측 LNB 사이드바 + 우측 게시판 테이블 본문 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ========================================================= */}
          {/* 1. 좌측 LNB 사이드바 (우리들교회 SECTION MENU 스타일)       */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-4">
            {/* 상단 둥근 카드형 대메뉴 박스 */}
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-5 text-white shadow-md">
              <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block mb-1">
                SECTION MENU
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">{section.title}</h2>
            </div>

            {/* 세부 메뉴 리스트 */}
            <nav className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
              <ul className="space-y-1 list-none">
                {section.subMenus.map((menu) => {
                  const isActive = menu.id === currentSubMenuId;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => handleSubMenuClick(menu)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-amber-50 text-[#A27B2B] font-bold border border-amber-200/60 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-[#C49A45]' : 'bg-slate-300'
                            }`}
                          />
                          {menu.name}
                        </span>
                        {menu.isExternal && <span className="text-[10px] text-slate-400">↗</span>}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* ========================================================= */}
          {/* 2. 우측 메인 콘텐츠 게시판 뷰                             */}
          {/* ========================================================= */}
          <main className="flex-1 w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            {/* 상단 브레드크럼 (홈 > 대메뉴 > 소메뉴) */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100">
              <button onClick={onGoHome} className="hover:text-slate-700 cursor-pointer flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>홈</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span>{section.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-800 font-bold">{currentSubMenu.name}</span>
            </div>

            {/* 페이지 타이틀 */}
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {currentSubMenu.name}
              </h1>
            </div>

            {/* 분류 탭 & 검색창 바 */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
              {/* 분류 탭 (전체 | 국문 | 영문) */}
              <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs font-bold text-slate-600">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  전체
                </button>
                <button
                  onClick={() => setActiveTab('ko')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'ko' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  국문
                </button>
                <button
                  onClick={() => setActiveTab('en')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activeTab === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'hover:text-slate-900'
                  }`}
                >
                  영문
                </button>
              </div>

              {/* 검색창 */}
              <div className="flex items-center gap-2">
                <select className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-700 bg-white focus:outline-none">
                  <option value="title">제목</option>
                  <option value="author">작성자</option>
                </select>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="검색어를 입력해 주세요."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-48 sm:w-56 pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* 정통 게시판 테이블 그리드 */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-y border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                    <th className="py-3 px-3 text-center w-16">번호</th>
                    <th className="py-3 px-4">제목</th>
                    <th className="py-3 px-3 text-center w-24">작성자</th>
                    <th className="py-3 px-3 text-center w-24">날짜</th>
                    <th className="py-3 px-3 text-center w-16 hidden sm:table-cell">조회</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {SAMPLE_POSTS.map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">
                        {post.no}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#C49A45] transition-colors">
                        <span className="line-clamp-1">{post.title}</span>
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-500">{post.author}</td>
                      <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">
                        {post.date}
                      </td>
                      <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs hidden sm:table-cell">
                        {post.views}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 페이지네이션 (1, 2, 3...) */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-center items-center gap-1.5 text-xs font-bold">
              <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 cursor-pointer">
                1
              </button>
              <button className="w-8 h-8 rounded-lg border border-transparent text-slate-400 hover:text-slate-700 cursor-pointer">
                2
              </button>
              <button className="w-8 h-8 rounded-lg border border-transparent text-slate-400 hover:text-slate-700 cursor-pointer">
                3
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
