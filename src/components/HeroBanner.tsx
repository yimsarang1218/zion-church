import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Heart } from 'lucide-react';

interface HeroBannerProps {
  onOpenBulletin?: () => void;
  onOpenPrayer?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBulletin,
  onOpenPrayer,
  onNavigateSection,
}) => {
  // 기본 배너: 깃허브 public 폴더에 올릴 교회 전경 표어 배너
  const [bannerUrl, setBannerUrl] = useState<string>('/main-church-banner.png');

  // Firestore DB에서 관리자가 변경한 배너가 있는지 실시간 조회 (동적 CMS 연동)
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main_config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().heroBannerUrl) {
          setBannerUrl(docSnap.data().heroBannerUrl);
        }
      } catch (err) {
        console.warn('설정 조회 실패 (기본 배너 사용):', err);
      }
    };
    fetchSiteSettings();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* 1. 교회 전경 + 표어 고화질 배너 이미지 (전면 꽉 찬 비율) */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[720px] min-h-[460px] flex items-center justify-center">
        <img
          src={bannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경"
          className="w-full h-full object-cover object-center brightness-95"
          onError={(e) => {
            // 외부 링크 오류 시 기본 이미지로 대체
            (e.target as HTMLImageElement).src = '/main-church-banner.png';
          }}
        />

        {/* 은은한 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

        {/* 하단 퀵 액션 버튼 바 */}
        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex flex-wrap items-center justify-center gap-3 z-10">
          {onOpenBulletin && (
            <button
              onClick={onOpenBulletin}
              className="px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-lg backdrop-blur-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#C49A45]" />
              <span>금주의 주보 보기</span>
            </button>
          )}

          {onOpenPrayer && (
            <button
              onClick={onOpenPrayer}
              className="px-5 py-2.5 rounded-full bg-[#111827]/85 hover:bg-[#111827] text-white font-extrabold text-xs sm:text-sm shadow-lg backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>온라인 중보기도 요청</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
