import React, { useState, useEffect } from 'react';
import { 
  Save, Image as ImageIcon, BookOpen, 
  Video, Users, Camera, LogOut, 
  Trash2, Plus, ArrowLeft, RefreshCw, LayoutDashboard,
  ShieldCheck, AlertCircle, HeartHandshake, Phone, Upload, FolderDown, Loader2
} from 'lucide-react';
import { 
  doc, getDoc, setDoc, collection, getDocs, 
  addDoc, deleteDoc 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeMenu, setActiveMenu] = useState<'site' | 'bulletins' | 'prayers' | 'posts' | 'gallery'>('site');

  // 1. 온라인 성소 & 표어 설정
  const [sanctuaryVideoInput, setSanctuaryVideoInput] = useState('https://youtu.be/1azfrCPgb84');
  const [sanctuaryTitle, setSanctuaryTitle] = useState('도무지 이해가 안된다고요?');
  const [sanctuaryScripture, setSanctuaryScripture] = useState('로마서 9장 7-13절');
  const [sloganText, setSloganText] = useState('주께 하듯 기쁨으로 함께 걷는 행복한 공동체 (골3:23)');

  // 2. 주보 업로드 (자료실로 자동 누적 연동)
  const [bulletinFiles, setBulletinFiles] = useState<File[]>([]);
  const [bulletinDate, setBulletinDate] = useState('');
  const [bulletinTitle, setBulletinTitle] = useState('');

  // 3. 설교 및 게시판 등록
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('sunday');
  const [postTitle, setPostTitle] = useState('');
  const [postScripture, setPostScripture] = useState('');
  const [postAuthor, setPostAuthor] = useState('담임목사');
  const [postYoutubeUrl, setPostYoutubeUrl] = useState('');
  const [postContent, setPostContent] = useState('');

  // 4. 교회 자료실 (Resources & Bulletins)
  const [resources, setResources] = useState<any[]>([]);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceCategory, setResourceCategory] = useState('교회주보');
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  // 5. 시온성 갤러리 사진 관리
  const [gallery, setGallery] = useState<any[]>([]);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  // 6. 온라인 상담/기도 접수함
  const [prayers, setPrayers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 유튜브 URL에서 자동으로 11자리 ID를 추출하는 함수
  const extractYoutubeId = (url: string) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.length === 11 && !cleanUrl.includes('/')) return cleanUrl;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : cleanUrl;
  };

  // Firebase Storage에 파일 원본을 올리고 고유 다운로드 URL을 받아오는 함수 (용량 무제한)
  const uploadFileToStorage = async (file: File, folderPath: string): Promise<string> => {
    const fileRef = ref(storage, `${folderPath}/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };

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
        if (d.sanctuaryTitle) setSanctuaryTitle(d.sanctuaryTitle);
        if (d.sanctuaryScripture) setSanctuaryScripture(d.sanctuaryScripture);
        if (d.sloganText) setSloganText(d.sloganText);
      }

      // 2) 자료실 목록 (주보 포함)
      const resSnap = await getDocs(collection(db, 'resources'));
      setResources(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 3) 설교 목록
      const postsSnap = await getDocs(collection(db, 'posts'));
      setPosts(postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 4) 갤러리 목록
      const galSnap = await getDocs(collection(db, 'gallery'));
      setGallery(galSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // 5) 기도 접수 목록
      const prayerSnap = await getDocs(collection(db, 'prayers'));
      setPrayers(prayerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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

  // 메인 성소 & 표어 저장
  const handleSaveSiteSettings = async () => {
    setIsUploading(true);
    try {
      const extractedId = extractYoutubeId(sanctuaryVideoInput);
      await setDoc(doc(db, 'site_settings', 'main_config'), {
        sanctuaryYoutubeUrl: sanctuaryVideoInput.trim(),
        sanctuaryVideoId: extractedId,
        sanctuaryTitle: sanctuaryTitle.trim(),
        sanctuaryScripture: sanctuaryScripture.trim(),
        sloganText: sloganText.trim(),
        updatedAt: new Date().toISOString()
      }, { merge: true });

      alert('메인 화면의 온라인 성소 영상과 표어가 실시간으로 반영되었습니다!');
    } catch (err) {
      alert('저장 실패: ' + err);
    } finally {
      setIsUploading(false);
    }
  };

  // 주보 업로드 -> Storage에 저장 후 메인 주보 팝업 갱신 + 교회 자료실 자동 누적
  const handleUploadBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulletinDate.trim() || bulletinFiles.length === 0) {
      alert('주보 날짜와 주보 이미지 파일(1면, 2면 등)을 선택해 주세요.');
      return;
    }

    setIsUploading(true);
    try {
      // 1) Storage에 주보 파일 업로드
      const imageUrls: string[] = [];
      for (const file of bulletinFiles) {
        const url = await uploadFileToStorage(file, 'bulletins');
        imageUrls.push(url);
      }

      const title = bulletinTitle.trim() || `${bulletinDate.trim()} 주보`;

      // 2) 최신 주보 설정 (메인의 [금주의 주보 보기] 버튼과 즉시 연동)
      await setDoc(doc(db, 'site_settings', 'main_config'), {
        bulletinDate: title,
        bulletinImages: imageUrls,
      }, { merge: true });

      // 3) '교회 자료실' 컬렉션에 자동 누적 (이전 주보가 계속 쌓임)
      const resourceData = {
        title: `[주보] ${title}`,
        category: '교회주보',
        date: bulletinDate.trim(),
        images: imageUrls,
        fileUrl: imageUrls[0], // 대표 다운로드 링크
        desc: `${bulletinDate.trim()} 시온성교회 주보입니다.`,
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(db, 'resources'), resourceData);
      setResources([{ id: docRef.id, ...resourceData }, ...resources]);

      setBulletinDate('');
      setBulletinTitle('');
      setBulletinFiles([]);
      alert('주보가 성공적으로 등록되었습니다!\n(최신 주보로 반영되었으며, 교회 자료실에도 자동 누적 보관되었습니다)');
    } catch (err) {
      alert('주보 업로드 오류: ' + err);
    } finally {
      setIsUploading(false);
    }
  };

  // 설교 등록
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    setIsUploading(true);
    try {
      const extractedId = extractYoutubeId(postYoutubeUrl);
      const newPost = {
        category: selectedCategory,
        title: postTitle.trim(),
        author: postAuthor.trim(),
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        views: 1,
        content: postContent.trim(),
        scripture: postScripture.trim(),
        youtubeId: extractedId,
      };

      const docRef = await addDoc(collection(db, 'posts'), newPost);
      setPosts([{ id: docRef.id, ...newPost }, ...posts]);

      setPostTitle('');
      setPostScripture('');
      setPostYoutubeUrl('');
      setPostContent('');
      alert('설교/게시글이 성공적으로 등록되었습니다.');
    } catch (e) {
      alert('게시글 등록 오류');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      setPosts(posts.filter(p => p.id !== id));
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  // 갤러리 사진 업로드 (Storage에 안전 저장)
  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim() || !galleryFile) {
      alert('제목과 사진 파일을 선택해 주세요.');
      return;
    }

    setIsUploading(true);
    try {
      const fileUrl = await uploadFileToStorage(galleryFile, 'gallery');
      const newGal = {
        title: galleryTitle.trim(),
        imageUrl: fileUrl,
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        desc: galleryDesc.trim() || '시온성교회 사역 활동 모습입니다.',
      };

      const docRef = await addDoc(collection(db, 'gallery'), newGal);
      setGallery([{ id: docRef.id, ...newGal }, ...gallery]);
      setGalleryTitle('');
      setGalleryDesc('');
      setGalleryFile(null);
      alert('시온성 갤러리에 사진이 등록되었습니다.');
    } catch (e) {
      alert('사진 등록 실패: ' + e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('이 사진을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setGallery(gallery.filter(g => g.id !== id));
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  // 일반 자료 등록 (교회 자료실 수동 등록용)
  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim()) return;

    setIsUploading(true);
    try {
      let fileUrl = '';
      if (resourceFile) {
        fileUrl = await uploadFileToStorage(resourceFile, 'resources');
      }

      const newRes = {
        title: resourceTitle.trim(),
        category: resourceCategory,
        desc: '교회 성도용 신앙 자료입니다.',
        fileUrl,
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
      };

      const docRef = await addDoc(collection(db, 'resources'), newRes);
      setResources([{ id: docRef.id, ...newRes }, ...resources]);
      setResourceTitle('');
      setResourceFile(null);
      alert('교회 자료실에 등록되었습니다.');
    } catch (e) {
      alert('자료 등록 실패');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm('이 자료를 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'resources', id));
      setResources(resources.filter(r => r.id !== id));
      alert('자료가 삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  const handleDeletePrayer = async (id: string) => {
    if (!window.confirm('이 기도/상담 내역을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'prayers', id));
      setPrayers(prayers.filter(p => p.id !== id));
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  if (!isOpen) return null;

  // 로그인 인증창
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 text-center relative">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#C49A45] flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <span className="text-xs font-mono font-bold text-[#C49A45] tracking-widest uppercase">ZION CMS SYSTEM</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1 mb-2">통합 관리자 인증</h2>
          <p className="text-xs text-slate-500 mb-8">하남 시온성교회 관리자 비밀번호를 입력해 주십시오.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호 (zion1218)"
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C49A45] focus:bg-white text-center"
              autoFocus
            />
            <button type="submit" className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-xl shadow-lg cursor-pointer">
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
            <h1 className="text-base font-extrabold leading-none">하남 시온성교회 CMS 관리자 센터</h1>
            <span className="text-[10px] text-slate-400 font-mono">STORAGE-BACKED INTEGRATED CMS</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={loadAllAdminData} disabled={isLoading} className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 cursor-pointer">
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>새로고침</span>
          </button>
          <button onClick={() => { setIsAuthenticated(false); onClose(); }} className="flex items-center gap-1.5 text-xs font-bold text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg bg-rose-950/40 border border-rose-800/40 cursor-pointer">
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
            교회 전산 관리
          </span>

          <button
            onClick={() => setActiveMenu('site')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'site' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>온라인 성소 (메인 영상)</span>
          </button>

          <button
            onClick={() => setActiveMenu('bulletins')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'bulletins' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>주보 업로드 & 자료실 보관</span>
          </button>

          <button
            onClick={() => setActiveMenu('posts')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'posts' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>설교 및 예배 게시글 등록</span>
          </button>

          <button
            onClick={() => setActiveMenu('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'gallery' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>시온성 사진첩/갤러리</span>
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
        </aside>

        {/* 메인 작업창 */}
        <main className="flex-1 bg-slate-50 overflow-y-auto p-6 sm:p-10">
          
          {/* 1. 온라인 성소 관리 */}
          {activeMenu === 'site' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">메인 화면 온라인 성소(ONLINE SANCTUARY) 설정</h2>
                <p className="text-xs text-slate-500 mt-0.5">유튜브 주소창의 링크를 복사해서 그대로 붙여넣으시면 됩니다.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border-2 border-[#C49A45]/30 shadow-md space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    유튜브 영상 전체 주소 (링크 통째로 붙여넣기)
                  </label>
                  <input
                    type="text"
                    value={sanctuaryVideoInput}
                    onChange={(e) => setSanctuaryVideoInput(e.target.value)}
                    placeholder="https://youtu.be/... 또는 https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    ID만 추출할 필요 없이 복사한 유튜브 링크를 그대로 넣으시면 시스템이 자동 인식합니다.
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">설교 제목</label>
                    <input
                      type="text"
                      value={sanctuaryTitle}
                      onChange={(e) => setSanctuaryTitle(e.target.value)}
                      placeholder="예: 도무지 이해가 안된다고요?"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">성경 본문 말씀</label>
                    <input
                      type="text"
                      value={sanctuaryScripture}
                      onChange={(e) => setSanctuaryScripture(e.target.value)}
                      placeholder="예: 로마서 9장 7-13절"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">2026년 교회 표어</label>
                  <input
                    type="text"
                    value={sloganText}
                    onChange={(e) => setSloganText(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
                  />
                </div>

                <button
                  onClick={handleSaveSiteSettings}
                  disabled={isUploading}
                  className="w-full py-3 bg-[#C49A45] hover:bg-[#A27B2B] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{isUploading ? '저장 중...' : '메인 화면 온라인 성소 즉시 반영하기'}</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. 주보 업로드 (자료실로 자동 누적) */}
          {activeMenu === 'bulletins' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">주보 등록 (최신 주보 갱신 & 교회 자료실 자동 누적)</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  내 컴퓨터에서 주보 이미지 파일(jpg, png)을 선택하여 올리면, 메인 화면 주보가 바뀌고 <strong>교회 자료실에도 지난 주보로 자동 보관</strong>됩니다.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <form onSubmit={handleUploadBulletin} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">주보 날짜 (필수)</label>
                      <input
                        type="text"
                        required
                        placeholder="예: 2026.10.18"
                        value={bulletinDate}
                        onChange={(e) => setBulletinDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">주보 제목 / 호수</label>
                      <input
                        type="text"
                        placeholder="예: 2026년 10월 18일 주보 (제 42호)"
                        value={bulletinTitle}
                        onChange={(e) => setBulletinTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      주보 이미지 파일 첨부 (컴퓨터에서 선택, 1면/2면 등 다중 선택 가능)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) {
                          setBulletinFiles(Array.from(e.target.files));
                        }
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#C49A45] file:text-white cursor-pointer"
                    />
                    {bulletinFiles.length > 0 && (
                      <p className="text-xs text-emerald-600 font-bold mt-2">
                        ✓ {bulletinFiles.length}개의 파일이 선택되었습니다. (Firebase Storage 안전 전송)
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Storage 업로드 중...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>주보 등록 (자료실 자동 누적)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* 교회 자료실에 누적된 주보 및 서식 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">교회 자료실에 보관된 주보 및 서식 목록 ({resources.length}건)</h3>
                <div className="divide-y divide-slate-100">
                  {resources.map((r) => (
                    <div key={r.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-[#A27B2B]">{r.category}</span>
                          <strong className="text-xs sm:text-sm font-bold text-slate-900">{r.title}</strong>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">발행일: {r.date}</span>
                      </div>
                      <button onClick={() => handleDeleteResource(r.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. 설교 등록 */}
          {activeMenu === 'posts' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">설교 및 게시판 글 등록·삭제</h2>
                <p className="text-xs text-slate-500 mt-0.5">유튜브 링크 전체를 넣으시면 자동으로 영상 플레이어가 만들어집니다.</p>
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
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">유튜브 링크 (통째로 붙여넣기)</label>
                      <input
                        type="text"
                        value={postYoutubeUrl}
                        onChange={(e) => setPostYoutubeUrl(e.target.value)}
                        placeholder="https://youtu.be/... 링크 그대로 붙여넣기"
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
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">성경 본문 구절</label>
                      <input
                        type="text"
                        value={postScripture}
                        onChange={(e) => setPostScripture(e.target.value)}
                        placeholder="예: 창세기 35:1~3"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">설교 요약 / 본문 내용</label>
                    <textarea
                      rows={4}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="설교 요약 및 나눔 문구를 입력하세요."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    {isUploading ? '저장 중...' : '설교 게시글 게시하기'}
                  </button>
                </form>
              </div>

              {/* 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">등록된 게시글 목록 ({posts.length}건)</h3>
                <div className="divide-y divide-slate-100">
                  {posts.map((p) => (
                    <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{p.title}</span>
                        <p className="text-[11px] text-slate-400">{p.date} | {p.author} | {p.scripture || '본문 없음'}</p>
                      </div>
                      <button onClick={() => handleDeletePost(p.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. 시온성 갤러리 */}
          {activeMenu === 'gallery' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h2 className="text-xl font-black text-slate-900">시온성 갤러리 사진 관리</h2>
                <p className="text-xs text-slate-500 mt-0.5">내 컴퓨터의 사진을 직접 선택하여 Storage에 영구 저장합니다.</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <form onSubmit={handleCreateGallery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">행사/사역 제목</label>
                      <input
                        type="text"
                        required
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="예: 2026 전교인 체육대회"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">사진 파일 첨부 (컴퓨터에서 선택)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) setGalleryFile(e.target.files[0]);
                        }}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#C49A45] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">활동 설명</label>
                    <textarea
                      rows={3}
                      value={galleryDesc}
                      onChange={(e) => setGalleryDesc(e.target.value)}
                      placeholder="활동에 대한 설명을 적어주세요."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2"
                  >
                    {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    <span>갤러리에 등록하기</span>
                  </button>
                </form>
              </div>

              {/* 갤러리 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">등록된 사진 목록 ({gallery.length}장)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div key={g.id} className="p-3 border border-slate-100 rounded-xl space-y-2 relative">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover rounded-lg bg-slate-100" />
                      <strong className="text-xs font-bold text-slate-900 block truncate">{g.title}</strong>
                      <span className="text-[10px] text-slate-400 block">{g.date}</span>
                      <button onClick={() => handleDeleteGallery(g.id)} className="absolute top-4 right-4 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. 신앙상담 / 기도함 */}
          {activeMenu === 'prayers' && (
            <div className="max-w-4xl space-y-6">
              <div>
                <h2 className="text-xl font-black text-slate-900">온라인 신앙상담 및 중보기도 접수함</h2>
                <p className="text-xs text-slate-500 mt-0.5">성도들이 요청한 비공개 기도와 고민 상담 내역입니다.</p>
              </div>

              {prayers.length === 0 ? (
                <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-400 text-xs">
                  현재 접수된 신앙상담 및 중보기도 요청이 없습니다.
                </div>
              ) : (
                <div className="space-y-4">
                  {prayers.map((pr) => (
                    <div key={pr.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
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
                          <button onClick={() => handleDeletePrayer(pr.id)} className="p-1 text-slate-400 hover:text-rose-600">
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

        </main>
      </div>

    </div>
  );
};
