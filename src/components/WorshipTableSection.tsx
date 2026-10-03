import React from 'react';
import { ArrowUpRight, Radio, Bus, Phone } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const WorshipTableSection: React.FC = () => {
  const worshipRows = [
    { name: '주일 1부 예배', time: '오전 10:00', place: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '주일 2부 예배', time: '오전 11:20', place: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '큐티스쿨 (교회학교)', time: '주일 오후 12:00', place: '3층 소예배실 (어린이 & 청소년)', isLive: false },
    { name: '주일 양육반(10주 과정)', time: '주일 오후 01:00', place: '소그룹실', isLive: false },
    { name: '사랑방 모임', time: '주일 오후 02:30', place: '본당 2층 및 각 모임실', isLive: false },
    { name: '수요행복예배', time: '수요일 오후 08:00', place: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '금요예배', time: '금요일 오후 08:00', place: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '저녁 기도회', time: '화, 목 오후 08:00', place: '본당 2층', isLive: false },
  ];

  return (
    <section id="worship" className="py-12 sm:py-16 max-w-[1280px] mx-auto px-4 sm:px-6">
      {/* Title Wrap */}
      <div className="flex justify-between items-end border-b-2 border-[#1F2937] pb-3 mb-8">
        <div>
          <span className="text-xs font-bold text-[#C49A45] tracking-wider uppercase block mb-1">
            Service Schedule
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2937]">
            예배 시간 안내
          </h2>
        </div>
        <a
          href={CHURCH_INFO.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-semibold text-[#6B7280] hover:text-[#C49A45] flex items-center gap-1 transition-colors"
        >
          <span>실시간 생중계: 주일 1부 I 2부 · 수요행복예배 · 금요예배</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Worship Table */}
      <div className="bg-white rounded-xl overflow-hidden shadow-xs border border-[#E5E7EB] mb-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F3F4F6] text-[#1F2937] font-bold text-xs sm:text-sm border-b border-[#E5E7EB]">
                <th className="py-3.5 px-4 sm:px-6 w-[35%]">예배 구분</th>
                <th className="py-3.5 px-4 sm:px-6 w-[30%]">예배 시간</th>
                <th className="py-3.5 px-4 sm:px-6 w-[35%]">예배 장소 및 송출</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] text-xs sm:text-sm">
              {worshipRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F9FAFB] transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#1F2937] flex items-center gap-2">
                    <span>{row.name}</span>
                    {row.isLive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-[#E11D48] px-1.5 py-0.5 rounded shadow-2xs">
                        <Radio className="w-2.5 h-2.5 animate-pulse" /> 생중계
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-bold text-[#A27B2B] tabular-nums whitespace-nowrap">
                    {row.time}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-slate-600">
                    {row.place}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shuttle Bus Highlight Callout */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-[#C49A45] text-white flex items-center justify-center shrink-0">
            <Bus className="w-6 h-6" />
          </div>
          <div>
            <strong className="text-sm sm:text-base font-bold text-[#1F2937] block">
              개롱, 거여, 마천은 교회 셔틀버스가 운영하고 있습니다.
            </strong>
            <p className="text-xs text-slate-500 mt-0.5">
              주일 예배 참석을 위해 셔틀버스를 운행 중입니다. 노선 및 탑승 시간을 친절히 안내해 드립니다.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
          <a
            href={`tel:${CHURCH_INFO.shuttlePhone}`}
            className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#1F2937] hover:bg-[#111827] transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>탑승안내·문의: {CHURCH_INFO.shuttlePhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
