import React, { useState } from 'react';
import { MapPin, Navigation, CreditCard, Bus, Car, Phone, Copy, Check, ExternalLink } from 'lucide-react';
import { CHURCH_INFO, BANK_ACCOUNTS } from '../data/churchData';

export const LocationSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CHURCH_INFO.address} ${CHURCH_INFO.addressDetail}`);
    setCopiedAddress(true);
    setToastMessage('교회 주소가 복사되었습니다.');
    setTimeout(() => setCopiedAddress(false), 2000);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyAccount = () => {
    const acc = BANK_ACCOUNTS[0].accountNumber;
    navigator.clipboard.writeText(acc.replace(/-/g, ''));
    setCopiedAccount(true);
    setToastMessage(`신협 계좌번호가 복사되었습니다 (${acc})`);
    setTimeout(() => setCopiedAccount(false), 2000);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const encodedAddress = encodeURIComponent(`${CHURCH_INFO.name}`);
  const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodedAddress}`;
  const tmapUrl = `https://tmap.co.kr`;

  return (
    <section id="section4" className="py-24 sm:py-28 px-4 sm:px-6 bg-[#F8FAFC]">
      <div className="max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C5A059] font-bold text-xs sm:text-sm tracking-[1.5px] uppercase mb-2">
            Location & Info
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A365D] mb-3">
            오시는 길 & 안내
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            하남 시온성교회의 문은 언제나 활짝 열려 있습니다.
          </p>
        </div>

        {/* 3 Key Info Grid Card */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Item 1: Church Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#1A365D] flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <strong className="block text-[#1A365D] text-base font-bold mb-1">
                  교회 주소
                </strong>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  {CHURCH_INFO.address}
                  <br />
                  <span className="text-xs text-slate-500">{CHURCH_INFO.addressDetail}</span>
                </p>
                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1A365D] bg-[#1A365D]/10 hover:bg-[#1A365D]/15 transition-colors cursor-pointer"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#1A365D]" />
                      <span>주소 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Item 2: Navigation Info */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#1A365D] flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <strong className="block text-[#1A365D] text-base font-bold mb-1">
                  내비게이션 안내
                </strong>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  티맵, 카카오내비, 네이버지도에서
                  <br />
                  <strong className="text-slate-900">'하남 시온성교회'</strong> 검색
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <a
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                  >
                    <span>네이버지도</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={kakaoMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors inline-flex items-center gap-1"
                  >
                    <span>카카오맵</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  <a
                    href={tmapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
                  >
                    <span>티맵</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Item 3: Online Offering */}
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#F1F5F9] text-[#1A365D] flex items-center justify-center shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <strong className="block text-[#1A365D] text-base font-bold mb-1">
                  온라인 헌금 계좌
                </strong>
                <p className="text-[#64748B] text-sm leading-relaxed mb-3">
                  신협 <strong className="text-slate-900 font-mono">131-020-284906</strong>
                  <br />
                  <span className="text-xs text-slate-500">(예금주: 대한예수교장로회 시온성교회)</span>
                </p>
                <button
                  onClick={handleCopyAccount}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#1A365D] hover:bg-[#0F172A] transition-colors cursor-pointer shadow-xs"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>복사 완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>계좌 복사하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shuttle Bus Highlight Callout */}
        <div className="mb-10 p-6 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A365D] uppercase tracking-wider block">
                Shuttle Bus Service
              </span>
              <strong className="text-base sm:text-lg font-bold text-slate-900 block mt-0.5">
                개롱, 거여, 마천은 교회 셔틀버스가 운영하고 있습니다.
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                자가용 없이도 안전하고 편안하게 예배에 참석하실 수 있습니다. 탑승 시간 및 정류장 문의를 환영합니다.
              </p>
            </div>
          </div>
          <a
            href={`tel:${CHURCH_INFO.mobile}`}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-[#FEE500] hover:bg-[#FADA0A] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>셔틀 문의: {CHURCH_INFO.mobile}</span>
          </a>
        </div>

        {/* Transportation Details (By Car & Public Transit) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* By Car */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#1A365D]">자가용 이용 시</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5 list-disc pl-4 leading-relaxed">
              <li><strong>서하남IC 진출:</strong> 수도권제1순환고속도로 서하남IC에서 광암동 방면 약 3분 소요</li>
              <li><strong>송파·강동 방면:</strong> 올림픽선수촌사거리에서 서하남로를 따라 광암동 방향 직진</li>
              <li><strong>주차장 완비:</strong> 교회 주차 봉사팀 안내에 따라서 주차하실 수 있습니다.</li>
              <li className="text-[#1A365D] font-semibold">자가용 외에도 개롱, 거여, 마천은 교회 셔틀버스가 운영하고 있습니다.</li>
            </ul>
          </div>

          {/* By Public Transit */}
          <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center">
                <Bus className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#1A365D]">대중교통 이용 시</h4>
            </div>
            <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5 list-disc pl-4 leading-relaxed">
              <li><strong>교회 셔틀버스:</strong> 개롱, 거여, 마천 방면 운행 (문의: {CHURCH_INFO.mobile})</li>
              <li><strong>시내버스 노선:</strong> 30-5번, 30번, 87번 버스 탑승 후 <strong>'광암동'</strong> 정류장 하차</li>
              <li><strong>지하철 환승:</strong> 5호선 올림픽공원역/강동역, 9호선 둔촌오륜역에서 시내버스 환승</li>
              <li>정류장 하차 후 서하남로 278-30 방면 도보 약 2~3분 거리에 위치해 있습니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0F172A] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
