import React, { useState, useEffect, useCallback } from 'react';
import { Camera, ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react';
import { GALLERY_ITEMS, GalleryItem } from '../data/churchData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = [
    { key: 'all', label: '전체 보기' },
    { key: 'worship', label: '예배·찬양' },
    { key: 'youth', label: '다음세대' },
    { key: 'fellowship', label: '친교·봉사' },
    { key: 'sanctuary', label: '성전 전경' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const handleOpenLightbox = (item: GalleryItem) => {
    const idx = filteredItems.findIndex((it) => it.id === item.id);
    if (idx !== -1) {
      setActivePhotoIndex(idx);
    }
  };

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredItems.length);
  }, [activePhotoIndex, filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length);
  }, [activePhotoIndex, filteredItems.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  const currentItem = activePhotoIndex !== null ? filteredItems[activePhotoIndex] : null;

  return (
    <section id="gallery" className="py-24 sm:py-28 px-4 sm:px-6 bg-white border-b border-slate-200">
      <div className="max-w-[1140px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-[#C5A059] font-bold text-xs sm:text-sm tracking-[1.5px] uppercase mb-2">
            Church Life & Memories
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#1A365D] mb-3">
            시온성 갤러리 (교회 소식)
          </h2>
          <p className="text-[#64748B] text-sm sm:text-base max-w-[600px] mx-auto leading-relaxed">
            은혜로운 예배와 사랑의 나눔, 아름다운 성도들의 믿음의 여정을 사진으로 전합니다.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setSelectedCategory(cat.key);
                setActivePhotoIndex(null);
              }}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                selectedCategory === cat.key
                  ? 'bg-[#1A365D] text-white shadow-xs'
                  : 'bg-[#F8FAFC] text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(item)}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 border border-slate-200 transition-all duration-300 group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.classList.add('bg-gradient-to-br', 'from-slate-200', 'to-slate-300', 'flex', 'items-center', 'justify-center');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/90 text-slate-800 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{item.date}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#C5A059] font-semibold">
                    {item.category === 'worship' && '예배 및 찬양'}
                    {item.category === 'youth' && '교회학교 / 청년부'}
                    {item.category === 'fellowship' && '친교 및 사역'}
                    {item.category === 'sanctuary' && '성전 모습'}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1A365D] transition-colors leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Notice for submitting photos */}
        <div className="mt-12 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5">
          <Camera className="w-4 h-4 text-slate-400" />
          <span>교회 행사 및 모임 사진은 교역자실 또는 미디어팀으로 전달해 주시면 정기적으로 업데이트됩니다.</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {currentItem && activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-150">
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-50"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="이전 사진"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            aria-label="다음 사진"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[72vh] w-auto overflow-hidden rounded-xl shadow-2xl bg-black/50">
              <img
                src={currentItem.imageUrl}
                alt={currentItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[72vh] max-w-full object-contain mx-auto"
              />
            </div>

            <div className="text-center text-white mt-4 max-w-xl px-4">
              <div className="text-xs text-[#C5A059] font-medium mb-1">
                {activePhotoIndex + 1} / {filteredItems.length} · {currentItem.date}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {currentItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {currentItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
