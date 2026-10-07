import React, { useState } from 'react';
import { Bus, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const WorshipTableSection: React.FC = () => {
  // 모바일 탭: 주일예배 vs 주중예배
  const [mobileTab, setMobileTab] = useState<'sunday' | 'weekday'>('sunday');

  const sundayRows = [
    { name: '주일 1부 예배', time: '주일 오전 10:00', place: '본당 대예배실' },
    { name: '주일 2부 예배', time: '주일 오전 11:20', place: '본당 대예배실' },
    { name: '다음세대 예배 (큐티스쿨)', time: '주일 오후 12:00', place: '3층 소예배실' },
    { name: '주일 양육반 (10주 과정)', time: '주일 오후 01:00', place: '각 교육실' },
    { name: '목장 모임 (소그룹 나눔)', time: '주일 오후 02:30', place: '각 목장 처소' },
  ];

  const weekdayRows = [
    { name: '수요 행복예배', time: '매주 수요일 저녁 8:00', place: '본당 대예배실' },
    { name: '금요 기도회', time: '매주 금요일 밤 8:00', place: '본당 대예배실' },
    { name: '화목 기도회', time: '화-목 저녁 밤 8:00', place: '본당 대예배실' },
  ];

  const allRows = [...sundayRows, ...weekdayRows];

  return (
    <section id="worship" className="py-10 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Title Wrap */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b-2 border-[#1F2937] pb-3 mb-6 sm:mb-8 gap-2">
        <div>
          <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
            Worship Schedule
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937] tracking-tight">
            01 예배와 모임 안내
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium">
          영과 진리로 드려지는 은혜와 회복의 예배
        </p>
      </div>

      {/* ========================================================= */}
      {/* MOBILE-ONLY VIEW (모바일 전용 탭 전환 카드 뷰)               */}
      {/* ========================================================= */}
      <div className="block md:hidden mb-8">
        {/* 탭 버튼 */}
        <div className="flex rounded-xl bg-slate-100 p-1 mb-4 border border-slate-200">
          <button
            onClick={() => setMobileTab('sunday')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileTab === 'sunday'
                ? 'bg-white text-[#1F2937] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>주일 예배·모임 ({sundayRows.length})</span>
          </button>
          <button
            onClick={() => setMobileTab('weekday')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              mobileTab === 'weekday'
                ? 'bg-white text-[#1F2937] shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>주중 기도회·예배 ({weekdayRows.length})</span>
          </button>
        </div>

        {/* 리스트 카드 */}
        <div className="space-y-2.5">
          {(mobileTab === 'sunday' ? sundayRows : weekdayRows).map((row, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <strong className="text-sm font-bold text-[#1F2937] block">
                  {row.name}
                </strong>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{row.place}</span>
                </div>
              </div>
              <div className="text-right shrink-0 pl-3">
                <span className="text-xs font-bold text-[#A27B2B] bg-amber-50 px-2 py-1 rounded-md border border-amber-200/60 inline-block font-mono">
                  {row.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP-ONLY VIEW (PC 환경 정갈한 테이블 뷰)                  */}
      {/* ========================================================= */}
      <div className="hidden md:block bg-white rounded-2xl overflow-hidden shadow-xs border border-[#E5E7EB] mb-8">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#F8F9FA] text-[#1F2937] font-bold text-sm border-b border-[#E5E7EB]">
              <th className="py-4 px-6 w-[40%] font-semibold text-slate-700">예배 및 모임명</th>
              <th className="py-4 px-6 w-[30%] font-semibold text-slate-700">시간</th>
              <th className="py-4 px-6 w-[30%] font-semibold text-slate-700">장소</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] text-sm">
            {allRows.map((row, idx) => {
              const isSundayMain = row.name.includes('1부') || row.name.includes('2부');
              return (
                <tr
                  key={idx}
                  className={`hover:bg-[#F9FAFB] transition-colors ${
                    isSundayMain ? 'bg-amber-50/20' : ''
                  }`}
                >
                  <td className="py-4 px-6 font-bold text-[#1F2937]">
                    <span>{row.name}</span>
                  </td>
                  <td className="py-4 px-6 font-semibold text-[#A27B2B] tabular-nums whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    {row.place}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Shuttle Bus Information */}
      <div id="worship-bus" className="p-4 sm:p-6 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#C49A45] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Bus className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <strong className="text-sm sm:text-base font-bold text-[#1F2937] block">
              주일 교회 차량(셔틀버스) 운행 안내
            </strong>
            <p className="text-xs text-slate-500 mt-0.5">
              서하남 및 주요 거점별 탑승 위치와 운행 시간 문의
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto shrink-0">
          <a
            href={`tel:${CHURCH_INFO.shuttlePhone}`}
            className="w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1F2937] hover:bg-[#111827] active:scale-98 transition-all flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>차량 문의: {CHURCH_INFO.shuttlePhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
