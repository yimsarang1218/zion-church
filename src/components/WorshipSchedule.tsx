import React from 'react';
import { Sun, Moon, Users, MapPin, Radio, Bus, Phone } from 'lucide-react';
import { WORSHIP_SCHEDULES, CHURCH_INFO } from '../data/churchData';

export const WorshipSchedule: React.FC = () => {
  return (
    <section id="section2" className="py-24 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
      <div className="max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-[#C5A059] font-bold text-xs sm:text-sm tracking-[1.5px] uppercase mb-2">
            Worship Times
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A365D] mb-3">
            예배 및 모임 안내
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            하나님을 만나는 거룩한 예배의 자리에 여러분을 정중히 초대합니다.
          </p>
        </div>

        {/* 3 Schedule Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Card 1: Sunday */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center">
                <Sun className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#1A365D]/10 text-[#1A365D]">
                본당 2층
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-1">
              주일 예배
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              1부(10:00)와 2부(11:40)는 유튜브 실시간 생중계됩니다
            </p>

            <ul className="divide-y divide-dashed divide-slate-200 flex-1">
              {WORSHIP_SCHEDULES.sunday.map((item) => (
                <li key={item.name} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-800">
                    <span>{item.name}</span>
                    {item.isLive && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                        <Radio className="w-2.5 h-2.5 animate-pulse" /> 생중계
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-[#1A365D] tabular-nums whitespace-nowrap">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Weekday */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center">
                <Moon className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#1A365D]/10 text-[#1A365D]">
                본당 2층
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-1">
              주중 기도회 & 예배
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              말씀 강해와 뜨거운 기도로 성령 충만을 경험하는 자리
            </p>

            <ul className="divide-y divide-dashed divide-slate-200 flex-1">
              {WORSHIP_SCHEDULES.weekday.map((item) => (
                <li key={item.name} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">
                    {item.name}
                  </span>
                  <span className="text-sm font-bold text-[#1A365D] tabular-nums whitespace-nowrap text-right">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: 큐티스쿨 */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div className="w-14 h-14 rounded-xl bg-[#EEF2F6] text-[#1A365D] flex items-center justify-center">
                <Users className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-50 text-[#C5A059]">
                3층 소예배실
              </span>
            </div>
            <h3 className="text-xl font-bold text-[#1A365D] mb-1">
              교회학교 큐티스쿨
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              말씀 묵상과 나눔으로 믿음의 거목으로 자라나는 다음세대
            </p>

            <ul className="divide-y divide-dashed divide-slate-200 flex-1">
              {(WORSHIP_SCHEDULES.nextGen || []).map((item: any) => (
                <li key={item.name} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold text-slate-800 block">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {item.target || '어린이 및 청소년'} (3층)
                    </span>
                  </div>
                  <span className="text-sm font-bold text-[#1A365D] tabular-nums whitespace-nowrap">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Shuttle Bus Highlight Callout */}
        <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#C5A059] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Bus className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#1A365D] uppercase tracking-wider block">
                Church Shuttle Bus Service
              </span>
              <strong className="text-base sm:text-lg font-bold text-slate-900 block mt-0.5">
                개롱, 거여, 마천은 교회 셔틀버스가 운영하고 있습니다.
              </strong>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                주일 예배에 편안하게 참석하실 수 있도록 셔틀버스를 운행하오니 탑승을 원하시는 성도님은 미리 연락 바랍니다.
              </p>
            </div>
          </div>
          <a
            href={`tel:${CHURCH_INFO.mobile}`}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-900 bg-[#FEE500] hover:bg-[#FADA0A] transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4" />
            <span>셔틀 탑승 문의: {CHURCH_INFO.mobile}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
