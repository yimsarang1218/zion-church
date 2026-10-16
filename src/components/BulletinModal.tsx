import React, { useState } from 'react';
import { X, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface BulletinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulletinModal: React.FC<BulletinModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'page1' | 'page2'>('page1');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 overflow-y-auto animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* 모달 상단 헤더 */}
        <div className="bg-[#111827] text-white p-3.5 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-[#C49A45] shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm sm:text-lg leading-tight">
                  금주의 주보 (2026년 10월 18일)
                </h3>
                <p className="text-[11px] text-slate-400 hidden sm:block">
                  {CHURCH_INFO.name} | {CHURCH_INFO.slogan2026}
                </p>
              </div>
            </div>
            {/* 모바일 닫기 버튼 */}
            <button
              onClick={onClose}
              className="sm:hidden p-1 text-slate-400 hover:text-white rounded-lg cursor-pointer"
              aria-label="주보 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            {/* 1면 / 2면 전환 버튼 */}
            <div className="flex bg-slate-800 rounded-lg p-0.5 sm:p-1 border border-slate-700 text-xs w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('page1')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer text-center text-xs ${
                  activeTab === 'page1' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                1면 (교회소식)
              </button>
              <button
                onClick={() => setActiveTab('page2')}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded-md font-bold transition-all cursor-pointer text-center text-xs ${
                  activeTab === 'page2' ? 'bg-[#C49A45] text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                2면 (예배순서)
              </button>
            </div>
            <button
              onClick={onClose}
              className="hidden sm:block p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="주보 닫기"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* 주보 본문 영역 */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#F3F4F6]">
          {activeTab === 'page1' ? (
            /* ========================================================= */
            /* 1면: 교회소식, 일정, 교우동정, 예배시간, 섬기는 분들     */
            /* ========================================================= */
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-4 sm:p-8 max-w-3xl mx-auto text-slate-800 font-sans text-xs sm:text-sm">
              <div className="border-b-2 border-slate-800 pb-3 sm:pb-4 mb-4 sm:mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2.5 sm:gap-4">
                  <p className="text-xs font-semibold text-slate-700 leading-relaxed [word-break:keep-all]">
                    * 오늘 저희 교회를 처음 방문하신 모든 분들을 주님의 이름으로 환영합니다. 삼위일체 하나님께 신령과 진정으로 예배합니다.
                  </p>
                  <div className="sm:text-right shrink-0 w-full sm:w-auto">
                    <span className="font-bold text-slate-800 text-xs block mb-1">2026년 10월 18일</span>
                    <span className="text-[11px] text-[#A27B2B] font-bold inline-block sm:block bg-amber-50 px-2 py-0.5 rounded border border-amber-200 [word-break:keep-all]">
                      2026 표어: 주께 하듯 기쁨으로 함께 걷는 행복한 공동체(골3:23)
                    </span>
                  </div>
                </div>
              </div>

              {/* 교회 대제목 */}
              <div className="text-center my-4 sm:my-6">
                <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  시 온 성 교 회
                </h2>
              </div>

              {/* 광고 및 교회 소식 */}
              <div className="space-y-3.5 mb-6 sm:mb-8 bg-slate-50 p-3.5 sm:p-5 rounded-lg border border-slate-200">
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                    1. 제23회 THINK 목회자 세미나 참석 안내
                  </h4>
                  <p className="text-slate-600 pl-3 leading-relaxed [word-break:keep-all]">
                    김미진 권사님, 배영선 권사님, 이명주 권사님께서 세미나에 참석하십니다. 목장이 더욱 든든히 세워지는 은혜의 시간이 되도록 기도해 주시기 바랍니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                    2. 결혼식 안내
                  </h4>
                  <p className="text-slate-600 pl-3 leading-relaxed [word-break:keep-all]">
                    박미옥 권사 장녀 <strong>김슬기 청년</strong>이 10월 25일 오후 2시 40분에 <strong>더 베네치아 3층 베네치아 홀</strong>에서 결혼식이 있습니다.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                    3. 중보기도팀 모집 안내
                  </h4>
                  <p className="text-slate-600 pl-3 leading-relaxed [word-break:keep-all]">
                    예배를 위해 기도하며, 시온성교회 환우들의 회복과 건강을 위해 함께 중보할 성도님들을 모집합니다. 기도로 예배를 세우는 자리에 많은 관심과 참여 바랍니다. (○문의: 각 목장의 목자)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                    4. 11월 큐티인 구매 안내
                  </h4>
                  <p className="text-slate-600 pl-3 leading-relaxed [word-break:keep-all]">
                    11월 큐티인 구매를 희망하시는 성도님들은 박은영 교육위원장에게 문의해 주시기 바랍니다. (판매 장소: 2층 (구)방송실)
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C49A45]" />
                    5. 홈페이지 제작 안내
                  </h4>
                  <p className="text-slate-600 pl-3 leading-relaxed [word-break:keep-all]">
                    우리 교회의 따뜻한 소식과 추억을 담아 교회 홈페이지를 새로 제작 중에 있습니다. 우리 성도 여러분의 밝은 모습과 소중한 교제의 순간이 담긴 사진을 보내주세요.<br />
                    ○ 모집 사진 : 예배, 부서 모임, 봉사, 야외행사 등등<br />
                    ○ 문의: 허지우 청년 010-9899-9430 (huhjuworld@gmail.com)
                  </p>
                </div>
              </div>

              {/* 예배시간 안내 & 섬기는이들 / 교우동정 테이블 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <div className="bg-slate-100 font-bold px-3 py-1.5 border-b border-slate-200 text-xs text-slate-800">
                    ◆ 예배시간 안내
                  </div>
                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-slate-100">
                        <td className="p-2 font-semibold bg-slate-50">주일 1부 예배</td>
                        <td className="p-2">오전 10:00</td>
                        <td className="p-2 font-semibold bg-slate-50">큐티스쿨</td>
                        <td className="p-2">오후 12:00</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="p-2 font-semibold bg-slate-50">주일 2부 예배</td>
                        <td className="p-2">오전 11:20</td>
                        <td className="p-2 font-semibold bg-slate-50">수요 행복 예배</td>
                        <td className="p-2">오후 8:00</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="p-2 font-semibold bg-slate-50">사랑방 모임</td>
                        <td className="p-2">오후 14:30</td>
                        <td className="p-2 font-semibold bg-slate-50">금요 예배</td>
                        <td className="p-2">오후 8:00</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-semibold bg-slate-50">저녁 기도회(화,목)</td>
                        <td className="p-2">오후 8:00</td>
                        <td className="p-2 font-semibold bg-slate-50">주일 양육반</td>
                        <td className="p-2">오후 13:00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="bg-slate-100 font-bold px-3 py-1.5 border-b border-slate-200 text-xs text-slate-800">
                      섬기는 이들 & 교우동정
                    </div>
                    <div className="p-2.5 space-y-1.5 text-xs">
                      <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span><strong>담임목사:</strong> 채준희 | <strong>동사목사:</strong> 임사랑</span>
                      </div>
                      <div className="text-[11px] text-slate-600 space-y-0.5">
                        <div><strong>원로장로:</strong> 임원묵 | <strong>명예장로:</strong> 진종원</div>
                        <div><strong>은퇴장로:</strong> 김승연, 강태봉 | <strong>시무장로:</strong> 이영재, 정호성</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-2 border-t border-slate-200 text-[11px] space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 min-w-[50px]">환 우:</span>
                      <span className="text-slate-600">이경순 임원묵</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 min-w-[50px]">결 혼:</span>
                      <span className="text-slate-600">김슬기 청년 (10/25)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 min-w-[50px]">10월 3주:</span>
                      <span className="text-amber-800 font-semibold">THINK 목회 세미나 (19-22)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-800 min-w-[50px]">10월 4주:</span>
                      <span className="text-slate-600">십시일반 / 홈목장 모임</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 하단 주소 */}
              <div className="mt-4 sm:mt-6 pt-3 border-t border-slate-200 text-center text-[11px] sm:text-xs text-slate-500 [word-break:keep-all]">
                하남시 서하남로 278-30 | T. 02)408-1191 | F. 02)408-2058 | 홈페이지 WWW.ZIONCHURCH.KR
              </div>
            </div>
          ) : (
            /* ========================================================= */
            /* 2면: 예배순서 & THINK 세미나 & 예배위원                  */
            /* ========================================================= */
            <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-4 sm:p-8 max-w-3xl mx-auto text-slate-800 font-sans text-xs sm:text-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* 좌측: 예배 순서 */}
                <div className="space-y-3">
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-xs border-b border-slate-200 flex justify-between items-center">
                      <span>◆ 주일 1부 예배</span>
                      <span className="text-slate-500 font-normal">[오전 10시]</span>
                    </div>
                    <div className="p-2.5 text-xs space-y-1">
                      <div><strong>경배와 찬양:</strong> 청년 아가페 찬양단</div>
                      <div><strong>성경 봉독:</strong> 신명기 33장 12~19절</div>
                      <div><strong>말씀 선포:</strong> <span className="text-amber-800 font-bold">‘여호와의 사랑을 입은 자’</span> (임사랑 목사)</div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-xs border-b border-slate-200 flex justify-between items-center">
                      <span>◆ 주일 2부 예배</span>
                      <span className="text-slate-500 font-normal">[오전 11시 20분]</span>
                    </div>
                    <div className="p-2.5 text-xs space-y-1">
                      <div><strong>경배와 찬양:</strong> 아가페 찬양단</div>
                      <div><strong>대표 기도:</strong> 김승연 장로</div>
                      <div><strong>교회 소식:</strong> 광고 | 환영 | 축하</div>
                      <div><strong>성경 봉독:</strong> 마태복음 16장 13~18절</div>
                      <div><strong>말씀 선포:</strong> <span className="text-amber-800 font-bold">‘우리를 향한 예수님의 소망’</span> (담임목사)</div>
                      <div><strong>헌금 기도:</strong> 김주진 안수집사 | <strong>축도:</strong> 담임목사</div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-xs border-b border-slate-200 flex justify-between items-center">
                      <span>◆ 주일 오후 예배</span>
                      <span className="text-slate-500 font-normal">[오후 14시 30분]</span>
                    </div>
                    <div className="p-2.5 text-xs space-y-1">
                      <div><strong>대표 기도:</strong> 박미옥 권사</div>
                      <div><strong>성경 봉독:</strong> 신명기 32장 43~52절</div>
                      <div><strong>말씀 선포:</strong> <span className="text-amber-800 font-bold">‘너희의 생명이니’</span> (담임목사)</div>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-xs border-b border-slate-200 flex justify-between items-center">
                      <span>◆ 수요 행복 예배</span>
                      <span className="text-slate-500 font-normal">[오후 8시 00분]</span>
                    </div>
                    <div className="p-2.5 text-xs space-y-1">
                      <div><strong>대표 기도:</strong> 배영선 권사 사랑방</div>
                      <div><strong>성경 봉독:</strong> 시편 70편 1~5절</div>
                      <div><strong>말씀 선포:</strong> <span className="text-amber-800 font-bold">‘하나님은 위대하시다’</span> (담임목사)</div>
                    </div>
                  </div>
                </div>

                {/* 우측: 23회 THINK 목회자 세미나 배너 & 예배위원 표 */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="rounded-xl p-5 bg-gradient-to-br from-[#8C5D36] to-[#4A2D16] text-white text-center shadow-md border border-amber-900/40 relative overflow-hidden">
                    <span className="text-xs font-bold text-amber-200 tracking-wider block mb-1">
                      23rd
                    </span>
                    <h3 className="text-3xl font-black tracking-tight mb-2">
                      THINK
                    </h3>
                    <div className="text-xs tracking-widest font-extrabold uppercase text-amber-100">
                      목회세미나
                    </div>
                    <div className="mt-4 pt-3 border-t border-white/20">
                      <div className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight">
                        10.19 - 10.22
                      </div>
                      <p className="text-[11px] text-amber-100/90 mt-1">
                        2026 우리들교회
                      </p>
                    </div>
                  </div>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-xs border-b border-slate-200">
                      ◆ 예배위원
                    </div>
                    <table className="w-full text-[11px] text-center">
                      <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                        <tr>
                          <th className="p-1.5 border-r border-slate-200">날 짜</th>
                          <th className="p-1.5 border-r border-slate-200">대표기도</th>
                          <th className="p-1.5 border-r border-slate-200">헌금기도</th>
                          <th className="p-1.5 border-r border-slate-200">오후 대표기도</th>
                          <th className="p-1.5">수요 행복예배</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">10월 25일</td>
                          <td className="p-2" colSpan={3}>
                            <span className="text-amber-800 font-semibold">전세대 십시일반 | 홈 목장 모임</span>
                          </td>
                          <td className="p-2 border-l border-slate-200">박금진 권사 사랑방</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-bold bg-slate-50 border-r border-slate-200">11월 1일</td>
                          <td className="p-2 border-r border-slate-200">이영재 장로</td>
                          <td className="p-2 border-r border-slate-200">김민제 안수집사</td>
                          <td className="p-2 border-r border-slate-200">박은영 권사</td>
                          <td className="p-2">나경옥 권사 사랑방</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 모달 하단 닫기 */}
        <div className="bg-slate-100 p-3 sm:p-4 border-t border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'page1' ? 'page2' : 'page1')}
              className="text-xs font-bold text-slate-700 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer bg-white px-3 py-1.5 rounded-lg border border-slate-300"
            >
              {activeTab === 'page1' ? (
                <>
                  <span>2면 (예배순서 보기)</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  <ChevronLeft className="w-4 h-4" />
                  <span>1면 (교회소식 보기)</span>
                </>
              )}
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
