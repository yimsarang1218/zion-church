import React, { useEffect } from 'react';
import { X, BookOpen, Users, Video, ArrowRight } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export type SubDetailType = 'sermon' | 'qt' | 'community' | 'ministry' | 'newcomers' | 'about';

interface SubDetailModalProps {
  type: SubDetailType | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const SubDetailModal: React.FC<SubDetailModalProps> = ({
  type,
  isOpen,
  onClose,
  onOpenBulletin,
  onOpenPrayer,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* 모달 상단 헤더 */}
        <div className="bg-[#111827] text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C49A45]" />
            <h3 className="font-extrabold text-base sm:text-lg">
              {type === 'sermon' && '01. 예배와 말씀 상세 안내'}
              {type === 'qt' && '02. 날마다 큐티 (구속사 묵상)'}
              {type === 'community' && '03. 공동체와 목장 나눔'}
              {type === 'ministry' && '04. 사역과 선교 안내'}
              {type === 'newcomers' && '05. 새가족 등록 및 정착 안내'}
              {type === 'about' && '06. 교회 소개 및 2026 비전'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 모달 내용 */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5 text-slate-700 text-sm leading-relaxed">
          {type === 'sermon' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <strong className="text-amber-900 block mb-1">온·오프라인 현장 예배</strong>
                <p className="text-xs text-amber-800">
                  주일 1부(10:00), 2부(11:20) 및 수요행복예배(수 저녁 8시), 금요심야기도회(금 밤 8시)가 진행됩니다.
                </p>
              </div>
              <div className="border border-slate-200 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">유튜브 공식 설교 채널</h4>
                  <p className="text-xs text-slate-500 mt-0.5">지난 주일 설교와 찬양을 다시 보실 수 있습니다.</p>
                </div>
                <a
                  href={CHURCH_INFO.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
                >
                  <Video className="w-4 h-4" />
                  <span>유튜브 이동</span>
                </a>
              </div>
            </div>
          )}

          {type === 'qt' && (
            <div className="space-y-4">
              <p>
                시온성교회는 남을 판단하기보다 <strong>말씀을 통해 내 죄를 보고 회개하는 구속사적 큐티</strong>를 나눕니다.
              </p>
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-emerald-950">담임목사 큐티 묵상 (네이버 블로그)</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">매일 업데이트되는 말씀 묵상 글을 읽어보세요.</p>
                </div>
                <a
                  href={CHURCH_INFO.meditationBlogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#03C75A] text-white font-bold text-xs inline-flex items-center gap-1.5 shrink-0"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>블로그 보기</span>
                </a>
              </div>
              <button
                onClick={() => { onClose(); onOpenBulletin(); }}
                className="w-full py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 font-bold text-xs text-slate-800 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>금주의 주보에서 묵상 본문 확인하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {type === 'community' && (
            <div className="space-y-4">
              <p>세상에서 지친 영혼이 가면을 벗고 솔직한 나눔으로 치유받는 따뜻한 소그룹 공동체입니다.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">부부 / 가정 목장</strong>
                  <span className="text-slate-600">가정의 회복과 부부 갈등 직면, 자녀 양육의 지혜를 나눕니다.</span>
                </div>
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong className="text-slate-900 block mb-1">청년 / 직장 목장</strong>
                  <span className="text-slate-600">일터의 고난과 믿음의 고민을 말씀으로 함께 해석합니다.</span>
                </div>
              </div>
              <button
                onClick={() => { onClose(); onOpenPrayer(); }}
                className="w-full py-2.5 rounded-xl bg-[#1F2937] text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
              >
                목장 배정 및 상담 신청하기
              </button>
            </div>
          )}

          {type === 'ministry' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900">다음세대 큐티스쿨 (어린이·청소년)</h4>
                <p className="text-xs text-slate-600">
                  매 주일 오후 12:00, 3층 소예배실에서 다음세대를 위한 말씀 묵상과 나눔이 열립니다.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <h4 className="font-bold text-slate-900">지역 사회 섬김 및 구제</h4>
                <p className="text-xs text-slate-600">
                  서하남 지역의 이웃들을 돌아보고 그리스도의 사랑을 흘려보내는 구제 사역을 펼치고 있습니다.
                </p>
              </div>
            </div>
          )}

          {type === 'newcomers' && (
            <div className="space-y-4">
              <p>시온성교회에 처음 오신 분들을 온 마음으로 환영합니다.</p>
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#C49A45] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                  <div>
                    <strong className="text-slate-900 text-xs block">예배 안내 및 등록 카드 작성</strong>
                    <span className="text-[11px] text-slate-500">예배 후 본당 로비 새가족실에서 등록 카드를 작성합니다.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="w-5 h-5 rounded-full bg-[#C49A45] text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                  <div>
                    <strong className="text-slate-900 text-xs block">4주 새가족 과정 및 목장 연계</strong>
                    <span className="text-[11px] text-slate-500">구속사 복음의 기초를 배우고 편안한 소그룹 목장에 배정됩니다.</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => { onClose(); onOpenPrayer(); }}
                className="w-full py-2.5 rounded-xl bg-[#C49A45] text-white font-bold text-xs hover:bg-[#A27B2B] cursor-pointer"
              >
                새가족 온라인 등록 및 문의하기
              </button>
            </div>
          )}

          {type === 'about' && (
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-center">
                <span className="text-xs font-bold text-[#A27B2B]">2026년 표어</span>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">{CHURCH_INFO.slogan2026}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                대한예수교장로회(합동)에 속한 시온성교회는 복음의 본질, 수용과 안식, 회복과 죄 고백을 통해 한 영혼을 천하보다 귀하게 여기는 공동체입니다.
              </p>
              <div className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                <div><strong>주소:</strong> {CHURCH_INFO.address} {CHURCH_INFO.addressDetail}</div>
                <div><strong>사무실:</strong> 02-408-1191 | <strong>상담:</strong> {CHURCH_INFO.counselingPhone}</div>
              </div>
            </div>
          )}
        </div>

        {/* 닫기 버튼 */}
        <div className="bg-slate-50 p-3 sm:p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
