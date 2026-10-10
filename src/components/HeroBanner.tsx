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
}) => {
  const [bannerUrl, setBannerUrl] = useState<string>('/main-church-banner.png');

  // Firestore DB 실시간 동기화
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
    <section className="relative w-full bg-slate-900 overflow-hidden">
      {/* 순수 16:9 황금비율 컨테이너 (위아래/좌우 절대 잘리지 않음) */}
      <div className="relative w-full aspect-[16/9] flex items-center justify-center">
        <img
          src={bannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/main-church-banner.png';
          }}
        />

        {/* 하단 퀵 액션 버튼 바 (성전 바닥 벽돌 라인에 딱 맞춘 위치) */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 z-10">
          {onOpenBulletin && (
            <button
              onClick={onOpenBulletin}
              className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-900 font-extrabold text-xs sm:text-sm shadow-xl backdrop-blur-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer border border-slate-200"
            >
              <BookOpen className="w-4 h-4 text-[#C49A45]" />
              <span>금주의 주보 보기</span>
            </button>
          )}

          {onOpenPrayer && (
            <button
              onClick={onOpenPrayer}
              className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-[#111827]/90 hover:bg-[#111827] text-white font-extrabold text-xs sm:text-sm shadow-xl backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
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
