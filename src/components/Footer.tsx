import React from 'react';
import { Church, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0F172A] text-[#94A3B8] py-16 px-4 sm:px-8 border-t border-white/5 text-center text-sm">
      <div className="max-w-[1140px] mx-auto space-y-3">
        {/* Brand */}
        <div className="flex items-center justify-center gap-2 text-white font-bold text-base sm:text-lg">
          <Church className="w-5 h-5 text-[#C5A059]" />
          <span>{CHURCH_INFO.fullName}</span>
        </div>

        {/* Address and YouTube */}
        <p className="text-xs sm:text-sm text-slate-300">
          주소: {CHURCH_INFO.address} {CHURCH_INFO.addressDetail} | 유튜브: {CHURCH_INFO.youtubeHandle}
        </p>

        {/* Contacts & Email */}
        <p className="text-xs text-slate-400">
          전화: {CHURCH_INFO.phone} | 상담·셔틀: {CHURCH_INFO.mobile} | 이메일: <a href={`mailto:${CHURCH_INFO.email}`} className="text-slate-300 hover:text-[#C5A059] transition-colors">{CHURCH_INFO.email}</a>
        </p>

        <p className="text-xs text-slate-400">
          온라인 헌금: 신협 131-020-284906 (예금주: 대한예수교장로회 시온성교회)
        </p>

        {/* Copyright */}
        <div className="pt-6 mt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <span>Copyright © 2026 하남 시온성교회. All Rights Reserved.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>맨 위로 가기</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
