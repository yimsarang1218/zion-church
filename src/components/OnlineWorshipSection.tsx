import React from 'react';
import { Youtube, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const OnlineWorshipSection: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-12 sm:py-16 border-t border-slate-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {/* Section Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold tracking-wider uppercase border border-red-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ONLINE SANCTUARY</span>
          </div>
        </div>

        {/* Featured Worship Video Player Card */}
        <div className="max-w-4xl mx-auto bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
          {/* YouTube Embed Container (16:9) */}
          <div className="relative w-full aspect-video bg-black">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${CHURCH_INFO.featuredSermonVideoId}?rel=0&modestbranding=1`}
              title="하남 시온성교회 설교 말씀 - 재를 치우고 불을 살려라"
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Sermon Information Bar Below Player */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-850">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <BookOpen className="w-4 h-4" />
                <span>{CHURCH_INFO.featuredSermonScripture}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                {CHURCH_INFO.featuredSermonTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                하남 시온성교회 주일예배 말씀 선포
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={CHURCH_INFO.featuredSermonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Youtube className="w-4 h-4" />
                <span>유튜브에서 시청하기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={CHURCH_INFO.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all border border-slate-600 cursor-pointer"
              >
                <span>공식 채널 바로가기</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
