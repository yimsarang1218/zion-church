import React, { useState, useEffect } from 'react';
import { 
  Home, ChevronRight, Search, ArrowLeft, Calendar, 
  Check, Video, Volume2, MapPin, CreditCard, Heart, 
  Copy, Download, ExternalLink, BookOpen, Layers
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

const DEFAULT_NEWCOMERS = [
  { id: 'n1', name: '김성민 성도 가정', date: '2026.10.11', desc: '1목장 배정 | 주님의 이름으로 축복하고 환영합니다.' },
  { id: 'n2', name: '이수진 청년', date: '2026.10.04', desc: '청년목장 배정 | 믿음의 동역자로 함께 걷습니다.' },
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
  // newfamily와 newcomers 상호 완벽 호환
  const resolvedSectionId = (initialSectionId === 'newcomers' || initialSectionId === 'newfamily') ? 'newfamily' : initialSectionId;
  const [currentSectionId, setCurrentSectionId] = useState(resolvedSectionId || 'worship');
  const [currentSubMenuId, setCurrentSubMenuId] = useState(initialSubMenuId || 'sunday-sermon');
  
  const [posts, setPosts] = useState<PostItem[]>(DEFAULT_POSTS);
  const [newcomers, setNewcomers] = useState<any[]>(DEFAULT_NEWCOMERS);
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

        const newSnap = await getDocs(collection(db, 'newcomers'));
        if (!newSnap.empty) {
          setNewcomers(newSnap.docs.map(d => ({ id: d.id, ...d.data() })));
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
    const targetSection = (initialSectionId === 'newcomers' || initialSectionId === 'newfamily') ? 'newfamily' : initialSectionId;
    if (targetSection) setCurrentSectionId(targetSection);
    if (initialSubMenuId) setCurrentSubMenuId(initialSubMenuId);
  }, [initialSectionId, initialSubMenuId]);

  // 6대 섹션 및 하위 메뉴 규격 (레퍼런스 100% 반영)
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
        { id: 'qt-guide', name: '큐티란?' },
        { id: 'qt-how', name: '큐티는 이렇게' },
        { id: 'qt-deep', name: '큐티 제대로 하기' },
        { id: 'qt-blog', name: '오늘의 묵상(블로그)' },
      ],
    },
    community: {
      title: '공동체와 양육',
      subMenus: [
        { id: 'cell-couple', name: '부부·가정 목장', category: 'cell-couple' },
        { id: 'cell-young', name: '청년·직장 목장', category: 'cell-young' },
        { id: 'discipleship-think', name: 'THINK 양육 프로그램' },
      ],
    },
    ministry: {
      title: '사역과 선교',
      subMenus: [
        { id: 'ministry-team', name: '사역부서 안내', category: 'ministry' },
        { id: 'qt-school-dept', name: '큐티스쿨 (다음세대)' },
        { id: 'mission-local', name: '선교 및 지역 구제', category: 'mission' },
        { id: 'church-gallery', name: '시온성 갤러리' },
        { id: 'church-resources', name: '교회 자료실 (주보·서식)' },
      ],
    },
    newfamily: {
      title: '새가족 안내',
      subMenus: [
        { id: 'newfamily-welcome', name: '처음 오신 분들' },
        { id: 'newfamily-intro', name: '새가족 소개' },
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
        
        {/* 상단 홈 복귀 바 */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-[#C49A45] transition-colors bg-white px-3.5 py-1.5 rounded-lg border border-slate-200 shadow-2xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>메인 홈으로 돌아가기</span>
          </button>
        </div>

        {/* 2단 메인 레이아웃 */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* LNB 사이드바 */}
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

            {/* ========================================================= */}
            {/* 02 날마다 큐티 1: 큐티란? (이슬비 묵상)                     */}
            {/* ========================================================= */}
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
                    날마다 촉촉이 적셔 주는 이슬비, 이것이 날마다의 성경 묵상이라고 할 수 있습니다. 오래된 내 가치관이 깨지기 위해서는 날마다 말씀을 조금씩 접어서 소화해(겔 3:3), 나에게 새로운 조각이 될 때 비로소 변화하는 것입니다. 말씀묵상(QT)으로 찾아오시는 주님을 만나 성경적 가치관으로 거룩한 삶을 누리게 됩니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col md:flex-row gap-5 items-start">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#A27B2B] flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-extrabold text-base text-slate-900">큐티(QT)는 생각하는 훈련입니다.</h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        주님을 알기 전에 우리는 자기중심의 생각을 합니다. 사건마다, 사람마다 자기 입장에서 생각하기에 다른 사람을 이해하지 못하고 원망과 불평의 올무에 갇히기 쉽습니다. 그러나 주님을 만나면 '예수님이라면 나와 같은 상황을 어떻게 하셨을까?' 생각하게 됩니다. 내 생각에 치우치지 않고 예수님처럼 생각하려면 말씀묵상으로 찾아오시는 주님을 만나야 합니다.
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

            {/* ========================================================= */}
            {/* 02 날마다 큐티 2: 큐티는 이렇게 (10단계 묵상법)             */}
            {/* ========================================================= */}
            {currentSubMenuId === 'qt-how' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">큐티는 이렇게</h1>
                  <p className="text-xs sm:text-sm text-slate-500">말씀을 읽고, 묵상하고, 삶으로 적용하는 10단계 큐티법입니다.</p>
                </div>

                <div className="p-6 sm:p-8 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                  <span className="text-xs font-bold text-[#A27B2B] tracking-widest uppercase">10 STEPS OF QT</span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">말씀을 읽고, 묵상하고, 삶으로 적용합니다.</h2>
                  <p className="text-xs sm:text-sm text-slate-600">
                    큐티인 교재의 실제 지면을 따라 매일의 묵상을 차근차근 시작해 보세요.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 pt-2">
                  {[
                    { step: '01', title: '기도듣기', desc: '조용한 시간과 장소를 마련하십시오. 성령의 조명을 구하며 마음을 열고 하나님의 음성을 들을 준비를 하십시오.' },
                    { step: '02', title: '본문읽기', desc: '본문을 최소 3번 이상 소리 내어 정독하십시오. 전체 흐름과 문맥 속에서 말씀하시는 바를 관찰합니다.' },
                    { step: '03', title: '큐티노트', desc: '말씀 중에 마음에 와닿는 구절, 단어, 느낌을 큐티 노트 여백에 자유롭게 밑줄 긋고 메모해 보세요.' },
                    { step: '04', title: '본문요약', desc: '오늘 본문의 줄거리를 짧은 문장으로 요약해 봅니다. 역사적 배경과 상황을 한눈에 파악합니다.' },
                    { step: '05', title: '질문하기', desc: '본문에서 하나님은 어떤 분이신지, 내게 주시는 교훈과 회개할 죄는 무엇인지 스스로에게 질문을 던집니다.' },
                    { step: '06', title: '묵상하기', desc: '질문의 답을 본문에서 찾고, 말씀의 거울에 내 삶을 비추어 봅니다. 구속사적으로 내 사건을 해석해 봅니다.' },
                    { step: '07', title: '적용하기', desc: '추상적인 결심이 아닌, 오늘 하루 구체적으로 실천할 수 있는 순종의 행동 1가지를 정합니다.' },
                    { step: '08', title: '말씀대로 기도하기', desc: '오늘 묵상한 말씀을 붙잡고 기도합니다. 내 죄를 회개하고, 말씀대로 살아갈 힘을 달라고 기도합니다.' },
                    { step: '09', title: '본문해설', desc: '교재 하단의 해설을 읽으며 내가 묵상한 내용과 비교하고, 성경적 바른 해석을 정리합니다.' },
                    { step: '10', title: '은혜나누기', desc: '하루 동안 실천한 적용과 깨달은 은혜를 가족, 사랑방 목장 식구들과 솔직하게 나눕니다.' },
                  ].map((item) => (
                    <div key={item.step} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start gap-4">
                      <span className="w-9 h-9 rounded-lg bg-amber-500/10 text-[#C49A45] font-black text-sm flex items-center justify-center shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900">{item.title}</h3>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 02 날마다 큐티 3: 큐티 제대로 하기                          */}
            {/* ========================================================= */}
            {currentSubMenuId === 'qt-deep' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">큐티 제대로 하기</h1>
                  <p className="text-xs sm:text-sm text-slate-500">지식으로 끝나는 성경공부가 아닌, 삶을 변화시키는 바른 큐티 훈련입니다.</p>
                </div>

                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 sm:p-8 text-white text-center space-y-2 shadow-md">
                  <h2 className="text-xl sm:text-2xl font-black">
                    "여러분은 아침에 일어나면 성경부터 보십니까, 신문부터 보십니까?"
                  </h2>
                  <p className="text-xs sm:text-slate-300">
                    세상 지식과 뉴스보다 먼저 주님의 말씀으로 하루의 우선순위를 세우는 것이 경건 훈련의 시작입니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">1. 교재 선택하기</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      구속사적 말씀 묵상을 돕는 정기 큐티 교재(큐티인)를 매달 준비하여 정해진 본문 본도를 따라 규칙적으로 묵상합니다.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">2. 3S 훈련 (Stop, Search, Submit)</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      • <strong>Stop</strong>: 내 모든 생각과 바쁜 일상을 멈추고 주님 앞에 엎드립니다.<br />
                      • <strong>Search</strong>: 본문 안에서 하나님의 뜻과 내 죄의 뿌리를 깊이 살핍니다.<br />
                      • <strong>Submit</strong>: 깨달아진 말씀 앞에 내 자존심과 고집을 꺾고 온전히 순종합니다.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">3. 관주와 성경 전체로 해석하기</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      어려운 구절이 나올 때 내 주관적인 생각으로 억지 해석하지 않고, 성경의 다른 구절(관주)과 십자가 예수 그리스도의 구속 역사에 연결하여 건강하게 해석합니다.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5">
                    <h3 className="font-extrabold text-base text-slate-900">4. 목장 공동체에서 검증받기</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      나 혼자만의 묵상은 자칫 독선이나 왜곡에 빠질 수 있습니다. 사랑방 목장 모임에서 서로의 묵상과 삶의 적용을 나누며 건강한 검증과 돌봄을 받습니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 03 공동체와 양육: THINK 양육 프로그램 5단계 로드맵        */}
            {/* ========================================================= */}
            {currentSubMenuId === 'discipleship-think' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">양육 프로그램</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회에서 진행되고 있는 THINK 양육 5대 과정입니다.</p>
                </div>

                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-2xl p-6 sm:p-8 text-white text-center shadow-md">
                  <h2 className="text-xl sm:text-2xl font-black">시온성교회에서 진행되고 있는 THINK 양육 프로그램입니다.</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { no: '01', title: 'THINK 기초양육 (6주)', color: 'bg-rose-500', desc: '기독교의 기본 교리를 배우는 과정으로, 세례 교육과정을 포함합니다. 세례를 받기 위해서는 이 과정을 반드시 수료해야 하며, 말씀 양육을 받기 전에 기초를 다지게 됩니다.' },
                    { no: '02', title: 'THINK 양육 (10주)', color: 'bg-blue-600', desc: '교회 등록 후 소그룹 목자의 추천을 받아 진행됩니다. 성경 지식을 가르치고 배우는 것만이 아니라 삶을 나누고 예수 그리스도를 본받는 훈련입니다.' },
                    { no: '03', title: 'THINK 양육교사 (10주)', color: 'bg-indigo-600', desc: '10주 양육을 수료한 성도가 다른 지체를 양육하는 교사로 헌신하기 위해 삶과 사명을 훈련하는 심화 과정입니다.' },
                    { no: '04', title: 'THINK 예비목자양육 I·II (총 20주)', color: 'bg-emerald-600', desc: '목장의 영적 리더로 세워지기 위한 소그룹 목회 철학과 구속사적 나눔을 집중적으로 훈련받는 핵심 지도자 과정입니다.' },
                    { no: '05', title: 'THINK 중보기도 (4주)', color: 'bg-amber-600', desc: '교회와 성도, 나라와 민족, 열방을 품고 기도의 골방에서 중보자로 서는 거룩한 호흡의 영적 훈련 과정입니다.' },
                  ].map((t) => (
                    <div key={t.no} className="p-5 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row gap-5 items-start">
                      <div className={`w-20 h-28 rounded-xl ${t.color} text-white flex flex-col items-center justify-center font-bold shrink-0 shadow-sm`}>
                        <span className="text-[10px] tracking-widest">THINK</span>
                        <span className="text-xs mt-1 text-center font-black px-1">{t.title.split(' ')[1]}</span>
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">{t.title}</h3>
                          <span className="text-xs font-bold text-slate-400 font-mono">{t.no}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{t.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 05 새가족 안내 1: 처음 오신 분들 (Step 1~6단계 로드맵)      */}
            {/* ========================================================= */}
            {currentSubMenuId === 'newfamily-welcome' && (
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
                    교회 교인으로서 모든 특권을 누리려면 꼭 거쳐야 하는 과정이 있다는 것을 아시나요? 바로 <strong>'새가족모임'</strong>입니다.<br />
                    매 주일 모든 예배 후 새가족실에서 모임을 가지며 등록부터 수료까지 친절하게 안내해 드립니다.
                  </p>
                </div>
              </div>
            )}

            {/* ========================================================= */}
            {/* 05 새가족 안내 2: 새가족 소개                              */}
            {/* ========================================================= */}
            {currentSubMenuId === 'newfamily-intro' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">새가족 소개</h1>
                  <p className="text-xs sm:text-sm text-slate-500">시온성교회의 새가족을 기쁨으로 환영합니다.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {newcomers.map((nc) => (
                    <div key={nc.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-2 shadow-2xs hover:shadow-xs transition-shadow relative">
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

            {/* ========================================================= */}
            {/* 04 사역과 선교: 교회 자료실 (주보·서식)                    */}
            {/* ========================================================= */}
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
