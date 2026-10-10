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

  // 로고 클릭 시 메인 홈 복귀
  const handleGoHome = () => {
    setViewMode('main');
    setIsMegaMenuOpen(false);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 대분류 직접 이동 (상단 01~06 메뉴 클릭 시)
  const handleNavigateSection = (sectionId: string, subMenuId?: string) => {
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

    setIsMegaMenuOpen(false);
    setViewMode('subpage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 3단 메뉴(MegaMenuOverlay)의 세부 항목 ID를 올바른 섹션으로 1:1 자동 라우팅
  const handleMegaMenuClick = (menuKey: string) => {
    let targetSection = 'about';
    let targetSub = menuKey;

    // 01 예배와 말씀
    if (['sunday-sermon', 'wednesday-worship', 'friday-worship', 'tue-thu-prayer'].includes(menuKey)) {
      targetSection = 'worship';
    }
    // 02 날마다 큐티
    else if (['qtin-guide', 'daily-meditation', 'nextgen-qt', 'bulletin-view'].includes(menuKey)) {
      targetSection = 'qt';
    }
    // 03 공동체와 양육
    else if (['sarangbang', 'group-types', 'discipleship', 'intercessory-prayer'].includes(menuKey)) {
      targetSection = 'community';
    }
    // 04 사역과 선교
    else if (['ministry-intro', 'qt-school', 'mission-relief', 'ministry-gallery'].includes(menuKey)) {
      targetSection = 'ministry';
    }
    // 05 새가족 안내
    else if (['welcome-greeting', 'four-week-course', 'shuttle-bus', 'consultation-inquiry'].includes(menuKey)) {
      targetSection = 'newfamily';
    }
    // 06 교회소개
    else {
      targetSection = 'about';
    }

    handleNavigateSection(targetSection, targetSub);
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
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 3. 3단 햄버거 메뉴 (사이트맵) */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => { setIsMegaMenuOpen(false); setIsBulletinOpen(true); }}
        onOpenPrayer={() => { setIsMegaMenuOpen(false); setIsPrayerOpen(true); }}
        onOpenSubDetail={handleMegaMenuClick}
        onNavigateSection={handleNavigateSection}
        onNavigateSubPage={handleNavigateSection}
      />

      {/* 4. 메인 화면 vs 서브페이지 */}
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
            <HeroBanner
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            <MainQuickGrid
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            <WorshipTableSection />

            <OnlineWorshipSection
              onNavigateSection={handleNavigateSection}
            />

            <CommunitySections
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
              onNavigateSection={handleNavigateSection}
            />

            <GallerySection />

            <LocationAndOffering />
          </>
        )}
      </main>

      {/* 5. 포털 푸터 */}
      <PortalFooter onOpenAdmin={() => setIsAdminDashboardOpen(true)} />

      {/* 6. 플로팅 액션 버튼 */}
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

      {/* 8. 관리자 CMS 대시보드 */}
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
