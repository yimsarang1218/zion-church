import React, { useState } from 'react';
import { CreditCard, Copy, Check, Heart, Shield, FileCheck2, Info } from 'lucide-react';
import { BANK_ACCOUNTS } from '../data/churchData';

export const OfferingSection: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopy = (accountNumber: string, bank: string, index: number) => {
    navigator.clipboard.writeText(accountNumber.replace(/-/g, ''));
    setCopiedIndex(index);
    setToastMessage(`${bank} 계좌번호가 복사되었습니다 (${accountNumber})`);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);

    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  return (
    <section id="offering" className="py-20 max-w-[1140px] mx-auto px-4 sm:px-6">
      {/* Section Title */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest text-[#C5A059] font-semibold block mb-2">
          Online Offering Guide
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-3">
          온라인 헌금 안내
        </h2>
        <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
          정성껏 구별된 마음으로 드리는 예물을 통해 하나님의 나라와 교회가 든든히 세워집니다
        </p>
      </div>

      {/* Bible Verse Quote */}
      <div className="max-w-2xl mx-auto text-center mb-10 px-4 py-3 bg-[#EBF2F7]/50 rounded-xl border border-[#1E3A5F]/10">
        <p className="text-xs sm:text-sm text-[#1E3A5F] italic font-serif">
          “각각 그 마음에 정한 대로 할 것이요 인색함으로나 억지로 하지 말지니<br className="hidden sm:inline" />
          하나님은 즐겨 내는 자를 사랑하시느니라”
        </p>
        <span className="text-[11px] text-slate-500 font-sans block mt-1">고린도후서 9장 7절</span>
      </div>

      {/* Primary Account Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {BANK_ACCOUNTS.map((acc, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200 hover:border-[#1E3A5F]/30 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#1E3A5F]/10 text-[#1E3A5F]">
                  {acc.badge}
                </span>
                <CreditCard className="w-5 h-5 text-slate-400" />
              </div>

              <h3 className="text-base font-bold text-slate-900 mb-1">
                {acc.type}
              </h3>

              <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-xs text-slate-500 mb-1">{acc.bank}</div>
                <div className="text-lg sm:text-xl font-bold text-[#1E3A5F] tracking-wide font-mono tabular-nums select-all">
                  {acc.accountNumber}
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  예금주: <strong className="text-slate-800">{acc.holder}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {acc.note}
              </p>
            </div>

            <button
              onClick={() => handleCopy(acc.accountNumber, acc.bank, index)}
              className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copiedIndex === index
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-[#1E3A5F] text-white hover:bg-[#152942]'
              }`}
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>복사되었습니다!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>계좌번호 복사하기</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Guidelines & Receipt Information */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-5 h-5 text-[#C5A059]" />
            <h4 className="text-base font-bold text-slate-900">
              입금자명 표기 방법 안내
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
            정확한 헌금 통계와 연말정산 기부금 영수증 발급을 위해 입금 시 
            <strong> [성함 + 헌금구분]</strong> 형식으로 표기해 주시기를 부탁드립니다.
          </p>
          <div className="space-y-1.5 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]"></span>
              <span><strong>십일조:</strong> 홍길동십일 (또는 홍길동11)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]"></span>
              <span><strong>감사헌금:</strong> 홍길동감사</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]"></span>
              <span><strong>선교 / 구제 / 건축:</strong> 홍길동선교 / 홍길동구제 / 홍길동건축</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F]"></span>
              <span>동명이인이 있는 경우 생년월일 앞 두 자리 병기 (예: 홍길동85감사)</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileCheck2 className="w-5 h-5 text-[#1E3A5F]" />
            <h4 className="text-base font-bold text-slate-900">
              기부금 영수증 (소득공제) 발급
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            대한예수교장로회 하남 시온성교회는 종교단체 기부금 공제 대상 기관입니다.
            연말정산을 위한 기부금 영수증이 필요하신 성도님은 아래 내용을 참고해 주세요.
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
            <li>교적부에 등록된 본인 또는 기본공제 대상 가족 명의로만 합산 발급 가능합니다.</li>
            <li>매년 12월 중순부터 교회 행정실 또는 온라인 신청을 통해 즉시 발급받으실 수 있습니다.</li>
            <li>문의: 교회 사무국 (02-488-8291)</li>
          </ul>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
