import React from 'react';
import { BookOpen, Users, HeartHandshake, CheckCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface CommunitySectionsProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const CommunitySections: React.FC<CommunitySectionsProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  return (
    <div className="bg-[#F9FAFB] py-16 sm:py-20 border-y border-[#E5E7EB]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-20">
        {/* 02. 날마다 큐티 (QUIET TIME) */}
        <section id="qt">
          <div className="flex justify-between items-end border-b-2 border-[#1F2937] pb-3 mb-8">
            <div>
              <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
                QUIET TIME
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
                02 날마다 큐티
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={CHURCH_INFO.meditationBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-[#03C75A] hover:underline flex items-center gap-1"
              >
                <span>오늘의 묵상 블로그</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-slate-300">|</span>
              <button
                onClick={onOpenBulletin}
                className="text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#C49A45] flex items-center gap-1 cursor-pointer"
              >
                <span>금주의 주보보기</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 구속사 말씀 묵상 (큐티인) */}
            <div className="bg-white p-7 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C49A45]/15 text-[#C49A45] flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">구속사 말씀 묵상 (큐티인)</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  성경 말씀을 통해 나의 죄를 보고 예수 그리스도의 십자가 구속의 은혜를 깨닫는 영적 호흡입니다. <strong className="text-amber-800 block mt-1">(큐티인 구매 : 2층 (구)방송실)</strong>
                </p>
              </div>
            </div>

            {/* 오늘의 묵상 블로그 연동 */}
            <div className="bg-white p-7 rounded-xl border-2 border-[#03C75A]/30 shadow-xs flex flex-col justify-between relative group hover:border-[#03C75A] transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-[#03C75A]/15 text-[#03C75A] flex items-center justify-center">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-[#03C75A]/10 text-[#03C75A] text-[11px] font-bold">
                    월-금 묵상 연재
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2 flex items-center gap-1.5">
                  <span>오늘의 묵상 (블로그)</span>
                  <ExternalLink className="w-4 h-4 text-[#03C75A]" />
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  매일 아침 성도들의 삶을 깨우는 깊이 있는 말씀 묵상글이 올라오는 공식 묵상 블로그입니다. (월-금 매일 묵상글 게재)
                </p>
              </div>
              <a
                href={CHURCH_INFO.meditationBlogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-lg bg-[#03C75A] hover:bg-[#02B351] text-white text-xs font-bold transition-all text-center inline-flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>오늘의 묵상글 읽으러 가기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 다음세대 큐티스쿨 */}
            <div className="bg-white p-7 rounded-xl border border-[#E5E7EB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#C49A45]/15 text-[#C49A45] flex items-center justify-center mb-4">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1F2937] mb-2">다음세대 큐티스쿨</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  주일 오후 12:00, 3층 소예배실에서 우리 자녀들이 스스로 말씀을 묵상하고 하나님을 인격적으로 만납니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 03. 공동체와 양육 & 05. 새가족 안내 */}
        <section id="community">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: 목장 공동체 */}
            <div>
              <div className="border-b-2 border-[#1F2937] pb-3 mb-6">
                <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
                  COMMUNITY & DISCIPLESHIP
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937]">
                  03 공동체와 양육 (목장)
                </h3>
              </div>
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#E5E7EB] space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  시온성교회의 목장은 서로의 허물과 아픔을 덮어주고, 십자가 사랑으로 함께 웃고 우는 믿음의 가족입니다.
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1F2937]">목장 모임:</strong> 목자와 목원들이 말씀 앞에 서서 삶을 나누고 회복하는 소그룹 (주일 14:30)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1F2937]">주일 양육반(10주 과정):</strong> 신앙의 기초를 다지고 말씀의 깊은 은혜로 나아가는 과정 (주일 13:00)
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-[#C49A45] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#1F2937]">청년부 모임:</strong> 비전과 진로를 말씀 안에서 찾고 사랑으로 하나되는 청년 공동체
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: 새가족 안내 */}
            <div id="newcomers">
              <div className="border-b-2 border-[#1F2937] pb-3 mb-6">
                <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
                  Welcome New Family
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2937]">
                  05 새가족 안내
                </h3>
              </div>
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-[#E5E7EB] space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  오늘 저희 교회를 처음 방문하신 모든 분들을 주님의 이름으로 진심으로 환영합니다. 삼위일체 하나님께 신령과 진정으로 예배합니다.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                    <strong className="text-[#1F2937] block mb-1">1단계: 첫 방문 환영</strong>
                    <span className="text-slate-500">예배 후 환영 교제 및 새가족 안내</span>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB]">
                    <strong className="text-[#1F2937] block mb-1">2단계: 정착과 양육</strong>
                    <span className="text-slate-500">주일 양육반(10주 과정) 및 목장 모임 연결</span>
                  </div>
                </div>
                <div className="pt-2">
                  <button
                    onClick={onOpenPrayer}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#1F2937] hover:bg-[#111827] text-white text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    새가족 상담 & 기도 신청하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06. 교회소개 & 2026 표어 (중앙 정렬 및 너비 채우기 반영) */}
        <section id="about">
          <div className="border-b-2 border-[#1F2937] pb-3 mb-8">
            <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
              About Zion Church
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
              06 교회소개 & 2026 표어
            </h2>
          </div>

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#E5E7EB] shadow-xs">
            {/* 2026 Slogan Banner */}
            <div className="mb-8 p-6 sm:p-7 rounded-xl bg-amber-50/70 border border-amber-200/80 text-center">
              <span className="text-xs font-bold text-[#A27B2B] tracking-wider uppercase block mb-1.5">
                2026년 교회 표어
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1F2937] tracking-tight">
                “{CHURCH_INFO.slogan2026}”
              </h3>
            </div>

            {/* 소개 본문 (가운데 정렬, 단어 끊김 방지, 편안한 줄바꿈) */}
            <div className="text-center text-slate-700 text-sm sm:text-base leading-relaxed mb-8 max-w-4xl mx-auto [word-break:keep-all]">
              <p className="mb-2">
                대한예수교장로회(합동) 하남 시온성교회는 오직 기록된 말씀 위에 서서,
                <br className="hidden sm:inline" />
                날마다 십자가의 복음으로 영혼이 살아나고 주께 하듯 기쁨으로 함께 걷는 믿음의 공동체입니다.
              </p>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                교회는 하남시 광암동(서하남로 278-30)에 위치하고 있습니다.
              </p>
            </div>

            {/* 섬기는 이들 (좌우 균형 잡힌 카드형 그리드) */}
            <div className="w-full bg-[#F9FAFB] rounded-xl border border-[#E5E7EB] p-5 sm:p-7 mb-8 shadow-2xs">
              {/* 목회자 라인 (상단 중앙 강조) */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pb-4 border-b border-slate-200 text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1F2937]">담임목사:</span>
                  <span className="font-semibold text-slate-900">{CHURCH_INFO.seniorPastor}</span>
                </div>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1F2937]">동사목사:</span>
                  <span className="font-semibold text-slate-900">{CHURCH_INFO.associatePastor}</span>
                </div>
              </div>

              {/* 장로님 명단 (좌우 대칭 2열 그리드) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-12 pt-4 text-xs sm:text-sm max-w-2xl mx-auto">
                <div className="flex justify-between sm:justify-start gap-3 border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
                  <span className="font-bold text-[#1F2937] min-w-[70px]">원로장로 :</span>
                  <span className="text-slate-700">임원묵</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-3 border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
                  <span className="font-bold text-[#1F2937] min-w-[70px]">명예장로 :</span>
                  <span className="text-slate-700">진종원</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-3 border-b sm:border-b-0 border-slate-100 pb-2 sm:pb-0">
                  <span className="font-bold text-[#1F2937] min-w-[70px]">은퇴장로 :</span>
                  <span className="text-slate-700">김승연, 강태붕</span>
                </div>
                <div className="flex justify-between sm:justify-start gap-3">
                  <span className="font-bold text-[#1F2937] min-w-[70px]">시무장로 :</span>
                  <span className="text-slate-700">이영재, 정호성</span>
                </div>
              </div>
            </div>

            {/* 하단 연락처 바 (가운데 정렬) */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-600 pt-5 border-t border-slate-100">
              <span className="font-medium">전화 상담: {CHURCH_INFO.counselingPhone}</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="font-medium">교회 셔틀: {CHURCH_INFO.shuttlePhone}</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="font-medium">팩스: {CHURCH_INFO.fax}</span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="font-medium">이메일: {CHURCH_INFO.email}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
