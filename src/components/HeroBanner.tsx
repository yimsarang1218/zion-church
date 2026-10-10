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
  // PC 데스크톱용 기본 배너 (16:9 가로형)
  const [bannerUrl, setBannerUrl] = useState<string>('/main-church-banner.png');
  // 모바일 스마트폰용 기본 배너 (4:5 세로형)
  const [mobileBannerUrl, setMobileBannerUrl] = useState<string>('/mobile-church-banner.png');

  // Firestore DB 실시간 동적 CMS 연동 (관리자가 수정 시 우선 적용)
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main_config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroBannerUrl) {
            setBannerUrl(data.heroBannerUrl);
          }
          if (data.mobileHeroBannerUrl) {
            setMobileBannerUrl(data.mobileHeroBannerUrl);
          }
        }
      } catch (err) {
        console.warn('설정 조회 실패 (기본 배너 사용):', err);
      }
    };
    fetchSiteSettings();
  }, []);

  return (
    <section className="relative w-full bg-slate-900 overflow-hidden">
      {/* 1. PC 데스크톱용 화면 (MD 브레이크포인트 이상에서만 보임, 순수 16:9 황금비율) */}
      <div className="hidden md:block relative w-full aspect-[16/9] flex items-center justify-center">
        <img
          src={bannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/main-church-banner.png';
          }}
        />

        {/* 데스크톱 하단 퀵 버튼 바 */}
        <div className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex items-center justify-center gap-4 z-10">
          {onOpenBulletin && (
            <button
              onClick={onOpenBulletin}
              className="px-6 py-2.5 rounded-full bg-white/95 hover:bg-white text-slate-900 font-extrabold text-sm shadow-xl backdrop-blur-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer border border-slate-200"
            >
              <BookOpen className="w-4 h-4 text-[#C49A45]" />
              <span>금주의 주보 보기</span>
            </button>
          )}

          {onOpenPrayer && (
            <button
              onClick={onOpenPrayer}
              className="px-6 py-2.5 rounded-full bg-[#111827]/90 hover:bg-[#111827] text-white font-extrabold text-sm shadow-xl backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>온라인 중보기도 요청</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. 모바일 스마트폰용 화면 (MD 브레이크포인트 미만 즉 모바일에서만 보임, 세로형 4:5 비율) */}
      <div className="block md:hidden relative w-full aspect-[4/5] flex items-center justify-center">
        <img
          src={mobileBannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경 (모바일)"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/mobile-church-banner.png';
          }}
        />

        {/* 모바일 화면 하단 퀵 버튼 바 (좁은 모바일 너비에 맞게 배치) */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-3 flex flex-col gap-2 z-10">
          {onOpenBulletin && (
            <button
              onClick={onOpenBulletin}
              className="w-full py-2.5 rounded-xl bg-white/95 text-slate-900 font-extrabold text-xs shadow-md backdrop-blur-xs flex items-center justify-center gap-2 border border-slate-200"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>금주의 주보 보기</span>
            </button>
          )}

          {onOpenPrayer && (
            <button
              onClick={onOpenPrayer}
              className="w-full py-2.5 rounded-xl bg-[#111827]/95 text-white font-extrabold text-xs shadow-md backdrop-blur-xs border border-white/10 flex items-center justify-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>온라인 중보기도 요청</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
