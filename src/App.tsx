import React, { useState } from 'react';
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

export default function App() {
  const [viewMode, setViewMode] = useState<'main' | 'subpage'>('main');
  const [currentSectionId, setCurrentSectionId] = useState<string>('worship');
  const [currentSubMenuId, setCurrentSubMenuId] = useState<string>('wednesday-sermon');

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);
  const [activeSubDetail, setActiveSubDetail] = useState<SubDetailType | null>(null);

  // 메인 홈으로 복귀 핸들러
  const handleGoHome = () => {
    setViewMode('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 서브페이지 섹션 및 소메뉴 전환 핸들러
  const handleOpenSubPage = (sectionId: string, subMenuId?: string) => {
    setCurrentSectionId(sectionId);
    if (subMenuId) {
      setCurrentSubMenuId(subMenuId);
    } else {
      // 대메뉴 선택 시 기본 서브메뉴
      if (sectionId === 'worship') setCurrentSubMenuId('wednesday-sermon');
      else if (sectionId === 'qt') setCurrentSubMenuId('qt-guide');
      else if (sectionId === 'community') setCurrentSubMenuId('cell-intro');
      else if (sectionId === 'ministry') setCurrentSubMenuId('ministry-team');
      else if (sectionId === 'newcomers') setCurrentSubMenuId('newcomers-welcome');
      else if (sectionId === 'about') setCurrentSubMenuId('vision-slogan');
    }
    setViewMode('subpage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      {/* 1. 상단 정보 바 (주보 열람 & 기도 상담) */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. 상단 네비게이션 헤더 (로고 클릭 시 홈, 6대 메뉴 클릭 시 서브페이지 전환 연동) */}
      <HeaderNav
        onToggleMegaMenu={() => setIsMegaMenuOpen(true)}
        onGoHome={handleGoHome}
        onNavigateSection={(sectionId) => handleOpenSubPage(sectionId)}
      />

      {/* 3. 전체메뉴 메가메뉴 오버레이 */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
        onOpenSubDetail={(type) => setActiveSubDetail(type)}
        onOpenSubPage={(sectionId, subMenuId) => handleOpenSubPage(sectionId, subMenuId)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {viewMode === 'subpage' ? (
          /* ========================================================= */
          /* 2단 서브 게시판 시스템 (우리들교회 구조 100% 동일 SubPageLayout) */
          /* ========================================================= */
          <SubPageLayout
            initialSectionId={currentSectionId}
            initialSubMenuId={currentSubMenuId}
            onGoHome={handleGoHome}
            onOpenBulletin={() => setIsBulletinOpen(true)}
            onOpenPrayer={() => setIsPrayerOpen(true)}
          />
        ) : (
          /* ========================================================= */
          /* 메인 홈 뷰 (기존 메인 홈 레이아웃 100% 온전히 보존)              */
          /* ========================================================= */
          <>
            {/* Visual Hero Banner (480px, ZION PRESBYTERIAN CHURCH) */}
            <HeroBanner />

            {/* 4 Tile Cards Overlapping Hero (PC 4개 카드 & 모바일 3개 아이콘) */}
            <MainQuickGrid
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 예배 시간 안내 테이블 */}
            <WorshipTableSection />

            {/* 온라인 예배 & 설교 영상 다시보기 */}
            <OnlineWorshipSection />

            {/* 날마다 큐티 / 공동체와 양육 / 새가족 안내 / 교회소개 */}
            <CommunitySections
              onOpenBulletin={() => setIsBulletinOpen(true)}
              onOpenPrayer={() => setIsPrayerOpen(true)}
            />

            {/* 시온성 갤러리 */}
            <GallerySection />

            {/* 오시는 길 & 온라인 헌금 안내 */}
            <LocationAndOffering />
          </>
        )}
      </main>

      {/* Portal Footer (방문자 수 카운트 연동 100% 보존) */}
      <PortalFooter />

      {/* Floating Action Buttons */}
      <FloatingActions onOpenPrayer={() => setIsPrayerOpen(true)} />

      {/* 모달 시스템 */}
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
    </div>
  );
}
