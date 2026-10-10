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

  // 관리자 대시보드 모달 상태
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // 주소창 감지: #admin 또는 /admin 또는 ?admin=true 접근 시 대시보드 자동 열림
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

  // 메인 홈으로 이동 (로고)
  const handleGoHome = () => {
    setViewMode('main');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 서브페이지 이동 및 탭 바로가기
  const handleNavigateSubPage = (sectionId: string, subMenuId?: string) => {
    setCurrentSectionId(sectionId);
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
    setViewMode('subpage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans antialiased">
      {/* 1. 상단 긴급 공지 바 */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. 표준 네비게이션 헤더 */}
      <HeaderNav
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onGoHome={handleGoHome}
        onNavigateSubPage={handleNavigateSubPage}
      />

      {/* 3. 전체 메뉴 오버레이 (사이트맵) */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
        onOpenSubDetail={(type) => setActiveSubDetail(type)}
        onNavigateSubPage={(sectionId, subMenuId) => handleNavigateSubPage(sectionId, subMenuId)}
      />

      {/* 4. 메인 콘텐츠 영역 */}
      <main className="flex-1">
        {viewMode === 'subpage' ? (
          <SubPageLayout
            initialSectionId={currentSectionId}
            initialSubMenuId={currentSubMenuId}
            onGoHome={handleGoHome}
            onOpenBulletin={() => setIsBulletinOpen(true)}
            onOpenPrayer={() => setIsPrayerOpen(true)}
          />
        ) : (
          <>
            {/* 반응형 메인 배너 (PC 16:9 / 모바일 4:5) */}
            <HeroBanner
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 빠른 바로가기 그리드 4개 카드 */}
            <MainQuickGrid
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 예배 시간 안내 상세 표 */}
            <WorshipTableSection />

            {/* 온라인 예배 및 말씀 다시보기 */}
            <OnlineWorshipSection />

            {/* 말씀 묵상 / 공동체 양육 / 사역과 선교 / 은혜소식 */}
            <CommunitySections
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 시온성 갤러리 */}
            <GallerySection />

            {/* 오시는 길 & 온라인 헌금 계좌 */}
            <LocationAndOffering />
          </>
        )}
      </main>

      {/* 5. 포털 푸터 (관리자 대시보드 열기 전달) */}
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

      {/* 8. 통합 관리자 대시보드 CMS */}
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
