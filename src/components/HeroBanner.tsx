import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Heart } from 'lucide-react';

interface HeroBannerProps {
  onOpenBulletin?: () => void;
  onOpenPrayer?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBulletin,
  onOpenPrayer,
}) => {
  const [bannerUrl, setBannerUrl] = useState<string>('/main-church-banner.png');
  const [mobileBannerUrl, setMobileBannerUrl] = useState<string>('/mobile-church-banner.png');

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main_config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroBannerUrl) setBannerUrl(data.heroBannerUrl);
          if (data.mobileHeroBannerUrl) setMobileBannerUrl(data.mobileHeroBannerUrl);
        }
      } catch (err) {
        console.warn('설정 조회 실패 (기본 배너 사용):', err);
      }
    };
    fetchSiteSettings();
  }, []);

  return (
    <section className="relative w-full bg-slate-900 overflow-hidden pb-4 sm:pb-8">
      {/* PC 데스크톱 화면 (16:9) */}
      <div className="hidden md:block relative w-full aspect-[16/9] flex items-center justify-center">
        <img
          src={bannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/main-church-banner.png';
          }}
        />

        {/* 퀵 액션 버튼 바: 하단 경계선에서 충분히 띄워 배치 */}
        <div className="absolute bottom-10 lg:bottom-14 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 flex items-center justify-center gap-4 z-10">
          {onOpenBulletin && (
            <button
              onClick={onOpenBulletin}
              className="px-6 py-3 rounded-full bg-white/95 hover:bg-white text-slate-900 font-extrabold text-sm shadow-xl backdrop-blur-xs flex items-center gap-2 transition-all hover:scale-105 cursor-pointer border border-slate-200"
            >
              <BookOpen className="w-4 h-4 text-[#C49A45]" />
              <span>금주의 주보 보기</span>
            </button>
          )}

          {onOpenPrayer && (
            <button
              onClick={onOpenPrayer}
              className="px-6 py-3 rounded-full bg-[#111827]/90 hover:bg-[#111827] text-white font-extrabold text-sm shadow-xl backdrop-blur-xs border border-white/20 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400" />
              <span>온라인 중보기도 요청</span>
            </button>
          )}
        </div>
      </div>

      {/* 모바일 화면 (4:5) */}
      <div className="block md:hidden relative w-full aspect-[4/5] flex items-center justify-center">
        <img
          src={mobileBannerUrl}
          alt="시온성교회 2026 표어 및 성전 전경 (모바일)"
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/mobile-church-banner.png';
          }}
        />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[320px] px-3 flex flex-col gap-2 z-10">
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
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span>온라인 중보기도 요청</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
