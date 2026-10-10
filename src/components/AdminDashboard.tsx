import React, { useState, useEffect } from 'react';
import { 
  Save, Image as ImageIcon, BookOpen, 
  Video, Users, Camera, LogOut, 
  Trash2, Plus, ArrowLeft, RefreshCw, LayoutDashboard,
  ShieldCheck, HeartHandshake, Phone, Sparkles
} from 'lucide-react';
import { 
  doc, getDoc, setDoc, collection, getDocs, 
  addDoc, deleteDoc 
} from 'firebase/firestore';
import { db } from '../firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState<'site' | 'prayers' | 'bulletin' | 'posts' | 'newcomers' | 'gallery'>('site');

  // 메인 화면 온라인 성소 (ONLINE SANCTUARY) 관리 상태
  const [sanctuaryVideoInput, setSanctuaryVideoInput] = useState('https://youtu.be/1azfrCPgb84');
  const [sanctuaryTitle, setSanctuaryTitle] = useState('도무지 이해가 안된다고요?');
  const [sanctuaryScripture, setSanctuaryScripture] = useState('로마서 9장 7-13절');

  // 사이트 기본 설정 상태
  const [heroBannerUrl, setHeroBannerUrl] = useState('/main-church-banner.png');
  const [sloganText, setSloganText] = useState('주께 하듯 기쁨으로 함께 걷는 행복한 공동체 (골3:23)');
  const [bulletinDate, setBulletinDate] = useState('2026년 10월 11일 주보');
  const [bulletinImagesText, setBulletinImagesText] = useState('');

  // 온라인 신앙상담/기도 접수 목록
  const [prayers, setPrayers] = useState<any[]>([]);

  // 일반 설교/새가족/갤러리
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('sunday');
  const [postTitle, setPostTitle] = useState('');
  const [postScripture, setPostScripture] = useState('');
  const [postAuthor, setPostAuthor] = useState('담임목사');
  const [postYoutubeId, setPostYoutubeId] = useState('');
  const [postContent, setPostContent] = useState('');

  const [newcomers, setNewcomers] = useState<any[]>([]);
  const [newcomerName, setNewcomerName] = useState('');
  const [newcomerDesc, setNewcomerDesc] = useState('');

  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;
    loadAllAdminData();
  }, [isOpen, isAuthenticated]);

  const loadAllAdminData = async () => {
    setIsLoading(true);
    try {
      // 1) 사이트 설정
      const siteDoc = await getDoc(doc(db, 'site_settings', 'main_config'));
      if (siteDoc.exists()) {
        const d = siteDoc.data();
        if (d.sanctuaryYoutubeUrl) setSanctuaryVideoInput(d.sanctuaryYoutubeUrl);
        else if (d.sanctuaryVideoId) setSanctuaryVideoInput(d.sanctuaryVideoId);
        if (d.sanctuaryTitle) setSanctuaryTitle(d.sanctuaryTitle);
        if (d.sanctuaryScripture) setSanctuaryScripture(d.sanctuaryScripture);

        if (d.heroBannerUrl) setHeroBannerUrl(d.heroBannerUrl);
        if (d.sloganText) setSloganText(d.sloganText);
        if (d.bulletinDate) setBulletinDate(d.bulletinDate);
        if (d.bulletinImages) setBulletinImagesText(d.bulletinImages.join('\n'));
      }

      // 2) 온라인 신앙상담 및 중보기도 DB 조회
      const prayerSnap = await getDocs(collection(db, 'prayers'));
      setPrayers(prayerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 3) 설교/새가족/갤러리
      const postsSnap = await getDocs(collection(db, 'posts'));
      setPosts(postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const newSnap = await getDocs(collection(db, 'newcomers'));
      setNewcomers(newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const galSnap = await getDocs(collection(db, 'gallery'));
      setGallery(galSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (e) {
      console.warn('관리자 데이터 조회 오류:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().toLowerCase() === 'zion1218') {
      setIsAuthenticated(true);
    } else {
      alert('관리자 비밀번호가 일치하지 않습니다.');
    }
  };

  // 메인 성소 & 배너 설정 저장
  const handleSaveSiteSettings = async () => {
    setIsSaving(true);
    try {
      // 유튜브 URL에서 ID 자동 추출
      let extractedId = sanctuaryVideoInput.trim();
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = extractedId.match(regExp);
      if (match && match[2].length === 11) {
        extractedId = match[2];
      }

      const bulletinImages = bulletinImagesText
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      await setDoc(doc(db, 'site_settings', 'main_config'), {
        sanctuaryYoutubeUrl: sanctuaryVideoInput.trim(),
        sanctuaryVideoId: extractedId,
        sanctuaryTitle: sanctuaryTitle.trim(),
        sanctuaryScripture: sanctuaryScripture.trim(),
        heroBannerUrl,
        sloganText,
        bulletinDate,
        bulletinImages,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      alert('메인 화면의 온라인 성소 영상과 설정이 실시간으로 교체되었습니다!');
    } catch (err) {
      alert('저장 실패: ' + err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePrayer = async (id: string) => {
    if (!window.confirm('이 상담/기도 내역을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'prayers', id));
      setPrayers(prayers.filter(p => p.id !== id));
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;
    setIsSaving(true);
    try {
      const newPost = {
        category: selectedCategory,
        title: postTitle.trim(),
        author: postAuthor.trim(),
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        views: 1,
        content: postContent.trim(),
        scripture: postScripture.trim(),
        youtubeId: postYoutubeId.trim(),
      };
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts([{ id: docRef.id, ...newPost }, ...posts]);
      setPostTitle('');
      setPostScripture('');
      setPostYoutubeId('');
      setPostContent('');
      alert('게시글이 성공적으로 등록되었습니다.');
    } catch (e) {
      alert('등록 중 오류 발생');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      setPosts(posts.filter(p => p.id !== id));
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  if (!isOpen) return null;

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 text-center relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#C49A45] flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <span className="text-xs font-mono font-bold text-[#C49A45] tracking-widest uppercase">
            ZION ADMIN PORTAL
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1 mb-2">
            통합 관리자 인증
          </h2>
          <p className="text-xs text-slate-500 mb-8 leading-relaxed">
            하남 시온성교회 웹사이트 전산 관리 시스템입니다.<br />
            보안 비밀번호를 입력해 주십시오.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호 입력"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C49A45] focus:bg-white transition-all text-center"
              autoFocus
            />
            <button
              type="submit"
              className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              관리자 모드 접속
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-100 flex flex-col overflow-hidden text-slate-900">
      
      {/* 헤더 */}
      <header className="h-16 bg-slate-900 text-white px-6 flex items-center justify-between shrink-0 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C49A45] flex items-center justify-center font-black text-white text-sm">
            시온
          </div>
          <div>
            <h1 className="text-base font-extrabold leading-none">
              하남 시온성교회 CMS 관리자 센터
            </h1>
            <span className="text-[10px] text-slate-400 font-mono">
              OFFICIAL CHURCH MANAGEMENT SYSTEM
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={loadAllAdminData}
            disabled={isLoading}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>새로고침</span>
          </button>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              onClose();
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 hover:bg-rose-950/80 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>나가기 (홈으로)</span>
          </button>
        </div>
      </header>

      {/* 작업 영역 */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LNB */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 p-4 space-y-1">
          <span className="text-[11px] font-bold text-slate-400 px-3 py-2 uppercase tracking-wider">
            관리 항목
          </span>

          <button
            onClick={() => setActiveMenu('site')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'site' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>온라인 성소 & 메인 설정</span>
          </button>

          <button
            onClick={() => setActiveMenu('prayers')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'prayers' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>신앙상담 / 기도함</span>
            {prayers.length > 0 && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                {prayers.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMenu('bulletin')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'bulletin' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>금주의 주보 관리</span>
          </button>

          <button
            onClick={() => setActiveMenu('posts')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'posts' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>설교 및 게시판 등록·삭제</span>
          </button>
        </aside>

        {/* 메인 뷰 */}
        <main className="flex-1 bg-slate-50 overflow-y-auto p-6 sm:p-10">
          
          {/* 메인 온라인 성소 (ONLINE SANCTUARY) 관리 패널 */}
          {activeMenu === 'site' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">메인 화면 온라인 성소 & 배너 설정</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  홈페이지 첫 화면의 [ONLINE SANCTUARY] 영상 플레이어와 설교 정보를 바로 교체합니다.
                </p>
              </div>

              {/* 온라인 성소 핵심 컨트롤 박스 */}
              <div className="bg-white p-6 rounded-2xl border-2 border-[#C49A45]/30 shadow-md space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">메인 온라인 성소(ONLINE SANCTUARY) 영상 제어</h3>
                    <p className="text-[11px] text-slate-400">유튜브 링크나 비디오 ID만 바꾸면 메인 화면 영상이 즉시 바뀝니다.</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    유튜브 영상 링크 또는 비디오 ID
                  </label>
                  <input
                    type="text"
                    value={sanctuaryVideoInput}
                    onChange={(e) => setSanctuaryVideoInput(e.target.value)}
                    placeholder="예: https://youtu.be/1azfrCPgb84 또는 1azfrCPgb84"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    유튜브 공유 링크(youtu.be/...)를 그대로 복사해서 넣으셔도 자동으로 인식됩니다.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      메인 성소 설교 제목
                    </label>
                    <input
                      type="text"
                      value={sanctuaryTitle}
                      onChange={(e) => setSanctuaryTitle(e.target.value)}
                      placeholder="예: 도무지 이해가 안된다고요?"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      성경 본문 말씀
                    </label>
                    <input
                      type="text"
                      value={sanctuaryScripture}
                      onChange={(e) => setSanctuaryScripture(e.target.value)}
                      placeholder="예: 로마서 9장 7-13절"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    2026년 교회 표어 문구
                  </label>
                  <input
                    type="text"
                    value={sloganText}
                    onChange={(e) => setSloganText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>

                <button
                  onClick={handleSaveSiteSettings}
                  disabled={isSaving}
                  className="w-full py-3 bg-[#C49A45] hover:bg-[#A27B2B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? '저장 중...' : '메인 화면 온라인 성소 즉시 반영하기'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 신앙상담 / 기도함 */}
          {activeMenu === 'prayers' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">온라인 신앙상담 및 중보기도 접수함</h2>
                <p className="text-xs text-slate-500 mt-0.5">성도들이 눈물과 기도로 요청한 비공개 상담 내역입니다.</p>
              </div>

              {prayers.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  현재 접수된 신앙상담 및 중보기도 요청이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {prayers.map((pr) => (
                    <div key={pr.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3 relative">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold text-white ${
                            pr.category === '신앙상담' ? 'bg-indigo-600' :
                            pr.category === '중보기도' ? 'bg-[#C49A45]' : 'bg-emerald-600'
                          }`}>
                            {pr.category || '중보기도'}
                          </span>
                          <strong className="text-base font-extrabold text-slate-900">{pr.name}</strong>
                          {pr.phone && (
                            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {pr.phone}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 font-mono">{pr.createdAt}</span>
                          <button
                            onClick={() => handleDeletePrayer(pr.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="삭제"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                        {pr.request}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 주보 관리 */}
          {activeMenu === 'bulletin' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">금주의 주보 관리</h2>
                <p className="text-xs text-slate-500 mt-0.5">성도들이 열람하는 주보 일자와 이미지 URL을 등록합니다.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">주보 발행 일자</label>
                  <input
                    type="text"
                    value={bulletinDate}
                    onChange={(e) => setBulletinDate(e.target.value)}
                    placeholder="예: 2026년 10월 11일 주보"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    주보 면별 이미지 URL (한 줄에 1개씩)
                  </label>
                  <textarea
                    rows={6}
                    value={bulletinImagesText}
                    onChange={(e) => setBulletinImagesText(e.target.value)}
                    placeholder="https://.../page1.jpg&#10;https://.../page2.jpg"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>

                <button
                  onClick={handleSaveSiteSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-[#C49A45] hover:bg-[#A27B2B] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? '저장 중...' : '주보 업데이트 저장'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 설교/게시글 관리 */}
          {activeMenu === 'posts' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">설교 및 게시판 글 등록·삭제</h2>
                <p className="text-xs text-slate-500 mt-0.5">예배별 설교 영상과 성경 본문 말씀을 등록합니다.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">예배 구분</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      >
                        <option value="sunday">주일예배</option>
                        <option value="wednesday">수요행복예배</option>
                        <option value="friday">금요기도회</option>
                        <option value="tue-thu">화·목 저녁기도회</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">설교자</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">유튜브 비디오 ID</label>
                      <input
                        type="text"
                        value={postYoutubeId}
                        onChange={(e) => setPostYoutubeId(e.target.value)}
                        placeholder="예: 1azfrCPgb84"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">설교 제목</label>
                      <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="예: 다시 부르시는 은혜"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">성경 본문</label>
                      <input
                        type="text"
                        value={postScripture}
                        onChange={(e) => setPostScripture(e.target.value)}
                        placeholder="예: 창세기 35:1~3"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">내용 / 요약문</label>
                    <textarea
                      rows={4}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="설교 요약 문구를 입력하세요."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {isSaving ? '저장 중...' : '설교 게시글 게시하기'}
                  </button>
                </form>
              </div>

              {/* 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">현재 등록된 게시글 목록 ({posts.length}건)</h3>
                <div className="divide-y divide-slate-100">
                  {posts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                            {p.category === 'sunday' && '주일예배'}
                            {p.category === 'wednesday' && '수요행복예배'}
                            {p.category === 'friday' && '금요기도회'}
                            {p.category === 'tue-thu' && '저녁기도회'}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">{p.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{p.date} | {p.author} | {p.scripture || '본문 없음'}</p>
                      </div>

                      <button
                        onClick={() => handleDeletePost(p.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
