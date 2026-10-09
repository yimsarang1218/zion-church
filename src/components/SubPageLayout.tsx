import React, { useState } from 'react';
import { 
  Home, ChevronRight, Search, ArrowLeft, Eye, Calendar, 
  User, Plus, Lock, Check, Video, Volume2, MapPin, 
  CreditCard, BookOpen, Heart, Sparkles, Navigation, Copy
} from 'lucide-react';
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

// 1. 초기 설교 데이터
const INITIAL_POSTS: PostItem[] = [
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

// 2. 새가족 소개 초기 데이터 (사진 제외, 텍스트 카드)
const INITIAL_NEWCOMERS = [
  { id: 'n1', name: '김성민 성도 가정', date: '2026.10.11', desc: '1목장 배정 | 주님의 이름으로 축복하고 환영합니다.' },
  { id: 'n2', name: '이수진 청년', date: '2026.10.04', desc: '청년목장 배정 | 믿음의 동역자로 함께 걷습니다.' },
];

// 3. 섬기는 분들 데이터
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
  
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);
  const [newcomers, setNewcomers] = useState(INITIAL_NEWCOMERS);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [copiedAccount, setCopiedAccount] = useState(false);

  // 관리자 모드 상태
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  
  // 관리자 폼 상태
  const [adminTargetCategory, setAdminTargetCategory] = useState('sunday');
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('관리자');
  const [newScripture, setNewScripture] = useState('');
  const [newYoutubeId, setNewYoutubeId] = useState('');
  const [newAudioUrl, setNewAudioUrl] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newNewcomerName, setNewNewcomerName] = useState('');
  const [newNewcomerDesc, setNewNewcomerDesc] = useState('');

  // 6대 섹션 및 하위 메뉴 규격
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
        { id: 'qt-bulletin', name: '금주의 주보 보기' },
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
        { id: 'mission-local', name: '국내외 선교 및 구제', category: 'mission' },
      ],
    },
    newcomers: {
      title: '새가족 안내',
      subMenus: [
        { id: 'newcomers-welcome', name: '처음 오신 분께' },
        { id: 'newcomers-intro', name: '새가족 소개' },
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
    if (menu.id === 'qt-bulletin') {
      onOpenBulletin();
      return;
    }
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

  const handleAdminAuth = () => {
    if (adminPassword.trim() === 'zion1218') {
      setIsAdminAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentSubMenuId === 'newcomers-intro') {
      if (!newNewcomerName.trim()) return;
      const newCard = {
        id: `nc_${Date.now()}`,
        name: newNewcomerName.trim(),
        date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
        desc: newNewcomerDesc.trim() || '시온성교회 새가족을 환영합니다.',
      };
      setNewcomers([newCard, ...newcomers]);
      setNewNewcomerName('');
      setNewNewcomerDesc('');
      setIsAdminOpen(false);
      alert('새가족 소개가 성공적으로 등록되었습니다.');
      return;
    }

    if (!newTitle.trim()) return;
    const newPost: PostItem = {
      id: `p_${Date.now()}`,
      no: posts.length + 1,
      category: adminTargetCategory,
      title: newTitle.trim(),
      author: newAuthor.trim(),
      date: new Date().toLocaleDateString('ko-KR').replace(/\. /g, '.').replace('.', ''),
      views: 1,
      content: newContent.trim(),
      scripture: newScripture.trim(),
      youtubeId: newYoutubeId.trim(),
      audioUrl: newAudioUrl.trim(),
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewScripture('');
    setNewYoutubeId('');
    setNewAudioUrl('');
    setNewContent('');
    setIsAdminOpen(false);
    alert('새 글이 성공적으로 등록되었습니다.');
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
        
        {/* 상단 컨트롤 바 */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#C49A45] transition-colors bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈으로 돌아가기</span>
          </button>

          <button
            onClick={() => setIsAdminOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#C49A45]" />
            <span>관리자 모드</span>
          </button>
        </div>

        {/* 2단 메인 레이아웃 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* 좌측 사이드바 (LNB) */}
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

          {/* 우측 메인 콘텐츠 */}
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

            {/* 1. 큐티인 안내 카드 */}
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
                    QUIET TIME의 약자인 QT가 성경 묵상의 대명사로 불리는 이 시대에, QT에 진정한 제목을 붙인다면 성경을 구속사적으로 자기에게 적용하며 읽어 가는 본음이라고 할 수 있습니다. 날마다 촉촉이 적셔 주는 이슬비처럼 내 삶의 지경을 거룩으로 적셔갑니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#A27B2B] flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-extrabold text-base text-slate-900">큐티(QT)는 생각하는 훈련입니다.</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        주님을 알기 전에 우리는 자기중심의 생각을 합니다. 그러나 주님을 만나면 '예수님이라면 나와 같은 상황을 어떻게 하셨을까?' 생각하게 됩니다. 내 생각에 치우치지 않고 예수님처럼 생각하려면 말씀묵상으로 찾아오시는 주님을 만나야 합니다.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-extrabold text-base text-slate-900">내 생각과 욕심을 가지치기 하는 훈련입니다.</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        성경을 구속사적인 관점으로 보면서 내 삶을 조명받는 것입니다. 매일 새롭게 거룩한 사람으로 재창조되는 신앙 훈련입니다. '생각(Think)'을 바르게 하면 '감사(Thank)'가 나오고 궁극적인 영혼 구원의 사명을 발견하게 됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">3</div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-extrabold text-base text-slate-900">아이부터 어른까지 온 교인이 같은 말씀으로 묵상합니다.</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        형식적인 큐티를 벗어나 '자신의 죄 보기'를 배웁니다. 내 죄를 고백하고 수치와 피를 드러낼 때, 진정한 죄사함과 용서, 자유와 회복, 영혼구원에 이르게 됩니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. THINK 양육 프로그램 카드 */}
            {currentSubMenuId === 'discipleship-think' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">양육 프로그램</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회에서 진행되고 있는 THINK 양육 프로그램입니다.</p>
                </div>

                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 sm:p-8 text-white text-center shadow-md">
                  <h2 className="text-xl sm:text-2xl font-black">시온성교회에서 진행되고 있는 THINK 양육 프로그램입니다.</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-20 h-28 rounded-xl bg-rose-500 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-sm">
                      <span className="text-[10px] tracking-widest">THINK</span>
                      <span className="text-xs mt-1">기초양육</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-extrabold text-slate-900">THINK 기초양육 (6주)</h3>
                        <span className="text-xs font-bold text-slate-400">01</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        기독교의 기본 교리를 배우는 과정으로, 세례 교육과정을 포함합니다. 세례를 받기 위해서는 이 과정을 반드시 수료해야 하며, 말씀 양육을 받기 전에 기초를 다지게 됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row gap-5 items-start">
                    <div className="w-20 h-28 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-sm">
                      <span className="text-[10px] tracking-widest">THINK</span>
                      <span className="text-xs mt-1">양육</span>
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-extrabold text-slate-900">THINK 양육 (10주)</h3>
                        <span className="text-xs font-bold text-slate-400">02</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        교회 등록 후 소그룹 목자의 추천을 받아 진행됩니다. 성경 지식을 가르치고 배우는 것만이 아니라 삶을 나누고 예수 그리스도를 본받는 훈련입니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. 처음 오신 분께 */}
            {currentSubMenuId === 'newcomers-welcome' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">처음 오신 분들</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회에 오신 여러분을 주님의 이름으로 진심으로 축복합니다.</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 sm:p-8 space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 text-center">교회에 처음 오셨나요?</h2>
                  
                  <div className="space-y-2.5 max-w-xl mx-auto pt-2">
                    {[
                      { step: 'Step 1', title: '예배순서 중 새가족 환영' },
                      { step: 'Step 2', title: '새가족실 이동 및 등록카드 작성' },
                      { step: 'Step 3', title: '담임목사님과의 만남' },
                      { step: 'Step 4', title: '새가족 교사 소개 및 소그룹 나눔' },
                      { step: 'Step 5', title: '목장 연결' },
                      { step: 'Step 6', title: '정식교인' },
                    ].map((s, idx) => (
                      <div key={idx} className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-2xs flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-bold text-xs">{s.step}</span>
                        <strong className="text-xs sm:text-sm text-slate-800">{s.title}</strong>
                      </div>
                    ))}
                  </div>

                  <p className="text-center text-xs text-slate-600 pt-4 leading-relaxed">
                    매 주일 모든 예배 후 새가족실에서 모임을 가지며 등록부터 수료까지 친절하게 안내해 드립니다.
                  </p>
                </div>
              </div>
            )}

            {/* 4. 새가족 소개 (텍스트 카드) */}
            {currentSubMenuId === 'newcomers-intro' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">새가족 소개</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회의 새가족을 기쁨으로 환영합니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {newcomers.map((nc) => (
                    <div key={nc.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs hover:shadow-xs transition-shadow">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span className="font-bold text-[#A27B2B]">새가족 등록</span>
                        <span>{nc.date}</span>
                      </div>
                      <h3 className="font-extrabold text-lg text-slate-900">{nc.name}</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{nc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. 2026 비전 및 표어 */}
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h3 className="font-bold text-slate-900">01. 복음의 본질</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">내 의와 공로가 아닌 오직 십자가 예수 그리스도의 구속 은혜를 붙듭니다.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h3 className="font-bold text-slate-900">02. 수용과 안식</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">판단과 정죄 대신 연약함을 있는 그대로 품고 참된 쉼을 누립니다.</p>
                  </div>
                  <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                    <h3 className="font-bold text-slate-900">03. 죄 고백과 회복</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">내 죄를 보고 솔직하게 직면할 때 참된 가정과 공동체의 회복이 시작됩니다.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. 섬기는 분들 */}
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
                        <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3.5 hover:shadow-xs transition-shadow">
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

            {/* 7. 예배 시간표 그리드 */}
            {currentSubMenuId === 'worship-table-grid' && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold text-[#C49A45] tracking-widest uppercase block mb-1">WORSHIP SCHEDULE</span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">01 예배와 모임 안내</h1>
                  <p className="text-xs text-slate-500 mt-1">영과 진리로 드려지는 은혜와 회복의 예배</p>
                </div>

                <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                  <table className="w-full text-xs sm:text-sm text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <tr>
                        <th className="p-3.5 sm:p-4">예배 및 모임명</th>
                        <th className="p-3.5 sm:p-4">시간</th>
                        <th className="p-3.5 sm:p-4">장소</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">주일 1부 예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">주일 오전 10:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">주일 2부 예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">주일 오전 11:20</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">다음세대 예배 (큐티스쿨)</td><td className="p-3.5 sm:p-4">주일 오후 12:00</td><td className="p-3.5 sm:p-4">3층 소예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">주일 양육반 (10주 과정)</td><td className="p-3.5 sm:p-4">주일 오후 01:00</td><td className="p-3.5 sm:p-4">각 교육실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">목장 모임 (소그룹 나눔)</td><td className="p-3.5 sm:p-4">주일 오후 02:30</td><td className="p-3.5 sm:p-4">각 목장 처소</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">수요 행복예배</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">매주 수요일 저녁 8:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">금요 기도회</td><td className="p-3.5 sm:p-4 text-amber-700 font-semibold">매주 금요일 밤 8:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                      <tr><td className="p-3.5 sm:p-4 font-bold text-slate-900">화목 기도회</td><td className="p-3.5 sm:p-4">화·목 저녁 밤 8:00</td><td className="p-3.5 sm:p-4">본당 대예배실</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 8. 온라인 헌금 계좌 (태그 짝 오류 완전 교정 구역) */}
            {currentSubMenuId === 'offering-grid' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">온라인 헌금 계좌</h1>
                  <p className="text-xs sm:text-sm text-slate-500">기쁨과 감사함으로 드리는 거룩한 물질의 헌신입니다.</p>
                </div>

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

            {/* 9. 오시는 길 */}
            {currentSubMenuId === 'map-location' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">오시는 길</h1>
                  <p className="text-xs sm:text-sm text-slate-500">하남 시온성교회로 오시는 길을 안내해 드립니다.</p>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#C49A45]" />
                    <strong className="text-base text-slate-900">경기 하남시 서하남로 278-30 (광암동)</strong>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-900 pl-7">
                    * <strong>광암동 정수장 후문 맞은편</strong>에 위치하고 있습니다. (서하남 IC에서 3분 거리)
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-slate-100 p-2">
                  <div className="aspect-[16/9] w-full bg-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-500 text-xs sm:text-sm space-y-3">
                    <MapPin className="w-8 h-8 text-rose-500 animate-bounce" />
                    <div className="text-center">
                      <strong className="text-slate-800 text-base block">하남 시온성교회</strong>
                      <span>광암동 정수장 맞은편 (서하남로 278-30)</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                      <a href="https://map.naver.com/v5/search/%ED%95%98%EB%82%A8%20%EC%8B%9C%EC%98%A8%EC%84%B1%EA%B5%90%ED%9A%8C" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs">네이버지도 길찾기</a>
                      <a href="https://map.kakao.com/link/search/%ED%95%98%EB%82%A8%20%EC%8B%9C%EC%98%A8%EC%84%B1%EA%B5%90%ED%9A%8C" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#FEE500] text-slate-900 font-bold text-xs">카카오맵 길찾기</a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 10. 일반 게시판 글 상세보기 */}
            {selectedPost && (
              <div className="space-y-6">
                <div className="pb-4 border-b border-slate-200">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 inline-flex items-center gap-1 mb-3 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>목록으로 돌아가기</span>
                  </button>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{selectedPost.title}</h1>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2">
                    <span>작성자: <strong>{selectedPost.author}</strong></span>
                    <span>|</span>
                    <span>날짜: {selectedPost.date}</span>
                    {selectedPost.scripture && (
                      <>
                        <span>|</span>
                        <span>본문: <strong className="text-amber-800">{selectedPost.scripture}</strong></span>
                      </>
                    )}
                  </div>
                </div>

                {/* 유튜브 영상 지원 */}
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

                {/* 화목 기도회 음성 지원 */}
                {selectedPost.audioUrl && (
                  <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-3">
                    <Volume2 className="w-5 h-5 text-amber-700 shrink-0" />
                    <audio controls className="w-full h-8">
                      <source src={selectedPost.audioUrl} type="audio/mpeg" />
                      브라우저가 오디오 재생을 지원하지 않습니다.
                    </audio>
                  </div>
                )}

                <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-sm leading-relaxed text-slate-800 whitespace-pre-wrap">
                  {selectedPost.content}
                </div>
              </div>
            )}

            {/* 11. 일반 게시판 목록 화면 */}
            {!selectedPost && [
              'sunday-sermon', 'wednesday-sermon', 'friday-sermon', 'evening-prayer',
              'cell-couple', 'cell-young', 'ministry-team', 'mission-local'
            ].includes(currentSubMenuId) && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
                    {currentSubMenu.name}
                  </h1>
                </div>

                {/* 검색창 */}
                <div className="flex items-center justify-end gap-2 pb-4 border-b border-slate-200">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="검색어를 입력해 주세요."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-56 pl-3 pr-8 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {/* 게시글 목록 표 */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-y border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                        <th className="py-3 px-3 text-center w-16">번호</th>
                        <th className="py-3 px-4">제목</th>
                        <th className="py-3 px-3 text-center w-24">작성자</th>
                        <th className="py-3 px-3 text-center w-24">날짜</th>
                        <th className="py-3 px-3 text-center w-16 hidden sm:table-cell">조회</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400 text-xs">
                            등록된 게시글이 없습니다. 우측 상단 관리자 모드에서 글을 등록해 주세요.
                          </td>
                        </tr>
                      ) : (
                        filteredList.map((post) => (
                          <tr
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className="hover:bg-slate-50 transition-colors cursor-pointer group"
                          >
                            <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">{post.no}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900 group-hover:text-[#C49A45] transition-colors">
                              <span className="line-clamp-1">{post.title}</span>
                            </td>
                            <td className="py-3.5 px-3 text-center text-slate-500">{post.author}</td>
                            <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs">{post.date}</td>
                            <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-xs hidden sm:table-cell">{post.views}</td>
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

        {/* 관리자 글쓰기 모달 */}
        {isAdminOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-[#C49A45]" />
                  <span>관리자 등록 모드</span>
                </h3>
                <button onClick={() => setIsAdminOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer text-sm font-bold">닫기</button>
              </div>

              {!isAdminAuthenticated ? (
                <div className="space-y-3 py-4">
                  <p className="text-xs text-slate-600">관리자 비밀번호를 입력해주세요.</p>
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
                <form onSubmit={handleAdminSubmit} className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                  {currentSubMenuId === 'newcomers-intro' ? (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">새가족 성함 / 가정명</label>
                        <input
                          type="text"
                          required
                          placeholder="예: 홍길동 성도 가정"
                          value={newNewcomerName}
                          onChange={(e) => setNewNewcomerName(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">설명 및 목장 배정</label>
                        <input
                          type="text"
                          placeholder="예: 2목장 배정 | 주님의 이름으로 축복합니다."
                          value={newNewcomerDesc}
                          onChange={(e) => setNewNewcomerDesc(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">등록할 카테고리</label>
                        <select
                          value={adminTargetCategory}
                          onChange={(e) => setAdminTargetCategory(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                        >
                          <option value="sunday">주일예배</option>
                          <option value="wednesday">수요행복예배</option>
                          <option value="friday">금요기도회</option>
                          <option value="tue-thu">화·목 저녁기도회</option>
                          <option value="cell-couple">부부·가정 목장</option>
                          <option value="cell-young">청년·직장 목장</option>
                          <option value="ministry">사역부서 안내</option>
                          <option value="mission">선교 및 구제</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">제목</label>
                        <input
                          type="text"
                          required
                          placeholder="제목을 입력하세요"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">작성자</label>
                          <input
                            type="text"
                            value={newAuthor}
                            onChange={(e) => setNewAuthor(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">성경 본문 (선택)</label>
                          <input
                            type="text"
                            placeholder="예: 창세기 35:1~3"
                            value={newScripture}
                            onChange={(e) => setNewScripture(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">유튜브 영상 ID (선택 - 주일/수요/금요)</label>
                        <input
                          type="text"
                          placeholder="예: 1azfrCPgb84"
                          value={newYoutubeId}
                          onChange={(e) => setNewYoutubeId(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">음성 파일 URL (선택 - 화목 기도회)</label>
                        <input
                          type="text"
                          placeholder="https://.../audio.mp3"
                          value={newAudioUrl}
                          onChange={(e) => setNewAudioUrl(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">내용 / 요약문</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="내용을 입력하세요."
                          value={newContent}
                          onChange={(e) => setNewContent(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm resize-none"
                        />
                      </div>
                    </>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#C49A45] hover:bg-[#A27B2B] text-white font-bold text-xs cursor-pointer"
                  >
                    등록 완료하기
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
