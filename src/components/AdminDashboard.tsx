import React, { useState, useEffect } from 'react';
import { 
  Lock, Save, Image as ImageIcon, BookOpen, 
  Menu as MenuIcon, Check, Loader2, X, RefreshCw 
} from 'lucide-react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'main' | 'bulletin' | 'menu'>('main');

  // 사이트 설정 상태값
  const [heroBannerUrl, setHeroBannerUrl] = useState('/main-church-banner.png');
  const [sloganText, setSloganText] = useState('주께 하듯 기쁨으로 함께 걷는 행복한 공동체 (골3:23)');
  const [bulletinDate, setBulletinDate] = useState('2026년 10월 11일 주보');
  const [bulletinImagesText, setBulletinImagesText] = useState('');
  
  const [isSaving, setIsSaving] = useState(false);

  // Firestore에서 현재 사이트 설정 실시간 불러오기
  useEffect(() => {
    if (!isOpen) return;

    const loadSettings = async () => {
      try {
        const docRef = doc(db, 'site_settings', 'main_config');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroBannerUrl) setHeroBannerUrl(data.heroBannerUrl);
          if (data.sloganText) setSloganText(data.sloganText);
          if (data.bulletinDate) setBulletinDate(data.bulletinDate);
          if (Array.isArray(data.bulletinImages)) {
            setBulletinImagesText(data.bulletinImages.join('\n'));
          }
        }
      } catch (err) {
        console.warn('설정 불러오기 실패:', err);
      }
    };

    loadSettings();
  }, [isOpen]);

  const handleLogin = () => {
    if (password.trim().toLowerCase() === 'zion1218') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  // 원클릭 실시간 저장 (Firestore 영구 보관)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const parsedBulletins = bulletinImagesText
        .split('\n')
        .map(url => url.trim())
        .filter(url => url.length > 0);

      const configData = {
        heroBannerUrl: heroBannerUrl.trim(),
        sloganText: sloganText.trim(),
        bulletinDate: bulletinDate.trim(),
        bulletinImages: parsedBulletins,
        updatedAt: new Date().toISOString(),
      };

      await setDoc(doc(db, 'site_settings', 'main_config'), configData, { merge: true });
      alert('홈페이지 설정이 실시간으로 저장되었습니다! 새로고침 시 모든 사용자에게 즉시 적용됩니다.');
    } catch (err) {
      console.error('저장 실패:', err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* 헤더 */}
        <div className="bg-[#111827] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C49A45]" />
            <h2 className="font-extrabold text-base">시온성교회 통합 관리자 대시보드 (CMS)</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. 로그인 전 */}
        {!isAuthenticated ? (
          <div className="p-8 space-y-4 max-w-sm mx-auto text-center my-auto">
            <p className="text-sm font-semibold text-slate-700">관리자 비밀번호를 입력해 주세요.</p>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#C49A45]"
            />
            <button
              onClick={handleLogin}
              className="w-full py-2.5 rounded-xl bg-[#111827] text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
            >
              대시보드 접속
            </button>
          </div>
        ) : (
          /* 2. 로그인 후 편집 폼 */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* 탭 전환 */}
            <div className="flex border-b border-slate-200 gap-2">
              <button
                onClick={() => setActiveTab('main')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'main' ? 'border-[#C49A45] text-[#A27B2B]' : 'border-transparent text-slate-500'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>메인 배너 & 표어 편집</span>
              </button>
              <button
                onClick={() => setActiveTab('bulletin')}
                className={`pb-2.5 px-3 text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer border-b-2 transition-colors ${
                  activeTab === 'bulletin' ? 'border-[#C49A45] text-[#A27B2B]' : 'border-transparent text-slate-500'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>금주의 주보 편집</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              {/* [탭 1] 메인 화면 설정 */}
              {activeTab === 'main' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      메인 배너 이미지 URL
                    </label>
                    <input
                      type="text"
                      value={heroBannerUrl}
                      onChange={(e) => setHeroBannerUrl(e.target.value)}
                      placeholder="/main-church-banner.png 또는 이미지 링크"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      * 깃허브에 올린 파일 경로(`/main-church-banner.png`)나 네이버 블로그 복사 링크를 붙여넣으면 메인 사진이 즉시 바뀝니다.
                    </p>
                  </div>

                  {/* 현재 설정된 배너 미리보기 */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현재 적용된 배너 미리보기</label>
                    <div className="aspect-[21/9] w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                      <img src={heroBannerUrl} alt="배너 미리보기" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      2026년 교회 표어 문구
                    </label>
                    <input
                      type="text"
                      value={sloganText}
                      onChange={(e) => setSloganText(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm"
                    />
                  </div>
                </div>
              )}

              {/* [탭 2] 주보 설정 */}
              {activeTab === 'bulletin' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">주보 날짜 / 회차</label>
                    <input
                      type="text"
                      value={bulletinDate}
                      onChange={(e) => setBulletinDate(e.target.value)}
                      placeholder="예: 2026년 10월 11일 주보"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-700">
                        주보 이미지 링크 (면별로 엔터 줄바꿈)
                      </label>
                      <span className="text-[11px] text-[#A27B2B] font-semibold">1면, 2면 순서대로 입력</span>
                    </div>
                    <textarea
                      rows={5}
                      value={bulletinImagesText}
                      onChange={(e) => setBulletinImagesText(e.target.value)}
                      placeholder={`https://postfiles.pstatic.net/... (1면)\nhttps://postfiles.pstatic.net/... (2면)`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono leading-relaxed resize-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                      * 네이버 블로그에 주보 사진을 올린 뒤 우클릭 ➔ '이미지 주소 복사'를 줄바꿈으로 넣어주시면 주보 팝업에 즉시 반영됩니다.
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-3 rounded-xl bg-[#C49A45] hover:bg-[#A27B2B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-md transition-all"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>저장 및 동기화 중...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>홈페이지에 실시간 반영하기 (저장)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
