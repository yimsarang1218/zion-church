export interface WorshipSchedule {
  name?: string;
  title: string;
  time: string;
  location: string;
  isLive?: boolean;
}

export interface ChurchInfo {
  name: string;
  fullName: string;
  englishName: string;
  denomination: string;
  seniorPastor: string;
  associatePastor: string;
  slogan2026: string;
  themeVerse: string;
  address: string;
  addressDetail: string;
  trafficInfo: string;
  phone: string;
  counselingPhone: string;
  shuttlePhone: string;
  fax: string;
  mobile: string;
  email: string;
  kakaoTalkId: string;
  kakaoTalkUrl: string;
  youtubeUrl: string;
  youtubeHandle: string;
  meditationBlogUrl: string;
  meditationBlogNote: string;
  featuredSermonVideoId: string;
  featuredSermonTitle: string;
  featuredSermonScripture: string;
  featuredSermonUrl: string;
}

export const CHURCH_INFO: ChurchInfo = {
  name: '하남 시온성교회',
  fullName: '대한예수교장로회(합동) 하남 시온성교회',
  englishName: 'ZION PRESBYTERIAN CHURCH',
  denomination: '대한예수교장로회(합동)',
  seniorPastor: '채준희',
  associatePastor: '임사랑',
  slogan2026: '주께 하듯 기쁨으로 함께 걷는 행복한 공동체(골3:23)',
  themeVerse: '너희는 택하신 족속이요 왕 같은 제사장들이요 거룩한 나라요 그의 소유가 된 백성이니 (벧전 2:9)',
  address: '경기도 하남시 서하남로 278-30',
  addressDetail: '(광암동)',
  trafficInfo: '서하남IC 3분 거리',
  phone: '010-2741-2938',
  counselingPhone: '010-2741-2938',
  shuttlePhone: '010-4707-5395',
  fax: '02-408-2058',
  mobile: '010-2741-2938',
  email: 'zionchurchlove@gmail.com',
  kakaoTalkId: 'limsarang1218',
  kakaoTalkUrl: 'https://open.kakao.com',
  youtubeUrl: 'https://youtube.com/@zionchurch_s2?si=9fTATuc3BomIJ6Yo',
  youtubeHandle: '@zionchurch_s2',
  meditationBlogUrl: 'https://blog.naver.com/yimsa_rang',
  meditationBlogNote: '매일 묵상글이 올라오는 블로그 (월-금)',
  featuredSermonVideoId: 'AhlUN_aItKE',
  featuredSermonTitle: '도무지 이해가 안된다고요?',
  featuredSermonScripture: '로마서 9장 7-13절',
  featuredSermonUrl: 'https://youtu.be/AhlUN_aItKE',
};

export const WORSHIP_SCHEDULES: {
  sunday: WorshipSchedule[];
  weekday: WorshipSchedule[];
  nextGen?: WorshipSchedule[];
} = {
  sunday: [
    { name: '주일 1부 예배', title: '주일 1부 예배', time: '오전 10:00', location: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '주일 2부 예배', title: '주일 2부 예배', time: '오전 11:20', location: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '큐티스쿨 (교회학교)', title: '큐티스쿨 (교회학교)', time: '오후 12:00', location: '3층 소예배실 (어린이·청소년)', isLive: false },
    { name: '주일 양육반(10주 과정)', title: '주일 양육반(10주 과정)', time: '오후 01:00', location: '소그룹실', isLive: false },
    { name: '사랑방 모임', title: '사랑방 모임', time: '오후 02:30', location: '본당 2층 및 각 모임실', isLive: false },
  ],
  weekday: [
    { name: '수요행복예배', title: '수요행복예배', time: '수요일 오후 08:00', location: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '금요예배', title: '금요예배', time: '금요일 오후 08:00', location: '본당 2층 / 실시간 온라인', isLive: true },
    { name: '저녁 기도회', title: '저녁 기도회', time: '화, 목 오후 08:00', location: '본당 2층', isLive: false },
  ],
  nextGen: [
    { name: '큐티스쿨 (어린이/청소년)', title: '큐티스쿨 (어린이/청소년)', time: '주일 오후 12:00', location: '3층 소예배실' },
  ],
};

export const BANK_ACCOUNTS = [
  {
    type: '일반헌금',
    bank: '신협',
    bankName: '신협',
    accountNumber: '131-020-284906',
    holder: '대한예수교장로회 시온성교회',
    purpose: '일반헌금 (십일조, 감사, 주일, 건축, 선교, 구제 등)',
    badge: '대표 계좌',
    note: '입금 시 성함과 헌금 구분을 함께 적어주세요 (예: 홍길동십일조)',
  },
];

export const CHURCH_LEADERS = {
  pastors: [
    { role: '담임목사', name: '채준희' },
    { role: '동사목사', name: '임사랑' },
  ],
  elders: [
    { role: '원로장로', names: ['임원묵'] },
    { role: '명예장로', names: ['진종원'] },
    { role: '은퇴장로', names: ['김승연', '강태붕'] },
    { role: '시무장로', names: ['이영재', '정호성'] },
  ],
};

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  description: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: '시온성교회 창립 감사예배 및 오찬',
    category: '행사',
    date: '2026.10',
    imageUrl: '창립.jpg',
    description: '하나님의 은혜 가운데 드려진 창립 기념 감사예배와 성도들의 따뜻한 애찬 교제',
  },
  {
    id: 'g2',
    title: '다음세대 큐티스쿨 성경학교',
    category: '교육',
    date: '2026.09',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: '3층 소예배실에서 말씀으로 꿈을 키우는 어린이·청소년 큐티스쿨',
  },
  {
    id: 'g3',
    title: '사랑방 목장 야외 나눔 모임',
    category: '공동체',
    date: '2026.09',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    description: '가면을 벗고 솔직한 삶과 기도를 나누는 따뜻한 목장 공동체',
  },
  {
    id: 'g4',
    title: '수요행복예배 찬양과 기도',
    category: '예배',
    date: '2026.10',
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=800&q=80',
    description: '성령의 임재와 치유가 있는 은혜로운 찬양과 뜨거운 중보기도의 시간',
  },
];
