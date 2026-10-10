import React, { useState } from 'react';
import { X, Heart, Send, CheckCircle2, Lock, Loader2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

interface PrayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerModal: React.FC<PrayerModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState<'중보기도' | '신앙상담' | '심방요청'>('신앙상담');
  const [request, setRequest] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !request.trim()) {
      alert('성함과 상담/기도 내용을 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Firebase Firestore 'prayers' 컬렉션에 실시간 영구 저장
      await addDoc(collection(db, 'prayers'), {
        name: name.trim(),
        phone: phone.trim(),
        category,
        request: request.trim(),
        isPrivate,
        status: '접수대기',
        createdAt: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        timestamp: serverTimestamp()
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('상담/기도 접수 오류:', error);
      alert('접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setName('');
    setPhone('');
    setRequest('');
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg overflow-hidden bg-white rounded-3xl shadow-2xl border border-slate-100">
        
        {/* 상단 닫기 */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="p-8 sm:p-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900">상담 및 기도요청이 접수되었습니다</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              보내주신 소중한 기도제목과 상담 내용은 교역자실로 안전하게 전달되었습니다. 목양적 사랑과 기도로 함께 동행하겠습니다.
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              확인 및 닫기
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-[#C49A45] flex items-center justify-center border border-amber-500/20">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">온라인 신앙상담 및 중보기도</h3>
                <p className="text-xs text-slate-500">혼자 아파하지 마시고 기도로 함께 나누어 주세요.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                {(['신앙상담', '중보기도', '심방요청'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      category === cat
                        ? 'bg-[#C49A45] text-white border-[#C49A45] shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">성함 / 직분</label>
                  <input
                    type="text"
                    required
                    placeholder="예: 홍길동 성도"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">연락처 (선택)</label>
                  <input
                    type="text"
                    placeholder="010-0000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">상담 및 기도제목</label>
                <textarea
                  required
                  rows={4}
                  placeholder="기도가 필요한 내용이나 나누고 싶은 신앙의 고민을 편안하게 적어주세요."
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 p-3 bg-amber-50/70 border border-amber-200/50 rounded-xl text-[11px] text-amber-900">
                <Lock className="w-3.5 h-3.5 text-[#C49A45] shrink-0" />
                <span>모든 상담과 기도제목은 교역자실 외에 외부에 일절 공개되지 않습니다.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>기도제목 전송 중...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>상담 및 기도요청 접수하기</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
