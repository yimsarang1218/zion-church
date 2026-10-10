import React, { useState, useEffect } from 'react';
import { 
  Home, ChevronRight, Search, ArrowLeft, Eye, Calendar, 
  User, Check, Video, Volume2, MapPin, 
  CreditCard, BookOpen, Heart, Sparkles, Navigation, Copy, Loader2,
  FolderDown, Download, Image as ImageIcon
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { CHURCH_INFO } from '../data/churchData';

interface SubPageLayoutProps {
  initialSectionId: string;
  initialSubMenuId?: string;
  onGoHome: () => void;
  onOpenBulletin: () => void;
  onOpenPrayer: () => void;
}

interface PostItem {
  id: string;
  no: number;
  category: string;
  title: string;
  author: string;
  date: string;
  views: number;
  content: string;
  scripture?: string;
  youtubeId?: string;
  audioUrl?: string;
  imageUrl?: string;
}

const DEFAULT_POSTS: PostItem[] = [
  {
    id: 'p1',
    no: 1,
    category: 'sunday',
    title: '다시 부르시는 은혜',
    author: '담임목사',
    date: '2026.10.11',
    views: 142,
    scripture: '창세기 35:1~3',
    youtubeId: '1azfrCPgb84',
    content: '하나님이 야곱에게 이르시되 벧엘로 올라가서 거기 거주하며 네가 네 형 에서의 낯을 피하여 도망하던 때에 네게 나타났던 하나님께 거기서 제단을 쌓으라 하신지라...',
  },
  {
    id: 'p2',
    no: 2,
    category: 'wednesday',
    title: '반석을 버린 여수룬',
    author: '담임목사',
    date: '2026.10.14',
    views: 85,
    scripture: '신명기 32:15~27',
    content: '그런데 여수룬이 기름지매 발로 찼도다 네가 살찌고 비대하고 윤택하매 자기를 지으신 하나님을 버리고...',
  },
  {
    id: 'p3',
    no: 3,
    category: 'friday',
    title: '환난 날에 나를 부르라',
    author: '담임목사',
    date: '2026.10.09',
    views: 73,
    scripture: '시편 50:15',
    content: '환난 날에 나를 부르라 내가 너를 건지리니 네가 나를 영화롭게 하리로다...',
  },
  {
    id: 'p4',
    no: 4,
    category: 'tue-thu',
    title: '기도의 골방에서 드리는 중보',
    author: '사역자',
    date: '2026.10.08',
    views: 45,
    content: '가정과 성도들의 아픔을 품고 말씀에 기대어 밤을 지새우는 거룩한 호흡의 시간입니다.',
  },
];

const DEFAULT_GALLERY = [
  {
    id: 'g1',
    title: '2026 추석 청년 목장 모임',
    date: '2026.10.04',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=600&q=80',
    desc: '추석을 맞이해서 청년 목장 모임을 진행했습니다.',
  },
];

const CHURCH_STAFF = [
  { group: '교역자', role: '담임목사', name: '채준희' },
  { group: '교역자', role: '동사목사', name: '임사랑' },
  { group: '원로·명예·은퇴장로', role: '원로장로', name: '임원묵' },
  { group: '원로·명예·은퇴장로', role: '명예장로', name: '진종원' },
  { group: '원로·명예·은퇴장로', role: '은퇴장로', name: '김승연' },
  { group: '원로·명예·은퇴장로', role: '은퇴장로', name: '강태봉' },
  { group: '시무장로', role: '시무장로', name: '이영재' },
  { group: '시무장로', role: '시무장로', name: '정호성' },
];

export const SubPageLayout: React.FC<SubPageLayoutProps> = ({
  initialSectionId,
  initialSubMenuId,
  onGoHome,
  onOpenBulletin,
  onOpenPrayer,
}) => {
  const [currentSectionId, setCurrentSectionId] = useState(initialSectionId || 'worship');
  const [currentSubMenuId, setCurrentSubMenuId] = useState(initialSubMenuId || 'sunday-sermon');
  
  const [posts, setPosts] = useState<PostItem[]>(DEFAULT_POSTS);
  const [gallery, setGallery] = useState<any[]>(DEFAULT_GALLERY);
  const [resources, setResources] = useState<any[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsSnap = await getDocs(collection(db, 'posts'));
        if (!postsSnap.empty) {
          setPosts(postsSnap.docs.map(d => ({ id: d.id, ...d.data() } as PostItem)));
        }

        const galSnap = await getDocs(collection(db, 'gallery'));
        if (!galSnap.empty) {
          setGallery(galSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }

        const rSnap = await getDocs(collection(db, 'resources'));
        if (!rSnap.empty) {
          setResources(rSnap.docs.map(d => ({ id: d.id, ...d.data() })));
        }
      } catch (err) {
        console.warn('데이터 로드:', err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (initialSectionId) setCurrentSectionId(initialSectionId);
    if (initialSubMenuId) setCurrentSubMenuId(initialSubMenuId);
  }, [initialSectionId, initialSubMenuId]);

  // 04 사역과 선교에 [교회 자료실] 정식 신설
  const SECTIONS = {
    worship: {
      title: '예배와 말씀',
      subMenus: [
        { id: 'sunday-sermon', name: '주일예배', category: 'sunday' },
        { id: 'wednesday-sermon', name: '수요행복예배', category: 'wednesday' },
        { id: 'friday-sermon', name: '금요기도회', category: 'friday' },
        { id: 'evening-prayer', name: '화·목 저녁기도회', category: 'tue-thu' },
      ],
    },
    qt: {
      title: '날마다 큐티',
      subMenus: [
        { id: 'qt-guide', name: '큐티인 안내' },
        { id: 'qt-blog', name: '오늘의 묵상(블로그)' },
      ],
    },
    community: {
      title: '공동체와 양육',
      subMenus: [
        { id: 'cell-couple', name: '부부·가정 목장', category: 'cell-couple' },
        { id: 'cell-young', name: '청년·직장 목장', category: 'cell-young' },
        { id: 'discipleship-think', name: '10주 기초 신앙양육' },
      ],
    },
    ministry: {
      title: '사역과 선교',
      subMenus: [
        { id: 'ministry-team', name: '사역부서 안내', category: 'ministry' },
        { id: 'qt-school-dept', name: '큐티스쿨 (다음세대)' },
        { id: 'mission-local', name: '선교 및 지역 구제', category: 'mission' },
        { id: 'church-gallery', name: '시온성 갤러리' },
        { id: 'church-resources', name: '교회 자료실 (주보·서식)' }, // 누적 주보 및 서식 보관소
      ],
    },
    newcomers: {
      title: '새가족 안내',
      subMenus: [
        { id: 'newcomers-welcome', name: '처음 오신 분께' },
      ],
    },
    about: {
      title: '교회소개',
      subMenus: [
        { id: 'vision-slogan', name: '2026 비전 및 표어' },
        { id: 'church-leaders', name: '섬기는 분들' },
        { id: 'worship-table-grid', name: '예배 시간표' },
        { id: 'offering-grid', name: '온라인 헌금 계좌' },
        { id: 'map-location', name: '오시는 길' },
      ],
    },
  };

  const currentSection = SECTIONS[currentSectionId as keyof typeof SECTIONS] || SECTIONS.worship;
  const currentSubMenu = currentSection.subMenus.find((m) => m.id === currentSubMenuId) || currentSection.subMenus[0];

  const handleSubMenuClick = (menu: any) => {
    setSelectedPost(null);
    setSelectedResource(null);
    if (menu.id === 'qt-blog') {
      window.open(CHURCH_INFO.meditationBlogUrl, '_blank');
      return;
    }
    setCurrentSubMenuId(menu.id);
  };

  const getFilteredPosts = () => {
    let cat = 'sunday';
    if (currentSubMenuId === 'sunday-sermon') cat = 'sunday';
    else if (currentSubMenuId === 'wednesday-sermon') cat = 'wednesday';
    else if (currentSubMenuId === 'friday-sermon') cat = 'friday';
    else if (currentSubMenuId === 'evening-prayer') cat = 'tue-thu';
    else if (currentSubMenuId === 'cell-couple') cat = 'cell-couple';
    else if (currentSubMenuId === 'cell-young') cat = 'cell-young';
    else if (currentSubMenuId === 'ministry-team') cat = 'ministry';
    else if (currentSubMenuId === 'mission-local') cat = 'mission';

    return posts.filter(p => p.category === cat && p.title.toLowerCase().includes(searchKeyword.toLowerCase()));
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('131020284906');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const filteredList = getFilteredPosts();

  return (
    <div className="bg-[#F9FAFB] min-h-screen py-8 sm:py-12 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        
        {/* 홈 복귀 바 */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#C49A45] transition-colors bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈으로 돌아가기</span>
          </button>
        </div>

        {/* 2단 레이아웃 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LNB */}
          <aside className="w-full lg:w-[260px] shrink-0 space-y-4">
            <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-5 text-white shadow-md">
              <span className="text-[10px] font-bold text-[#C49A45] uppercase tracking-wider block mb-1">
                SECTION MENU
              </span>
              <h2 className="text-xl font-extrabold tracking-tight">{currentSection.title}</h2>
            </div>

            <nav className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs">
              <ul className="space-y-1 list-none">
                {currentSection.subMenus.map((menu) => {
                  const isActive = menu.id === currentSubMenuId;
                  return (
                    <li key={menu.id}>
                      <button
                        onClick={() => handleSubMenuClick(menu)}
                        className={`w-full text-left px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-amber-50 text-[#A27B2B] font-bold border border-amber-200/60 shadow-2xs'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#C49A45]' : 'bg-slate-300'}`} />
                          {menu.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* 메인 뷰 */}
          <main className="flex-1 w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs">
            {/* 브레드크럼 */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-3 border-b border-slate-100">
              <button onClick={onGoHome} className="hover:text-slate-700 cursor-pointer flex items-center gap-1">
                <Home className="w-3.5 h-3.5" />
                <span>홈</span>
              </button>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span>{currentSection.title}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
              <span className="text-slate-800 font-bold">{currentSubMenu.name}</span>
            </div>

            {/* 통합 교회 자료실 (주보 누적 + 서식 다운로드) */}
            {currentSubMenuId === 'church-resources' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">교회 자료실 (주보·서식)</h1>
                  <p className="text-xs sm:text-sm text-slate-500">
                    매주 발행된 주보가 날짜별로 보관되며, 행정 서식과 성경 훈련 자료를 열람 및 다운로드하실 수 있습니다.
                  </p>
                </div>

                {selectedResource ? (
                  <div className="space-y-5">
                    <button
                      onClick={() => setSelectedResource(null)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>자료 목록으로 돌아가기</span>
                    </button>
                    <div className="border-b pb-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-[#A27B2B]">{selectedResource.category}</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">{selectedResource.title}</h2>
                      <span className="text-xs text-slate-400 font-mono mt-1 block">등록일: {selectedResource.date}</span>
                    </div>

                    {/* 주보 면별 이미지 렌더링 */}
                    {selectedResource.images && selectedResource.images.length > 0 ? (
                      <div className="space-y-4">
                        {selectedResource.images.map((img: string, i: number) => (
                          <img key={i} src={img} alt={`주보 ${i+1}면`} className="w-full rounded-2xl border border-slate-200 shadow-md" />
                        ))}
                      </div>
                    ) : selectedResource.fileUrl ? (
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                        <p className="text-xs text-slate-600">첨부된 자료 파일이 있습니다.</p>
                        <a
                          href={selectedResource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md hover:bg-slate-800"
                        >
                          <Download className="w-4 h-4" />
                          <span>첨부 파일 다운로드 / 열람</span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                    {resources.length === 0 ? (
                      <div className="p-12 text-center text-slate-400 text-xs">현재 등록된 자료 및 주보가 없습니다.</div>
                    ) : (
                      resources.map((res) => (
                        <div
                          key={res.id}
                          onClick={() => setSelectedResource(res)}
                          className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-[#A27B2B]">{res.category}</span>
                              <strong className="text-sm sm:text-base font-bold text-slate-900 hover:text-[#C49A45]">{res.title}</strong>
                            </div>
                            <span className="text-[11px] text-slate-400 font-mono mt-1 block">등록일: {res.date}</span>
                          </div>

                          <span className="text-xs font-bold text-[#C49A45] shrink-0 flex items-center gap-1">
                            <span>자료 열람</span>
                            <ChevronRight className="w-4 h-4" />
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}

            {/* 시온성 갤러리 */}
            {currentSubMenuId === 'church-gallery' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">시온성 갤러리</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회의 은혜로운 사역 현장과 추억을 담은 사진첩입니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                  {gallery.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow group flex flex-col justify-between">
                      <div>
                        <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 space-y-1.5">
                          <span className="text-[11px] text-slate-400 font-mono block">{item.date}</span>
                          <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">{item.title}</h3>
                          {item.desc && <p className="text-xs text-slate-600 line-clamp-2">{item.desc}</p>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 큐티인 안내 */}
            {currentSubMenuId === 'qt-guide' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">큐티란?</h1>
                  <p className="text-xs sm:text-sm text-slate-500">말씀을 읽고, 묵상하고, 삶으로 살아내는 구속사 말씀 묵상입니다.</p>
                </div>
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 sm:p-8 text-white space-y-3 shadow-md">
                  <span className="text-[11px] font-bold text-amber-300 tracking-widest uppercase">WHAT IS QUIET TIME?</span>
                  <h2 className="text-xl sm:text-2xl font-black">날마다 촉촉이 적셔 주는 이슬비</h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                    QUIET TIME의 약자인 QT가 성경 묵상의 대명사로 불리는 이 시대에, 성경을 구속사적으로 자기에게 적용하며 읽어 가는 은혜의 호흡입니다. 날마다 촉촉이 적셔 주는 이슬비처럼 내 삶의 지경을 거룩으로 적셔갑니다.
                  </p>
                </div>
              </div>
            )}

            {/* 2026 비전 및 표어 */}
            {currentSubMenuId === 'vision-slogan' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">2026 비전 및 표어</h1>
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-center space-y-3">
                  <span className="text-xs font-bold text-[#A27B2B] tracking-widest uppercase">2026 CHURCH SLOGAN</span>
                  <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                    {CHURCH_INFO.slogan2026}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    "무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라" (골로새서 3:23)
                  </p>
                </div>
              </div>
            )}

            {/* 섬기는 분들 */}
            {currentSubMenuId === 'church-leaders' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">섬기는 분들</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회를 기쁨과 기도로 섬기는 교역자 및 당회원입니다.</p>
                </div>
                {['교역자', '시무장로', '원로·명예·은퇴장로'].map((groupName) => (
                  <div key={groupName} className="space-y-4">
                    <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#C49A45]" />
                      <span>{groupName}</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {CHURCH_STAFF.filter(s => s.group === groupName).map((staff, idx) => (
                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-300">
                            {staff.name.slice(0, 1)}
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-[#A27B2B] block">{staff.role}</span>
                            <strong className="text-base text-slate-900 block">{staff.name}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 예배 시간표 */}
            {currentSubMenuId === 'worship-table-grid' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">01 예배와 모임 안내</h1>
                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr><th className="p-3.5 sm:p-4">예배명</th><th className="p-3.5 sm:p-4">시간</th><th className="p-3.5 sm:p-4">장소</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">주일 1부 예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">주일 오전 10:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">주일 2부 예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">주일 오전 11:20</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">수요 행복예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">매주 수요일 저녁 8:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">금요 기도회</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">매주 금요일 밤 8:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 온라인 헌금 계좌 */}
            {currentSubMenuId === 'offering-grid' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">온라인 헌금 계좌</h1>
                <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold">
                    <CreditCard className="w-5 h-5 text-[#C49A45]" />
                    <span>신협 (교회 공식계좌)</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block mb-1">예금주: 대한예수교장로회 시온성교회</span>
                    <strong className="text-2xl sm:text-3xl font-black font-mono text-[#A27B2B] tracking-tight block">
                      131-020-284906
                    </strong>
                  </div>
                  <button
                    onClick={handleCopyAccount}
                    className="w-full py-2.5 rounded-xl bg-[#111827] text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-800"
                  >
                    {copiedAccount ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedAccount ? '계좌번호가 복사되었습니다' : '계좌번호 복사하기'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* 오시는 길 */}
            {currentSubMenuId === 'map-location' && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">오시는 길</h1>
                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C49A45]" />
                    <strong className="text-base text-slate-900">경기 하남시 서하남로 278-30 (광암동)</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 pl-7">
                    * 광암동 정수장 후문 맞은편에 위치하고 있습니다. (서하남 IC 3분 거리)
                  </p>
                </div>
              </div>
            )}

            {/* 일반 설교 글 상세 */}
            {selectedPost && (
              <div className="space-y-6">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>목록으로 돌아가기</span>
                </button>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{selectedPost.title}</h1>
                <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 border-b border-slate-100">
                  <span>작성자: {selectedPost.author}</span>
                  <span>|</span>
                  <span>날짜: {selectedPost.date}</span>
                  {selectedPost.scripture && <span>| 본문: {selectedPost.scripture}</span>}
                </div>

                {selectedPost.youtubeId && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black shadow-md">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${selectedPost.youtubeId}`}
                      title={selectedPost.title}
                      className="absolute inset-0 w-full h-full border-0"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            )}

            {/* 일반 설교/목장 게시판 목록 */}
            {!selectedPost && [
              'sunday-sermon', 'wednesday-sermon', 'friday-sermon', 'evening-prayer',
              'cell-couple', 'cell-young', 'ministry-team', 'mission-local'
            ].includes(currentSubMenuId) && (
              <div className="space-y-6">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentSubMenu.name}
                </h1>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-y border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                        <th className="py-3 px-3 text-center w-16">번호</th>
                        <th className="py-3 px-4">제목</th>
                        <th className="py-3 px-3 text-center w-24">작성자</th>
                        <th className="py-3 px-3 text-center w-24">날짜</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredList.length === 0 ? (
                        <tr><td colSpan={4} className="py-12 text-center text-slate-400 text-xs">등록된 게시글이 없습니다.</td></tr>
                      ) : (
                        filteredList.map((post) => (
                          <tr
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="hover:bg-slate-50 transition-colors cursor-pointer group"
                          >
                            <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">{post.no}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#C49A45] transition-colors">{post.title}</td>
                            <td className="py-3.5 px-3 text-center text-slate-500">{post.author}</td>
                            <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">{post.date}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
};
