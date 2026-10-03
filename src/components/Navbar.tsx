import React, { useState } from 'react';
import { Church, Youtube, Menu, X, FileText, MessageCircle } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface NavbarProps {
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBulletin, onOpenPrayer }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '교회소개', href: '#section1' },
    { label: '예배안내', href: '#section2' },
    { label: '온라인예배', href: '#section3' },
    { label: '시온성 갤러리', href: '#gallery' },
    { label: '오시는길 & 헌금', href: '#section4' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0F172A]/80 backdrop-blur-[15px] border-b border-white/10 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#section0"
          className="flex items-center gap-2.5 text-white no-underline text-lg sm:text-xl font-bold tracking-tight hover:opacity-95 transition-opacity"
        >
          <Church className="w-6 h-6 text-[#C5A059]" />
          <div className="flex flex-col">
            <span className="leading-tight">하남 시온성교회</span>
            <span className="text-[10px] text-slate-400 font-medium tracking-normal -mt-0.5">
              대한예수교장로회(합동)
            </span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 list-none">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/85 hover:text-[#C5A059] font-medium text-[0.95rem] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenBulletin}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
            title="금주의 주보"
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>주보</span>
          </button>

          <button
            onClick={onOpenPrayer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white/90 bg-white/10 hover:bg-white/15 border border-white/15 transition-colors cursor-pointer"
            title="온라인 상담 및 기도제목"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>상담·기도</span>
          </button>

          <a
            href={CHURCH_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#FF0000] hover:bg-[#D90000] text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-[1.03] cursor-pointer"
          >
            <Youtube className="w-3.5 h-3.5 fill-white" />
            <span>유튜브 바로가기</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <a
            href={CHURCH_INFO.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 text-[#FF0000] bg-white/10 rounded-full"
            aria-label="유튜브 바로가기"
          >
            <Youtube className="w-5 h-5 fill-[#FF0000]" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-white/90 hover:text-white rounded-lg transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F172A]/95 backdrop-blur-xl border-t border-white/10 px-6 py-5 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBulletin();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-white/10 rounded-xl"
            >
              <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
              금주의 주보
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPrayer();
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-white bg-white/10 rounded-xl"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#C5A059]" />
              상담 및 기도
            </button>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-lg text-sm font-medium text-white/85 hover:text-[#C5A059] hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-white/10">
            <a
              href={CHURCH_INFO.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#FF0000] text-white py-2.5 rounded-xl text-sm font-semibold shadow-md"
            >
              <Youtube className="w-4 h-4 fill-white" />
              유튜브 채널 구독 및 실시간 예배
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
