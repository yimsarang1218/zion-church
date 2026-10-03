import React, { useState, useEffect } from 'react';
import { MessageCircle, CreditCard, ArrowUp, Check } from 'lucide-react';
import { CHURCH_INFO, BANK_ACCOUNTS } from '../data/churchData';

interface FloatingActionsProps {
  onOpenPrayer: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenPrayer }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickCopy = () => {
    const mainAcc = BANK_ACCOUNTS[0];
    navigator.clipboard.writeText(mainAcc.accountNumber.replace(/-/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside aria-label="빠른 실행 메뉴" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
      {/* Scroll Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-slate-700 shadow-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all cursor-pointer hover:-translate-y-0.5"
          aria-label="맨 위로 스크롤"
          title="맨 위로 가기"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Quick Offering Copy Button */}
      <button
        onClick={handleQuickCopy}
        className="group relative flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white text-[#1E3A5F] shadow-lg border border-slate-200 hover:shadow-xl hover:bg-slate-50 transition-all cursor-pointer hover:-translate-y-0.5"
        title="대표 헌금계좌 복사하기"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 whitespace-nowrap">
              계좌 복사됨
            </span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 text-[#C5A059]" />
            <span className="text-xs font-bold whitespace-nowrap hidden sm:inline">
              온라인 헌금
            </span>
          </>
        )}
      </button>

      {/* KakaoTalk Consultation Button */}
      <button
        onClick={onOpenPrayer}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FEE500] hover:bg-[#FADA0A] text-slate-900 font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-0.5"
        aria-label="카카오톡 및 기도 상담"
      >
        <MessageCircle className="w-4 h-4 fill-slate-900" />
        <span>상담 · 기도요청</span>
      </button>
    </aside>
  );
};
