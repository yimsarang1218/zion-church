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
import { SubDetailModal, SubDetailType } from './components/SubDetailModal';
import { SubPageLayout } from './components/SubPageLayout';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  const [viewMode, setViewMode] = useState<'main' | 'subpage'>('main');
  const [currentSectionId, setCurrentSectionId] = useState<string>('worship');
  const [currentSubMenuId, setCurrentSubMenuId] = useState<string>('sunday-sermon');

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [activeSubDetail, setActiveSubDetail] = useState<SubDetailType | null>(null);

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
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 핵심: 모든 서브메뉴/섹션 클릭을 완벽하게 SubPageLayout으로 연결
  const handleNavigateSection = (sectionId: string, subMenuId?: string) => {
    setCurrentSectionId(sectionId);
    
    if (subMenuId) {
      setCurrentSubMenuId(subMenuId);
    } else {
      // 카테고리 대표 클릭 시 첫 번째 기본 탭 지정
      if (sectionId === 'worship') setCurrentSubMenuId('sunday-sermon');
      else if (sectionId === 'qt') setCurrentSubMenuId('qtin-guide');
      else if (sectionId === 'community') setCurrentSubMenuId('sarangbang');
      else if (sectionId === 'ministry') setCurrentSubMenuId('ministry-intro');
      else if (sectionId === 'newfamily') setCurrentSubMenuId('welcome-greeting');
      else if (sectionId === 'about') setCurrentSubMenuId('vision-slogan');
    }

    setViewMode('subpage'); // 서브페이지 모드 활성화!
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* 1. 상단 긴급 공지 바 */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. 네비게이션 헤더 (어떤 함수명으로 호출해도 handleNavigateSection으로 연결) */}
      <HeaderNav
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onGoHome={handleGoHome}
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 3. 전체 메뉴 오버레이 (사이트맵) */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
        onOpenSubDetail={(type) => setActiveSubDetail(type)}
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 4. 메인 화면 vs 서브페이지 전환 영역 */}
      <main className="flex-1">
        {viewMode === 'subpage' ? (
          /* 서브페이지 레이아웃 활성화 */
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
            {/* 반응형 메인 배너 */}
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

      {/* 7. 모달 팝업들 */}
      <BulletinModal
        isOpen={isBulletinOpen}
        onClose={() => setIsBulletinOpen(false)}
      />

      <PrayerModal
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />

      <SubDetailModal
        type={activeSubDetail}
        isOpen={activeSubDetail !== null}
        onClose={() => setActiveSubDetail(null)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 8. 통합 관리자 대시보드 */}
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
