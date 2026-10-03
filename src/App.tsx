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

export default function App() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isBulletinOpen, setIsBulletinOpen] = useState(false);
  const [isPrayerOpen, setIsPrayerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      {/* 1. Top Notice Information Bar */}
      <TopNoticeBar
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* 2. Main Sticky Navigation Header with 6 GNB Menus */}
      <HeaderNav onToggleMegaMenu={() => setIsMegaMenuOpen(true)} />

      {/* 3. Fullscreen Mega Menu Overlay (Sitemap) */}
      <MegaMenuOverlay
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onOpenBulletin={() => setIsBulletinOpen(true)}
        onOpenPrayer={() => setIsPrayerOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Visual Hero Banner (480px, ZION PRESBYTERIAN CHURCH) */}
        <HeroBanner />

        {/* 4 Tile Cards Overlapping Hero */}
        <MainQuickGrid
          onOpenBulletin={() => setIsBulletinOpen(true)}
          onOpenPrayer={() => setIsPrayerOpen(true)}
        />

        {/* 예배 시간 안내 테이블 (주일 1/2부, 수요행복예배, 금요예배 실시간 생중계) */}
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
      </main>

      {/* Portal Footer */}
      <PortalFooter />

      {/* Floating Action Buttons (Kakao Consultation & Quick Offering) */}
      <FloatingActions onOpenPrayer={() => setIsPrayerOpen(true)} />

      {/* Modals */}
      <BulletinModal
        isOpen={isBulletinOpen}
        onClose={() => setIsBulletinOpen(false)}
      />
      <PrayerModal
        isOpen={isPrayerOpen}
        onClose={() => setIsPrayerOpen(false)}
      />
    </div>
  );
}
