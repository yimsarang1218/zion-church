import React, { useState, useEffect } from 'react';
import { TopNoticeBar } from './components/TopNoticeBar';
import { HeaderNav } from './components/HeaderNav';
import { MegaMenuOverlay } from './components/MegaMenuOverlay';
import { HeroBanner } from './components/HeroBanner';
import { MainQuickGrid } from './components/MainQuickGrid';
import { WorshipTableSection } from './components/WorshipTableSection';
import { OnlineWorshipSection } from './components/OnlineWorshipSection';
import { CommunitySections } from './components/CommunitySections';
import { GallerySection } from './components/GallerySection';
import { LocationAndOffering } from './components/LocationAndOffering';
import { PortalFooter } from './components/PortalFooter';
import { BulletinModal } from './components/BulletinModal';
import { PrayerModal } from './components/PrayerModal';
import { FloatingActions } from './components/FloatingActions';
import { SubPageLayout } from './components/SubPageLayout';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [viewMode, setViewMode] = useState<'main' | 'subpage'>('main');
  const [currentSectionId, setCurrentSectionId] = useState<string>('worship');
  const [currentSubMenuId, setCurrentSubMenuId] = useState<string>('sunday-sermon');

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  // 관리자 대시보드 상태
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // URL 해시 및 파라미터 감지 (#admin 등)
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const pathname = window.location.pathname;

      if (hash === '#admin' || search.includes('admin=true') || pathname.endsWith('/admin')) {
        setIsAdminDashboardOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    return () => window.removeEventListener('hashchange', checkAdminRoute);
  }, []);

  // 메인 홈으로 이동 (로고 클릭 등)
  const handleGoHome = () => {
    setViewMode('main');
    setIsMegaMenuOpen(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 핵심 라우터: 섹션 ID와 하위 메뉴 ID를 받아 SubPageLayout으로 정확히 화면 전환
  const handleNavigateSection = (sectionId: string, subMenuId?: string) => {
    setCurrentSectionId(sectionId);

    if (subMenuId) {
      setCurrentSubMenuId(subMenuId);
    } else {
      // 대분류 클릭 시 기본 첫 번째 하위 탭 지정
      if (sectionId === 'worship') setCurrentSubMenuId('sunday-sermon');
      else if (sectionId === 'qt') setCurrentSubMenuId('qtin-guide');
      else if (sectionId === 'community') setCurrentSubMenuId('sarangbang');
      else if (sectionId === 'ministry') setCurrentSubMenuId('ministry-intro');
      else if (sectionId === 'newfamily') setCurrentSubMenuId('welcome-greeting');
      else if (sectionId === 'about') setCurrentSubMenuId('vision-slogan');
    }

    setIsMegaMenuOpen(false);
    setViewMode('subpage'); // 서브페이지 활성화
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3단 메뉴(MegaMenuOverlay)의 항목 클릭 시 매핑
  const handleMegaMenuClick = (sectionId: string, subMenuId?: string) => {
    handleNavigateSection(sectionId, subMenuId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* 1. 상단 긴급 공지 바 */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. 네비게이션 헤더 (HeaderNav 규격과 100% 일치) */}
      <HeaderNav
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onGoHome={handleGoHome}
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 3. 전체 메뉴 오버레이 (3단 햄버거 메뉴) */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => { setIsMegaMenuOpen(false); setIsBulletinOpen(true); }}
        onOpenPrayer={() => { setIsMegaMenuOpen(false); setIsPrayerOpen(true); }}
        onOpenSubPage={handleMegaMenuClick}
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 4. 메인 화면 vs 서브페이지 전환 영역 */}
      <main className="flex-1">
        {viewMode === 'subpage' ? (
          /* 기존 콘텐츠가 온전히 동작하는 서브페이지 */
          <SubPageLayout
            initialSectionId={currentSectionId}
            initialSubMenuId={currentSubMenuId}
            onGoHome={handleGoHome}
            onOpenBulletin={() => setIsBulletinOpen(true)}
            onOpenPrayer={() => setIsPrayerOpen(true)}
          />
        ) : (
          /* 메인 홈 랜딩 화면 */
          <>
            {/* 메인 배너 */}
            <HeroBanner
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 메인 4개 퀵 그리드 */}
            <MainQuickGrid
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            {/* 예배 시간표 표 */}
            <WorshipTableSection />

            {/* 온라인 예배 및 말씀 다시보기 */}
            <OnlineWorshipSection
              onNavigateSection={handleNavigateSection}
            />

            {/* 말씀 묵상 / 공동체 양육 / 사역과 선교 / 은혜소식 */}
            <CommunitySections
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            {/* 시온성 갤러리 */}
            <GallerySection />

            {/* 오시는 길 & 온라인 헌금 계좌 */}
            <LocationAndOffering />
          </>
        )}
      </main>

      {/* 5. 포털 푸터 */}
      <PortalFooter onOpenAdmin={() => setIsAdminDashboardOpen(true)} />

      {/* 6. 우측 하단 플로팅 액션 버튼 */}
      <FloatingActions onOpenPrayer={() => setIsPrayerOpen(true)} />

      {/* 7. 공통 모달 (주보, 중보기도) */}
      {isBulletinOpen && (
        <BulletinModal
          isOpen={isBulletinOpen}
          onClose={() => setIsBulletinOpen(false)}
        />
      )}

      {isPrayerOpen && (
        <PrayerModal
          isOpen={isPrayerOpen}
          onClose={() => setIsPrayerOpen(false)}
        />
      )}

      {/* 8. 관리자 통합 CMS 대시보드 */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => {
          setIsAdminDashboardOpen(false);
          if (window.location.hash === '#admin') {
            window.history.pushState(null, '', window.location.pathname);
          }
        }}
      />
    </div>
  );
}
