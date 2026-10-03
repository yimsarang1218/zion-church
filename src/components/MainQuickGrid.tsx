import React from 'react';
import { Video, BookOpen, Users, Smile, ChevronRight } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface MainQuickGridProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const MainQuickGrid: React.FC<MainQuickGridProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  return (
    <div className="max-w-[1280px] mx-auto -mt-12 mb-16 px-4 sm:px-6 relative z-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Tile 1: Worship */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                01. WORSHIP
              </span>
              <Video className="w-5 h-5 text-[#C49A45]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">
              예배와 말씀
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
              주일(10:00/11:40) 및 수요·금요 생명의 말씀과 라이브 실시간 중계를 만납니다.
            </p>
          </div>
          <a
            href={CHURCH_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors"
          >
            <span>유튜브 설교 보기</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Tile 2: Meditation */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                02. MEDITATION
              </span>
              <BookOpen className="w-5 h-5 text-[#C49A45]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">
              날마다 큐티
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
              말씀을 삶에 비추어 내 죄를 보고 회개하는 구속사 말씀 묵상과 큐티스쿨입니다.
            </p>
          </div>
          <button
            onClick={onOpenBulletin}
            className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors cursor-pointer text-left"
          >
            <span>금주의 묵상 & 주보</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Tile 3: Community */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                03. COMMUNITY
              </span>
              <Users className="w-5 h-5 text-[#C49A45]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">
              공동체와 나눔
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
              가면을 벗고 솔직한 상처와 연약함을 나누며 서로를 살리는 따뜻한 목장입니다.
            </p>
          </div>
          <a
            href="#community"
            className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors"
          >
            <span>목장 및 양육 안내</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        {/* Tile 4: New Family */}
        <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(0,0,0,0.1)] transition-all duration-200 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase">
                04. NEW FAMILY
              </span>
              <Smile className="w-5 h-5 text-[#C49A45]" />
            </div>
            <h3 className="text-lg font-bold text-[#1F2937] mb-2">
              새가족 안내
            </h3>
            <p className="text-xs text-[#6B7280] leading-relaxed mb-5">
              시온성교회에 처음 오신 성도님들을 주님의 이름으로 진심으로 환영합니다.
            </p>
          </div>
          <button
            onClick={onOpenPrayer}
            className="text-xs font-bold text-[#1F2937] group-hover:text-[#C49A45] inline-flex items-center gap-1 transition-colors cursor-pointer text-left"
          >
            <span>등록 및 상담 문의</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
