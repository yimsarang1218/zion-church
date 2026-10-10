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

  // 주소창 #admin 감지
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

  // 로고 클릭 -> 메인 홈으로 복귀
  const handleGoHome = () => {
    setViewMode('main');
    setIsMegaMenuOpen(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 핵심: 모든 메뉴(상단 01~06, 3단 메뉴의 세부 링크)를 해당 하위 게시판 서브페이지로 즉시 전환
  const handleNavigate = (sectionId: string, subMenuId?: string) => {
    setCurrentSectionId(sectionId);

    // 하위 메뉴 ID가 있으면 그 탭을 열고, 없으면 카테고리 대표 첫 탭 선택
    if (subMenuId) {
      setCurrentSubMenuId(subMenuId);
    } else {
      if (sectionId === 'worship') setCurrentSubMenuId('sunday-sermon');
      else if (sectionId === 'qt') setCurrentSubMenuId('qtin-guide');
      else if (sectionId === 'community') setCurrentSubMenuId('sarangbang');
      else if (sectionId === 'ministry') setCurrentSubMenuId('ministry-intro');
      else if (sectionId === 'newfamily') setCurrentSubMenuId('welcome-greeting');
      else if (sectionId === 'about') setCurrentSubMenuId('vision-slogan');
    }

    setIsMegaMenuOpen(false); // 메뉴 닫기
    setViewMode('subpage');   // 서브페이지로 화면 전환!
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* 1. 상단 긴급 공지 바 */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. 네비게이션 헤더 */}
      <HeaderNav
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onGoHome={handleGoHome}
        onNavigateSection={handleNavigate}
        onNavigateSubPage={handleNavigate}
      />

      {/* 3. 3단 메뉴 클릭 시 열리는 전체 사이트맵 오버레이 */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => { setIsMegaMenuOpen(false); setIsBulletinOpen(true); }}
        onOpenPrayer={() => { setIsMegaMenuOpen(false); setIsPrayerOpen(true); }}
        /* 팝업 모달 대신 하위 게시판 페이지로 바로 이동하도록 통일 */
        onOpenSubDetail={(type: string) => handleNavigate('about', type)}
        onNavigateSection={handleNavigate}
        onNavigateSubPage={handleNavigate}
      />

      {/* 4. 메인 콘텐츠 영역 (홈 vs 서브페이지 전환) */}
      <main className="flex-1">
        {viewMode === 'subpage' ? (
          /* 기존 콘텐츠가 100% 살아있는 서브페이지 */
          <SubPageLayout
            initialSectionId={currentSectionId}
            initialSubMenuId={currentSubMenuId}
            onGoHome={handleGoHome}
            onOpenBulletin={() => setIsBulletinOpen(true)}
            onOpenPrayer={() => setIsPrayerOpen(true)}
          />
        ) : (
          /* 메인 홈 */
          <>
            <HeroBanner
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            <MainQuickGrid
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigate}
            />

            <WorshipTableSection />

            <OnlineWorshipSection
              onNavigateSection={handleNavigate}
            />

            <CommunitySections
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigate}
            />

            <GallerySection />

            <LocationAndOffering />
          </>
        )}
      </main>

      {/* 5. 포털 푸터 */}
      <PortalFooter onOpenAdmin={() => setIsAdminDashboardOpen(true)} />

      {/* 6. 우측 하단 플로팅 버튼 */}
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

      {/* 8. 관리자 대시보드 */}
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
