import React, { useState } from 'react';
import { X, Send, MessageCircle, Heart, Phone, CheckCircle2 } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: '기도제목',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      type: '기도제목',
      message: '',
    });
    onClose();
  };

  const handleOpenKakaoTalk = () => {
    // Open kakao consultation or search
    window.open(CHURCH_INFO.kakaoTalkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-[#1E3A5F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[#C5A059]">
              <Heart className="w-4 h-4 fill-[#C5A059]" />
            </div>
            <div>
              <h3 className="text-base font-bold">온라인 기도요청 & 상담</h3>
              <p className="text-xs text-slate-300">목회자가 함께 눈물로 기도합니다</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              기도요청이 정성껏 접수되었습니다
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
              보내주신 귀한 기도제목을 위해 담임목사님과 중보기도팀이 새벽마다 한마음으로 기도하겠습니다.
              하나님의 크신 은혜와 평안이 늘 함께하시길 축복합니다.
            </p>
            <div className="pt-2">
              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#152942] transition-colors cursor-pointer"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            {/* Quick KakaoTalk & Telephone Callout */}
            <div className="mb-5 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col gap-2.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2 text-xs text-slate-800">
                  <MessageCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block text-xs sm:text-sm">카카오톡 1:1 상담 ID</span>
                    <span className="text-slate-600">
                      카카오톡 ID : <strong className="text-amber-900 font-mono text-sm bg-amber-100/80 px-1.5 py-0.5 rounded font-bold">limsarang1218</strong>
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('limsarang1218');
                    alert('카카오톡 ID(limsarang1218)가 복사되었습니다. 카카오톡 친구추가에서 검색해 주세요.');
                  }}
                  className="shrink-0 px-2.5 py-1 rounded-md bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  ID 복사
                </button>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-700">전화 상담 : <strong className="font-mono text-slate-900">010-2741-2938</strong></span>
                <a
                  href="tel:010-2741-2938"
                  className="px-2.5 py-1 rounded-md bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  전화걸기
                </a>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  성함 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    연락처 (선택)
                  </label>
                  <input
                    type="tel"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    구분
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-slate-800 bg-white"
                  >
                    <option value="기도제목">중보 기도제목</option>
                    <option value="신앙상담">신앙 / 고민 상담</option>
                    <option value="심방요청">가정 / 병원 심방 요청</option>
                    <option value="새가족">새가족 등록 문의</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  나누고 싶은 말씀 및 기도 내용 <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="나누고 싶으신 기도제목이나 문의 사항을 편안하게 남겨주세요. 내용은 철저하게 비밀이 보장됩니다."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E3A5F] text-slate-800 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`tel:${CHURCH_INFO.phone}`}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-[#1E3A5F]"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>전화 상담: {CHURCH_INFO.phone}</span>
                </a>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#1E3A5F] text-white text-xs sm:text-sm font-semibold hover:bg-[#152942] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>기도제목 전송</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
