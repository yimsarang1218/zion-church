import React, { useState } from 'react';
import { MapPin, CreditCard, Navigation, Copy, Check, ExternalLink, Bus, Car, Phone } from 'lucide-react';
import { CHURCH_INFO, BANK_ACCOUNTS } from '../data/churchData';

export const LocationAndOffering: React.FC = () => {
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
    <section id="location" className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Title */}
      <div className="border-b-2 border-[#1F2937] pb-3 mb-8">
        <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
          Location & Offering
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
          오시는 길 & 안내
        </h2>
      </div>

      {/* Two Large Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Card 1: 교회 위치 */}
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C49A45]" />
              <span>교회 위치</span>
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              <strong className="text-base text-[#111827] block mb-1">
                {CHURCH_INFO.address} {CHURCH_INFO.addressDetail}
              </strong>
              티맵, 카카오내비, 네이버지도에서 <strong>'하남 시온성교회'</strong>를 검색하시면 편리하게 오실 수 있습니다.
            </p>

            {/* Navigation links & Address copy */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <a
                href={naverMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
              >
                <span>네이버지도</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={kakaoMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors inline-flex items-center gap-1"
              >
                <span>카카오맵</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={tmapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors inline-flex items-center gap-1"
              >
                <span>티맵</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <button
            onClick={handleCopyAddress}
            className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1F2937] bg-white border border-[#E5E7EB] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            {copiedAddress ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">주소 복사됨</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>주소 복사하기</span>
              </>
            )}
          </button>
        </div>

        {/* Card 2: 온라인 헌금 계좌 */}
        <div id="offering" className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-[#1F2937] mb-3 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#C49A45]" />
              <span>온라인 헌금 계좌</span>
            </h4>
            <div className="mb-4">
              <div className="text-xs text-slate-500 mb-0.5">신협 대표 계좌</div>
              <strong className="text-xl sm:text-2xl font-extrabold text-[#A27B2B] block font-mono tracking-tight select-all">
                신협 131-020-284906
              </strong>
              <span className="text-xs text-slate-600 block mt-1">
                (예금주: 대한예수교장로회 시온성교회)
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              * 입금 시 <strong>'성명+헌금종류'</strong>를 표기해 주세요 (예: 홍길동십일조, 홍길동감사, 홍길동선교)
            </p>
          </div>

          <button
            onClick={handleCopyAccount}
            className="self-start inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1F2937] hover:bg-[#111827] transition-colors cursor-pointer shadow-xs"
          >
            {copiedAccount ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>계좌번호 복사완료</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>신협 계좌번호 복사하기</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Shuttle Bus & Transit Guide Box */}
      <div className="bg-white rounded-xl p-6 border border-[#E5E7EB] grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-600">
        <div>
          <div className="flex items-center gap-2 font-bold text-[#1F2937] mb-1.5">
            <Bus className="w-4 h-4 text-[#C49A45]" />
            <span>교회 셔틀버스 (개롱·거여·마천)</span>
          </div>
          <p className="leading-relaxed">
            셔틀: <a href="tel:010-4707-5395" className="text-slate-900 font-bold hover:underline">010-4707-5395</a><br />
            탑승문의·탑승안내 : <strong className="text-slate-900">010-4707-5395</strong>
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-[#1F2937] mb-1.5">
            <Car className="w-4 h-4 text-[#C49A45]" />
            <span>서하남IC 3분 거리 / 주차 안내</span>
          </div>
          <p className="leading-relaxed">
            서하남IC에서 차량 3분 거리이며, 교회 주차 봉사팀 안내에 따라서 주차하실 수 있습니다.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-bold text-[#1F2937] mb-1.5">
            <Phone className="w-4 h-4 text-[#C49A45]" />
            <span>전화 상담 & 교회 문의</span>
          </div>
          <p className="leading-relaxed">
            전화 상담: <a href="tel:010-2741-2938" className="text-slate-900 font-bold hover:underline">010-2741-2938</a><br />
            교회 대표전화: 02-408-1191 | 팩스: 02-408-2058
          </p>
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-5 py-3 rounded-full text-xs sm:text-sm font-medium shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </section>
  );
};
