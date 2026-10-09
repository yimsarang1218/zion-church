import React, { useState, useEffect } from 'react';
import { Camera, Plus, Trash2, X, Maximize2, Link as LinkIcon } from 'lucide-react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

interface GalleryItem {
  id: string;
  category: string;
  title: string;
  date: string;
  imageUrl: string;
  desc: string;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    category: 'worship',
    title: '시온성교회 창립 감사예배 및 오찬',
    date: '2026.10',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    desc: '하나님의 은혜 가운데 드려진 창립 기념 감사예배와 성도들의 따뜻한 애찬 교제 현장입니다.',
  },
  {
    id: 'g2',
    category: 'nextgen',
    title: '다음세대 큐티스쿨 성경학교',
    date: '2026.09',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    desc: '소예배실에서 진행된 유치부, 초등부, 중고등부 다음세대 큐티스쿨 말씀 훈련입니다.',
  },
  {
    id: 'g3',
    category: 'fellowship',
    title: '사랑방 목장 야외 나눔 모임',
    date: '2026.09',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    desc: '자연 속에서 삶과 기도를 나누는 따뜻한 사랑방 목장 공동체 모임입니다.',
  },
  {
    id: 'g4',
    category: 'worship',
    title: '수요행복예배 찬양과 기도',
    date: '2026.10',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
    desc: '말씀의 임재와 치유가 있는 은혜롭고 뜨거운 수요기도회 시간입니다.',
  },
];

export const GallerySection: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(DEFAULT_GALLERY);
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // 사진 확대 모달 상태
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  // 관리자 모달 및 링크 등록 상태
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('fellowship');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Firestore DB에서 실시간 갤러리 목록 불러오기
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'gallery'));
        if (!querySnapshot.empty) {
          const loaded: GalleryItem[] = querySnapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<GalleryItem, 'id'>)
          }));
          setItems(loaded);
        }
      } catch (err) {
        console.warn('갤러리 DB 조회 실패 또는 초기 상태:', err);
      }
    };

    fetchGallery();
  }, []);

  const handleAdminAuth = () => {
    if (adminPassword.trim().toLowerCase() === 'zion1218') {
      setIsAdminAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 사진 링크 등록 (Firestore addDoc)
  const handleLinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newImageUrl.trim()) {
      alert('제목과 사진 이미지 주소(URL)를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newItemData = {
        title: newTitle.trim(),
        category: newCategory,
        date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit' }).replace(' ', ''),
        imageUrl: newImageUrl.trim(),
        desc: newDesc.trim() || '시온성교회 은혜로운 사역 현장입니다.',
      };

      try {
        const docRef = await addDoc(collection(db, 'gallery'), newItemData);
        setItems([{ id: docRef.id, ...newItemData }, ...items]);
      } catch {
        setItems([{ id: `g_${Date.now()}`, ...newItemData }, ...items]);
      }

      setNewTitle('');
      setNewImageUrl('');
      setNewDesc('');
      setIsAdminOpen(false);
      alert('사진이 성공적으로 등록되었습니다!');
    } catch (error) {
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePhoto = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm('정말 이 사진을 삭제하시겠습니까?')) return;

    try {
      await deleteDoc(doc(db, 'gallery', id));
    } catch (err) {
      console.warn('DB 삭제 실패:', err);
    }
    setItems(items.filter(item => item.id !== id));
    if (selectedPhoto?.id === id) {
      setSelectedPhoto(null);
    }
    alert('사진이 삭제되었습니다.');
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
              <span>{isAdminAuthenticated ? '사진 등록하기' : '갤러리 관리자'}</span>
            </button>
          </div>
        </div>

        {/* 카테고리 탭 필터 */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10">
          {[
            { id: 'all', label: '전체 보기' },
            { id: 'worship', label: '예배·찬양' },
            { id: 'nextgen', label: '다음세대' },
            { id: 'fellowship', label: '친교·봉사' },
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

        {/* 갤러리 사진 카드 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  {/* referrerPolicy 추가로 네이버 블로그 등 외부 이미지 차단 우회 */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-white/90 text-slate-900 text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C49A45]" />
                      <span>크게 보기</span>
                    </span>
                  </div>

                  {/* 관리자 삭제 버튼 */}
                  {isAdminAuthenticated && (
                    <button
                      onClick={(e) => handleDeletePhoto(item.id, e)}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-rose-600 text-white transition-colors cursor-pointer z-10"
                      title="사진 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="p-4 space-y-1.5">
                  <span className="text-[11px] font-mono text-slate-400 block">{item.date}</span>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-[#C49A45] transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-400 text-[11px] mt-10">
          * 교회 행사 및 은혜 사역의 사진은 교육위원국과 미디어팀으로 전달해 주시면 정기적으로 업데이트됩니다.
        </p>

        {/* 1. 사진 크게 보기 모달 (라이트박스) */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-amber-400 font-mono block">{selectedPhoto.date}</span>
                  <h3 className="font-extrabold text-base sm:text-lg">{selectedPhoto.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 bg-black overflow-hidden flex items-center justify-center max-h-[65vh]">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-auto max-w-full object-contain"
                />
              </div>

              <div className="p-4 bg-white text-slate-700 text-xs sm:text-sm border-t border-slate-200">
                <p className="leading-relaxed">{selectedPhoto.desc}</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. 링크 등록 관리자 모달 */}
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-[#C49A45]" />
                  <span>시온성 갤러리 사진 등록</span>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">사진 제목</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      사진 이미지 링크 (URL)
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://... (네이버 블로그 사진 우클릭 '이미지 주소 복사')"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      * <strong>주의</strong>: 블로그 글 주소(`blog.naver.com/...`)가 아니라, 블로그 본문 사진 위에서 마우스 우클릭 후 <strong>'이미지 주소 복사'</strong>를 눌러 나오는 링크(`postfiles.pstatic.net/...`)를 넣으셔야 합니다!
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">상세 설명 (선택)</label>
                    <textarea
                      rows={3}
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
                    등록 완료 (즉시 게시)
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
