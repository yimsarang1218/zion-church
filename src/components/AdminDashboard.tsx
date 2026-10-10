import React, { useState, useEffect } from 'react';
import { 
  Save, Image as ImageIcon, BookOpen, 
  Video, Users, Camera, LogOut, 
  Trash2, Plus, ArrowLeft, RefreshCw, LayoutDashboard,
  ShieldCheck, AlertCircle, HeartHandshake, Phone, Upload, FolderDown, Loader2, Edit3, X
} from 'lucide-react';
import { 
  doc, getDoc, setDoc, collection, getDocs, 
  addDoc, deleteDoc, updateDoc 
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
  const [activeMenu, setActiveMenu] = useState<'site' | 'bulletins' | 'posts' | 'gallery' | 'resources' | 'prayers'>('site');

  // 1. 온라인 성소 & 표어 설정
  const [sanctuaryVideoInput, setSanctuaryVideoInput] = useState('https://youtu.be/1azfrCPgb84');
  const [sanctuaryTitle, setSanctuaryTitle] = useState('도무지 이해가 안된다고요?');
  const [sanctuaryScripture, setSanctuaryScripture] = useState('로마서 9장 7-13절');
  const [sloganText, setSloganText] = useState('주께 하듯 기쁨으로 함께 걷는 행복한 공동체 (골3:23)');

  // 2. 주보 업로드 (자료실로 자동 누적 연동)
  const [bulletinFiles, setBulletinFiles] = useState<File[]>([]);
  const [bulletinDate, setBulletinDate] = useState('');
  const [bulletinTitle, setBulletinTitle] = useState('');

  // 3. 설교 및 전체 게시판 등록 & 수정 상태
  const [posts, setPosts] = useState<any[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null); // 수정 중인 글 ID
  const [selectedCategory, setSelectedCategory] = useState('sunday');
  const [postTitle, setPostTitle] = useState('');
  const [postScripture, setPostScripture] = useState('');
  const [postAuthor, setPostAuthor] = useState('담임목사');
  const [postYoutubeUrl, setPostYoutubeUrl] = useState('');
  const [postContent, setPostContent] = useState('');

  // 4. 교회 자료실 등록 & 수정 상태
  const [resources, setResources] = useState<any[]>([]);
  const [editingResourceId, setEditingResourceId] = useState<string | null>(null);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceCategory, setResourceCategory] = useState('교회주보');
  const [resourceDate, setResourceDate] = useState('');
  const [resourceFile, setResourceFile] = useState<File | null>(null);

  // 5. 시온성 갤러리 등록 & 수정 상태
  const [gallery, setGallery] = useState<any[]>([]);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryDesc, setGalleryDesc] = useState('');
  const [galleryFile, setGalleryFile] = useState<File | null>(null);

  // 6. 온라인 상담/기도 접수함
  const [prayers, setPrayers] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 유튜브 URL에서 자동으로 11자리 비디오 ID 추출
  const extractYoutubeId = (url: string) => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.length === 11 && !cleanUrl.includes('/')) return cleanUrl;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return (match && match[2].length === 11) ? match[2] : cleanUrl;
  };

  // Firebase Storage 파일 업로드 (용량 무제한)
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
      const siteDoc = await getDoc(doc(db, 'site_settings', 'main_config'));
      if (siteDoc.exists()) {
        const d = siteDoc.data();
        if (d.sanctuaryYoutubeUrl) setSanctuaryVideoInput(d.sanctuaryYoutubeUrl);
        if (d.sanctuaryTitle) setSanctuaryTitle(d.sanctuaryTitle);
        if (d.sanctuaryScripture) setSanctuaryScripture(d.sanctuaryScripture);
        if (d.sloganText) setSloganText(d.sloganText);
      }

      const resSnap = await getDocs(collection(db, 'resources'));
      setResources(resSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const postsSnap = await getDocs(collection(db, 'posts'));
      setPosts(postsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      const galSnap = await getDocs(collection(db, 'gallery'));
      setGallery(galSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));

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
      const imageUrls: string[] = [];
      for (const file of bulletinFiles) {
        const url = await uploadFileToStorage(file, 'bulletins');
        imageUrls.push(url);
      }

      const title = bulletinTitle.trim() || `${bulletinDate.trim()} 주보`;

      // 1) 최신 주보 설정 (메인의 [금주의 주보 보기] 버튼과 즉시 연동)
      await setDoc(doc(db, 'site_settings', 'main_config'), {
        bulletinDate: title,
        bulletinImages: imageUrls,
      }, { merge: true });

      // 2) '교회 자료실' 컬렉션에 자동 누적 (이전 주보가 계속 쌓임)
      const resourceData = {
        title: `[주보] ${title}`,
        category: '교회주보',
        date: bulletinDate.trim(),
        images: imageUrls,
        fileUrl: imageUrls[0],
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

  // ==========================================
  // 게시글 등록 및 수정 (CREATE & UPDATE)
  // ==========================================
  const handleStartEditPost = (p: any) => {
    setEditingPostId(p.id);
    setSelectedCategory(p.category || 'sunday');
    setPostTitle(p.title || '');
    setPostScripture(p.scripture || '');
    setPostAuthor(p.author || '담임목사');
    setPostYoutubeUrl(p.youtubeId ? `https://youtu.be/${p.youtubeId}` : '');
    setPostContent(p.content || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setPostTitle('');
    setPostScripture('');
    setPostYoutubeUrl('');
    setPostContent('');
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) return;

    setIsUploading(true);
    try {
      const extractedId = extractYoutubeId(postYoutubeUrl);

      if (editingPostId) {
        // [수정 모드]: 기존 문서 업데이트
        const updateData = {
          category: selectedCategory,
          title: postTitle.trim(),
          author: postAuthor.trim(),
          content: postContent.trim(),
          scripture: postScripture.trim(),
          youtubeId: extractedId,
          updatedAt: new Date().toISOString()
        };
        await updateDoc(doc(db, 'posts', editingPostId), updateData);
        setPosts(posts.map(p => p.id === editingPostId ? { ...p, ...updateData } : p));
        alert('게시글이 성공적으로 수정되었습니다!');
        handleCancelEditPost();
      } else {
        // [신규 등록 모드]: 새 문서 추가
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
        alert('새 게시글이 성공적으로 등록되었습니다.');
        handleCancelEditPost();
      }
    } catch (e) {
      alert('게시글 저장 오류: ' + e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!window.confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'posts', id));
      setPosts(posts.filter(p => p.id !== id));
      if (editingPostId === id) handleCancelEditPost();
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  // ==========================================
  // 갤러리 등록 및 수정 (CREATE & UPDATE)
  // ==========================================
  const handleStartEditGallery = (g: any) => {
    setEditingGalleryId(g.id);
    setGalleryTitle(g.title || '');
    setGalleryDesc(g.desc || '');
    setGalleryFile(null);
  };

  const handleCancelEditGallery = () => {
    setEditingGalleryId(null);
    setGalleryTitle('');
    setGalleryDesc('');
    setGalleryFile(null);
  };

  const handleSubmitGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle.trim()) return;

    setIsUploading(true);
    try {
      if (editingGalleryId) {
        // 수정 모드
        let fileUrl = undefined;
        if (galleryFile) {
          fileUrl = await uploadFileToStorage(galleryFile, 'gallery');
        }
        const updateData: any = {
          title: galleryTitle.trim(),
          desc: galleryDesc.trim(),
          updatedAt: new Date().toISOString()
        };
        if (fileUrl) updateData.imageUrl = fileUrl;

        await updateDoc(doc(db, 'gallery', editingGalleryId), updateData);
        setGallery(gallery.map(g => g.id === editingGalleryId ? { ...g, ...updateData } : g));
        alert('사진 정보가 성공적으로 수정되었습니다!');
        handleCancelEditGallery();
      } else {
        // 신규 등록 모드
        if (!galleryFile) {
          alert('사진 파일을 첨부해 주세요.');
          setIsUploading(false);
          return;
        }
        const fileUrl = await uploadFileToStorage(galleryFile, 'gallery');
        const newGal = {
          title: galleryTitle.trim(),
          imageUrl: fileUrl,
          date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
          desc: galleryDesc.trim() || '시온성교회 사역 활동 모습입니다.',
        };
        const docRef = await addDoc(collection(db, 'gallery'), newGal);
        setGallery([{ id: docRef.id, ...newGal }, ...gallery]);
        alert('시온성 갤러리에 새 사진이 등록되었습니다.');
        handleCancelEditGallery();
      }
    } catch (e) {
      alert('갤러리 저장 실패: ' + e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    if (!window.confirm('이 사진을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'gallery', id));
      setGallery(gallery.filter(g => g.id !== id));
      if (editingGalleryId === id) handleCancelEditGallery();
      alert('삭제되었습니다.');
    } catch (e) {
      alert('삭제 실패');
    }
  };

  // ==========================================
  // 교회 자료실 등록 및 수정 (CREATE & UPDATE)
  // ==========================================
  const handleStartEditResource = (r: any) => {
    setEditingResourceId(r.id);
    setResourceTitle(r.title || '');
    setResourceCategory(r.category || '교회서식');
    setResourceDate(r.date || '');
    setResourceFile(null);
  };

  const handleCancelEditResource = () => {
    setEditingResourceId(null);
    setResourceTitle('');
    setResourceCategory('교회서식');
    setResourceDate('');
    setResourceFile(null);
  };

  const handleSubmitResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle.trim()) return;

    setIsUploading(true);
    try {
      if (editingResourceId) {
        let fileUrl = undefined;
        if (resourceFile) {
          fileUrl = await uploadFileToStorage(resourceFile, 'resources');
        }
        const updateData: any = {
          title: resourceTitle.trim(),
          category: resourceCategory,
          date: resourceDate.trim() || new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
          updatedAt: new Date().toISOString()
        };
        if (fileUrl) updateData.fileUrl = fileUrl;

        await updateDoc(doc(db, 'resources', editingResourceId), updateData);
        setResources(resources.map(r => r.id === editingResourceId ? { ...r, ...updateData } : r));
        alert('자료 정보가 성공적으로 수정되었습니다!');
        handleCancelEditResource();
      } else {
        let fileUrl = '';
        if (resourceFile) {
          fileUrl = await uploadFileToStorage(resourceFile, 'resources');
        }
        const newRes = {
          title: resourceTitle.trim(),
          category: resourceCategory,
          desc: '교회 성도용 신앙 자료입니다.',
          fileUrl,
          date: resourceDate.trim() || new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        };
        const docRef = await addDoc(collection(db, 'resources'), newRes);
        setResources([{ id: docRef.id, ...newRes }, ...resources]);
        alert('교회 자료실에 등록되었습니다.');
        handleCancelEditResource();
      }
    } catch (e) {
      alert('자료 저장 실패: ' + e);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteResource = async (id: string) => {
    if (!window.confirm('이 자료를 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'resources', id));
      setResources(resources.filter(r => r.id !== id));
      if (editingResourceId === id) handleCancelEditResource();
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

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'sunday': return '주일예배';
      case 'wednesday': return '수요행복예배';
      case 'friday': return '금요기도회';
      case 'tue-thu': return '화·목 저녁기도회';
      case 'cell-couple': return '부부·가정 목장';
      case 'cell-young': return '청년·직장 목장';
      case 'discipleship': return '일대일 제자양육';
      case 'mission': return '국내외 선교·구제';
      case 'ministry': return '사역부서 소식';
      default: return '일반글';
    }
  };

  if (!isOpen) return null;

  // 1. 로그인 인증창 (비밀번호 노출 완전 제거)
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
          <p className="text-xs text-slate-500 mb-8">하남 시온성교회 관리자 보안 비밀번호를 입력해 주십시오.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
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
            <span className="text-[10px] text-slate-400 font-mono">COMPLETE CMS (CREATE / READ / UPDATE / DELETE)</span>
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

      {/* 본문 2단 */}
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
            <Edit3 className="w-4 h-4" />
            <span>전체 게시판 등록·수정 ({posts.length}건)</span>
          </button>

          <button
            onClick={() => setActiveMenu('gallery')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'gallery' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>시온성 사진첩/갤러리 ({gallery.length}장)</span>
          </button>

          <button
            onClick={() => setActiveMenu('resources')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-extrabold text-left transition-colors cursor-pointer ${
              activeMenu === 'resources' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FolderDown className="w-4 h-4" />
            <span>교회 자료실 보관 목록 ({resources.length}건)</span>
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

        {/* 본문 작업 영역 */}
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
                      주보 이미지 파일 첨부 (1면/2면 등 다중 선택 가능)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        if (e.target.files) setBulletinFiles(Array.from(e.target.files));
                      }}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#C49A45] file:text-white cursor-pointer"
                    />
                    {bulletinFiles.length > 0 && (
                      <p className="text-xs text-emerald-600 font-bold mt-2">
                        ✓ {bulletinFiles.length}개의 주보 파일이 선택되었습니다.
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
            </div>
          )}

          {/* 3. 전체 게시판 글 등록 & 수정 (CREATE & UPDATE 완전 지원) */}
          {activeMenu === 'posts' && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {editingPostId ? '✏️ 게시글 수정 모드' : '새 게시글 작성 및 업로드'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {editingPostId 
                      ? '내용을 수정한 후 [수정 내용 저장] 버튼을 누르시면 즉시 홈페이지에 반영됩니다.' 
                      : '주일/수요/금요/화·목 설교, 부부/청년 목장, 일대일 제자양육, 국내외 선교 및 구제 글을 작성합니다.'}
                  </p>
                </div>
                {editingPostId && (
                  <button
                    onClick={handleCancelEditPost}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>수정 취소 (새 글 쓰기)</span>
                  </button>
                )}
              </div>

              {/* 글 작성/수정 폼 */}
              <div className={`p-6 rounded-2xl border transition-all ${
                editingPostId 
                  ? 'bg-amber-50/50 border-amber-300 shadow-md ring-2 ring-amber-400/20' 
                  : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <form onSubmit={handleSubmitPost} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">게시판 카테고리</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
                      >
                        <optgroup label="[01 예배와 말씀]">
                          <option value="sunday">주일예배</option>
                          <option value="wednesday">수요행복예배</option>
                          <option value="friday">금요기도회</option>
                          <option value="tue-thu">화·목 저녁기도회</option>
                        </optgroup>
                        <optgroup label="[03 공동체와 양육]">
                          <option value="cell-couple">부부·가정 목장</option>
                          <option value="cell-young">청년·직장 목장</option>
                          <option value="discipleship">일대일 제자양육</option>
                        </optgroup>
                        <optgroup label="[04 사역과 선교]">
                          <option value="mission">국내외 선교 및 지역 구제</option>
                          <option value="ministry">사역부서 소식</option>
                        </optgroup>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">작성자 / 설교자</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">유튜브 링크 (선택)</label>
                      <input
                        type="text"
                        value={postYoutubeUrl}
                        onChange={(e) => setPostYoutubeUrl(e.target.value)}
                        placeholder="https://youtu.be/... 링크 그대로 입력"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">게시글 제목</label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">성경 본문 구절 (선택)</label>
                      <input
                        type="text"
                        value={postScripture}
                        onChange={(e) => setPostScripture(e.target.value)}
                        placeholder="예: 창세기 35:1~3"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">본문 내용 / 말씀 나눔</label>
                    <textarea
                      rows={5}
                      required
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="성도들과 나눌 은혜의 말씀 및 공지 내용을 입력하세요."
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-medium resize-y"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`px-6 py-2.5 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 ${
                        editingPostId 
                          ? 'bg-[#C49A45] hover:bg-[#A27B2B]' 
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <Save className="w-4 h-4" />
                      <span>{isUploading ? '저장 중...' : editingPostId ? '수정 내용 저장 완료' : '새 게시글 등록하기'}</span>
                    </button>
                    {editingPostId && (
                      <button
                        type="button"
                        onClick={handleCancelEditPost}
                        className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        취소
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* 등록된 글 전체 목록 (수정 & 삭제 트리거) */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    현재 등록된 게시글 목록 ({posts.length}건)
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    * 글을 누르거나 [수정]을 누르면 위 폼에서 바로 수정할 수 있습니다.
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {posts.length === 0 ? (
                    <p className="text-xs text-slate-400 py-8 text-center">등록된 게시글이 없습니다.</p>
                  ) : (
                    posts.map((p) => (
                      <div 
                        key={p.id} 
                        className={`py-3.5 px-3 flex items-center justify-between gap-4 rounded-xl transition-colors cursor-pointer hover:bg-slate-50 ${
                          editingPostId === p.id ? 'bg-amber-50/80 border border-amber-300' : ''
                        }`}
                        onClick={() => handleStartEditPost(p)}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                              {getCategoryLabel(p.category)}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {p.title}
                            </span>
                            {p.youtubeId && (
                              <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                영상연동
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1">
                            {p.date} | {p.author} | {p.scripture ? `본문: ${p.scripture}` : '본문 없음'}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleStartEditPost(p)}
                            className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 transition-colors text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                            title="수정하기"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>수정</span>
                          </button>
                          <button
                            onClick={() => handleDeletePost(p.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="삭제하기"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. 시온성 갤러리 사진 관리 (등록 & 수정 & 삭제) */}
          {activeMenu === 'gallery' && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {editingGalleryId ? '✏️ 사진 정보 수정 모드' : '시온성 갤러리 사진 업로드'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    내 컴퓨터의 사진을 직접 선택하여 Storage에 영구 저장합니다.
                  </p>
                </div>
                {editingGalleryId && (
                  <button
                    onClick={handleCancelEditGallery}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>수정 취소 (새 사진 올리기)</span>
                  </button>
                )}
              </div>

              <div className={`p-6 rounded-2xl border transition-all ${
                editingGalleryId ? 'bg-amber-50/50 border-amber-300 shadow-md' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <form onSubmit={handleSubmitGallery} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">행사/사역 제목</label>
                      <input
                        type="text"
                        required
                        value={galleryTitle}
                        onChange={(e) => setGalleryTitle(e.target.value)}
                        placeholder="예: 2026 청년 목장 모임"
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {editingGalleryId ? '사진 파일 교체 (선택 안 하면 기존 사진 유지)' : '사진 파일 첨부'}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files) setGalleryFile(e.target.files[0]);
                        }}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs file:mr-3 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#C49A45] file:text-white cursor-pointer"
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
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer"
                    >
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      <span>{isUploading ? '저장 중...' : editingGalleryId ? '사진 정보 수정 저장' : '갤러리에 새 사진 등록'}</span>
                    </button>
                    {editingGalleryId && (
                      <button
                        type="button"
                        onClick={handleCancelEditGallery}
                        className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        취소
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* 갤러리 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">등록된 사진 목록 ({gallery.length}장)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {gallery.map((g) => (
                    <div 
                      key={g.id} 
                      className={`p-3 border rounded-xl space-y-2 relative transition-all ${
                        editingGalleryId === g.id ? 'border-amber-400 bg-amber-50/50' : 'border-slate-100'
                      }`}
                    >
                      <img src={g.imageUrl} alt={g.title} className="w-full h-32 object-cover rounded-lg bg-slate-100" />
                      <strong className="text-xs font-bold text-slate-900 block truncate">{g.title}</strong>
                      <span className="text-[10px] text-slate-400 block">{g.date}</span>
                      
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
                        <button
                          onClick={() => handleStartEditGallery(g)}
                          className="flex-1 py-1 rounded bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>수정</span>
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(g.id)}
                          className="p-1 rounded bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 cursor-pointer"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 5. 교회 자료실 보관 목록 (등록 & 수정 & 삭제) */}
          {activeMenu === 'resources' && (
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    {editingResourceId ? '✏️ 자료 수정 모드' : '교회 자료실 보관 및 등록'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">교회 서식이나 주보를 수정하고 관리합니다.</p>
                </div>
                {editingResourceId && (
                  <button
                    onClick={handleCancelEditResource}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>수정 취소</span>
                  </button>
                )}
              </div>

              <div className={`p-6 rounded-2xl border transition-all ${
                editingResourceId ? 'bg-amber-50/50 border-amber-300 shadow-md' : 'bg-white border-slate-200 shadow-2xs'
              }`}>
                <form onSubmit={handleSubmitResource} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">자료 구분</label>
                      <select
                        value={resourceCategory}
                        onChange={(e) => setResourceCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold"
                      >
                        <option value="교회주보">교회주보</option>
                        <option value="교회서식">교회서식</option>
                        <option value="행정양식">행정양식</option>
                        <option value="성경공부">성경공부 자료</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">자료 제목</label>
                      <input
                        type="text"
                        required
                        value={resourceTitle}
                        onChange={(e) => setResourceTitle(e.target.value)}
                        placeholder="자료 제목 입력"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">등록 날짜</label>
                      <input
                        type="text"
                        value={resourceDate}
                        onChange={(e) => setResourceDate(e.target.value)}
                        placeholder="예: 2026.10.18"
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">
                      {editingResourceId ? '파일 교체 (선택 안 하면 기존 파일 유지)' : '첨부 파일 선택'}
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files) setResourceFile(e.target.files[0]);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl cursor-pointer"
                    >
                      {isUploading ? '저장 중...' : editingResourceId ? '자료 수정 저장' : '자료실에 등록'}
                    </button>
                    {editingResourceId && (
                      <button
                        type="button"
                        onClick={handleCancelEditResource}
                        className="px-4 py-2.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-xl cursor-pointer"
                      >
                        취소
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* 목록 */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900">교회 자료실 보관 목록 ({resources.length}건)</h3>
                <div className="divide-y divide-slate-100">
                  {resources.map((r) => (
                    <div 
                      key={r.id} 
                      className={`py-3 px-3 flex items-center justify-between gap-4 rounded-xl transition-colors cursor-pointer hover:bg-slate-50 ${
                        editingResourceId === r.id ? 'bg-amber-50/80 border border-amber-300' : ''
                      }`}
                      onClick={() => handleStartEditResource(r)}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-[#C49A45]">{r.category}</span>
                          <strong className="text-xs sm:text-sm font-bold text-slate-900">{r.title}</strong>
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">발행일: {r.date}</span>
                      </div>
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleStartEditResource(r)}
                          className="p-1.5 rounded-lg text-amber-700 hover:bg-amber-100 text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>수정</span>
                        </button>
                        <button onClick={() => handleDeleteResource(r.id)} className="p-1.5 text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. 신앙상담 / 기도함 */}
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
