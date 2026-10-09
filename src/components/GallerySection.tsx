import React, { useState, useEffect } from 'react';
import { 
  Camera, Plus, Trash2, X, Maximize2, ChevronLeft, ChevronRight,
  Layers, Check, ExternalLink 
} from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  date: string;
  images: string[]; // 다중 이미지 배열 지원
  desc: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    category: 'worship',
    title: '시온성교회 창립 감사예배 및 오찬',
    date: '2026.10',
    images: [
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80'
    ],
    desc: '하나님의 은혜 가운데 드려진 창립 기념 감사예배와 성도들의 따뜻한 애찬 교제 현장입니다.',
  },
  {
    id: 'g2',
    category: 'nextgen',
    title: '다음세대 큐티스쿨 성경학교',
    date: '2026.09',
    images: [
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80'
    ],
    desc: '소예배실에서 진행된 유치부, 초등부, 중고등부 다음세대 큐티스쿨 말씀 훈련입니다.',
  },
  {
    id: 'g3',
    category: 'fellowship',
    title: '사랑방 목장 야외 나눔 모임',
    date: '2026.09',
    images: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'
    ],
    desc: '자연 속에서 삶과 기도를 나누는 따뜻한 사랑방 목장 공동체 모임입니다.',
  },
  {
    id: 'g4',
    category: 'worship',
    title: '수요행복예배 찬양과 기도',
    date: '2026.10',
    images: [
      'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80'
    ],
    desc: '말씀의 임재와 치유가 있는 은혜롭고 뜨거운 수요기도회 시간입니다.',
  },
];

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // 모달 슬라이더 상태
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItem | null>(null);
  const [currentPhotoIdx, setCurrentPhotoIdx] = useState<number>(0);

  // 관리자 폼 상태
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('fellowship');
  const [newImagesText, setNewImagesText] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Firestore DB 실시간 불러오기 (단일 imageUrl과 다중 images 하위 호환 처리)
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        if (!querySnapshot.empty) {
          const loaded: GalleryItem[] = querySnapshot.docs.map(d => {
            const data = d.data();
            let imagesArray: string[] = [];
            if (Array.isArray(data.images) && data.images.length > 0) {
              imagesArray = data.images;
            } else if (data.imageUrl) {
              imagesArray = [data.imageUrl];
            }

            return {
              id: d.id,
              category: data.category || 'fellowship',
              title: data.title || '',
              date: data.date || '',
              images: imagesArray,
              desc: data.desc || '',
            };
          });
          setItems(loaded);
        }
      } catch (err) {
        console.warn('갤러리 DB 조회 실패 또는 초기 상태:', err);
      }
    };

    fetchGallery();
  }, []);

  // 키보드 좌우 화살표로 사진 넘기기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedAlbum) return;
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'Escape') setSelectedAlbum(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAlbum, currentPhotoIdx]);

  const handleAdminAuth = () => {
    if (adminPassword.trim().toLowerCase() === 'zion1218') {
      setIsAdminAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const openAlbumModal = (album: GalleryItem) => {
    setSelectedAlbum(album);
    setCurrentPhotoIdx(0);
  };

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentPhotoIdx(prev => (prev === 0 ? selectedAlbum.images.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedAlbum) return;
    setCurrentPhotoIdx(prev => (prev === selectedAlbum.images.length - 1 ? 0 : prev + 1));
  };

  // 다중 링크 등록 처리 (줄바꿈 구분 파싱)
  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      alert('제목을 입력해 주세요.');
      return;
    }

    // 엔터/공백 기준 여러 줄 파싱
    const parsedImages = newImagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.startsWith('http://') || url.startsWith('https://'));

    if (parsedImages.length === 0) {
      alert('올바른 이미지 링크(URL)를 1개 이상 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newItemData = {
        title: newTitle.trim(),
        category: newCategory,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }).replace(' ', ''),
        images: parsedImages,
        imageUrl: parsedImages[0], // 하위 호환 대표 이미지
        desc: newDesc.trim() || '시온성교회 은혜로운 사역 현장입니다.',
      };

      try {
        const docRef = await addDoc(collection(db, 'gallery'), newItemData);
        setItems([{ id: docRef.id, ...newItemData }, ...items]);
      } catch {
        setItems([{ id: `g_${Date.now()}`, ...newItemData }, ...items]);
      }

      setNewTitle('');
      setNewImagesText('');
      setNewDesc('');
      setIsAdminOpen(false);
      alert(`총 ${parsedImages.length}장의 사진이 담긴 앨범이 성공적으로 등록되었습니다!`);
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 앨범 삭제
  const handleDeleteAlbum = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('이 앨범을 삭제하시겠습니까? (포함된 사진이 모두 삭제됩니다)')) return;

    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      console.warn('DB 삭제 실패:', err);
    }
    setItems(items.filter(item => item.id !== id));
    if (selectedAlbum?.id === id) {
      setSelectedAlbum(null);
    }
    alert('앨범이 삭제되었습니다.');
  };

  const filteredItems = activeTab === 'all' 
    ? items 
    : items.filter(item => item.category === activeTab);

  return (
    <section id="ministry" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* 상단 타이틀 & 관리자 버튼 */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-[#C49A45] tracking-widest uppercase">
              CHURCH LIFE & MEMORIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            시온성 갤러리 (교회 소식)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            은혜로운 예배와 사랑의 나눔, 아름다운 성도들의 믿음의 여정을 사진으로 전합니다.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-colors cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5 text-[#C49A45]" />
              <span>{isAdminAuthenticated ? '앨범 등록하기' : '갤러리 관리자'}</span>
            </button>
          </div>
        </div>

        {/* 카테고리 탭 필터 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'fellowship', label: '친교·봉사' },
            { id: 'worship', label: '예배·찬양' },
            { id: 'nextgen', label: '다음세대' },
            { id: 'mission', label: '성전 전경' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#1E293B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 갤러리 앨범 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => {
            const photoCount = item.images.length;
            const coverImage = item.images[0] || '';

            return (
              <div
                key={item.id}
                onClick={() => openAlbumModal(item)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src={coverImage}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* 사진 장수 뱃지 (여러 장일 때) */}
                    {photoCount > 1 && (
                      <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-sm">
                        <Layers className="w-3 h-3 text-amber-300" />
                        <span>{photoCount}장</span>
                      </div>
                    )}

                    {/* 호버 오버레이 */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C49A45]" />
                        <span>앨범 보기</span>
                      </span>
                    </div>

                    {/* 관리자 삭제 버튼 */}
                    {isAdminAuthenticated && (
                      <button
                        onClick={(e) => handleDeleteAlbum(item.id, e)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors cursor-pointer z-10"
                        title="앨범 삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span>{item.date}</span>
                      {photoCount > 1 && <span className="text-[#A27B2B] font-semibold">{photoCount}장의 사진</span>}
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#C49A45] transition-colors line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-slate-400 text-[11px] mt-10">
          * 교회 행사 및 은혜 사역의 사진은 교육위원국과 미디어팀으로 전달해 주시면 정기적으로 업데이트됩니다.
        </p>

        {/* ========================================================= */}
        {/* 1. 고급 앨범 슬라이더 모달 (좌우 넘김 + 하단 썸네일)     */}
        {/* ========================================================= */}
        {selectedAlbum && (
          <div 
            onClick={() => setSelectedAlbum(null)}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[94vh] border border-slate-800"
            >
              {/* 상단 헤더 */}
              <div className="p-3.5 sm:p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div>
                    <span className="text-[11px] text-amber-400 font-mono block">
                      {selectedAlbum.date} | 사진 {currentPhotoIdx + 1} / {selectedAlbum.images.length}
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-100">{selectedAlbum.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAlbum(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* 중앙 슬라이드 뷰어 영역 */}
              <div className="flex-1 bg-black relative flex items-center justify-center min-h-[40vh] sm:min-h-[55vh] max-h-[65vh] select-none">
                <img
                  src={selectedAlbum.images[currentPhotoIdx]}
                  alt={`${selectedAlbum.title} - ${currentPhotoIdx + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] w-auto max-w-full object-contain"
                />

                {/* 2장 이상일 때 좌우 화살표 */}
                {selectedAlbum.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer border border-white/10"
                      aria-label="이전 사진"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer border border-white/10"
                      aria-label="다음 사진"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* 하단 썸네일 미리보기 바 (사진이 2장 이상일 때) */}
              {selectedAlbum.images.length > 1 && (
                <div className="bg-slate-950 p-2 sm:p-3 border-t border-slate-800 overflow-x-auto flex items-center gap-2">
                  {selectedAlbum.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPhotoIdx(idx)}
                      className={`h-12 sm:h-14 aspect-[4/3] rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        currentPhotoIdx === idx 
                          ? 'border-[#C49A45] scale-105 shadow-md' 
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt="썸네일" 
                        referrerPolicy="no-referrer" 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* 설명 영역 */}
              {selectedAlbum.desc && (
                <div className="p-3.5 sm:p-4 bg-slate-900 text-slate-300 text-xs sm:text-sm border-t border-slate-800">
                  <p className="leading-relaxed">{selectedAlbum.desc}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* 2. 다중 이미지 등록 관리자 모달 (여러 줄 입력)          */}
        {/* ========================================================= */}
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#C49A45]" />
                  <span>시온성 갤러리 앨범 등록 (여러 장)</span>
                </h3>
                <button onClick={() => setIsAdminOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer font-bold text-sm">닫기</button>
              </div>

              {!isAdminAuthenticated ? (
                <div className="space-y-3 py-4">
                  <p className="text-xs text-slate-600">관리자 비밀번호를 입력해 주세요.</p>
                  <input
                    type="password"
                    placeholder="비밀번호 입력"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAdminAuth();
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                  <button
                    onClick={handleAdminAuth}
                    className="w-full py-2.5 rounded-xl bg-[#111827] text-white font-bold text-xs cursor-pointer hover:bg-slate-800"
                  >
                    로그인 확인
                  </button>
                </div>
              ) : (
                <form onSubmit={handleLinkSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">카테고리</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="fellowship">친교·봉사</option>
                      <option value="worship">예배·찬양</option>
                      <option value="nextgen">다음세대</option>
                      <option value="mission">성전 전경</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">행사 / 앨범 제목</label>
                    <input
                      type="text"
                      required
                      placeholder="예: 2026 추석 청년 목장 모임"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        사진 이미지 링크 목록 (엔터로 여러 장 입력)
                      </label>
                      <span className="text-[11px] text-[#A27B2B] font-semibold">
                        줄바꿈으로 구분
                      </span>
                    </div>
                    <textarea
                      rows={5}
                      required
                      placeholder={`https://postfiles.pstatic.net/... (사진1 주소)\nhttps://postfiles.pstatic.net/... (사진2 주소)\nhttps://postfiles.pstatic.net/... (사진3 주소)`}
                      value={newImagesText}
                      onChange={(e) => setNewImagesText(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono resize-none leading-relaxed"
                    />
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                      * 블로그 사진 위에서 <strong>'이미지 주소 복사'</strong>를 한 뒤, 엔터(줄바꿈)를 치면서 붙여넣으시면 하나의 앨범으로 묶여 <strong>좌우 슬라이더</strong>로 재생됩니다.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">상세 설명 (선택)</label>
                    <textarea
                      rows={2}
                      placeholder="행사에 대한 짧은 설명이나 은혜의 나눔을 적어주세요."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-xl bg-[#C49A45] hover:bg-[#A27B2B] text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                  >
                    앨범 등록 완료 (즉시 게시)
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
