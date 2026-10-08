import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface VisitorStats {
  today: number;
  total: number;
  loading: boolean;
}

export const useVisitorStats = (): VisitorStats => {
  const [stats, setStats] = useState<VisitorStats>({
    today: 0,
    total: 0,
    loading: true,
  });

  useEffect(() => {
    const recordAndFetchVisit = async () => {
      try {
        // 오늘 날짜 문자열 (YYYY-MM-DD, 한국 기준)
        const now = new Date();
        const dateStr = now.toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).replace(/\. /g, '-').replace('.', '');

        const todayDocRef = doc(db, 'visitor_stats', dateStr);
        const totalDocRef = doc(db, 'visitor_stats', '--total--');

        // 세션 스토리지 체크: 오늘 이미 집계된 브라우저인지 확인
        const sessionKey = `zion_visited_${dateStr}`;
        const hasVisitedToday = sessionStorage.getItem(sessionKey);

        if (!hasVisitedToday) {
          // 1. 오늘 문서 업데이트 (없으면 생성, 있으면 1 증가)
          const todaySnap = await getDoc(todayDocRef);
          if (!todaySnap.exists()) {
            await setDoc(todayDocRef, {
              date: dateStr,
              count: 1,
              createdAt: serverTimestamp(),
              lastVisited: serverTimestamp(),
            });
          } else {
            await updateDoc(todayDocRef, {
              count: increment(1),
              lastVisited: serverTimestamp(),
            });
          }

          // 2. 누적 전체 카운트 문서 업데이트
          const totalSnap = await getDoc(totalDocRef);
          if (!totalSnap.exists()) {
            await setDoc(totalDocRef, {
              count: 1,
              lastVisited: serverTimestamp(),
            });
          } else {
            await updateDoc(totalDocRef, {
              count: increment(1),
              lastVisited: serverTimestamp(),
            });
          }

          sessionStorage.setItem(sessionKey, 'true');
        }

        // 최신 데이터 가져와서 상태 반영
        const [todaySnapLatest, totalSnapLatest] = await Promise.all([
          getDoc(todayDocRef),
          getDoc(totalDocRef),
        ]);

        setStats({
          today: todaySnapLatest.exists() ? todaySnapLatest.data().count : 1,
          total: totalSnapLatest.exists() ? totalSnapLatest.data().count : 1,
          loading: false,
        });
      } catch (err) {
        console.error('방문자 수 집계 실패:', err);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    recordAndFetchVisit();
  }, []);

  return stats;
};
