import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// 캡처 화면 속 임사랑 님 프로젝트의 고유 Firebase 설정값
const firebaseConfig = {
  apiKey: "AIzaSyCCZ4luaZQQDrrgp_09-pK6qliE6eyXZC8",
  authDomain: "zion-church-71d79.firebaseapp.com",
  projectId: "zion-church-71d79",
  storageBucket: "zion-church-71d79.firebasestorage.app",
  messagingSenderId: "202318787686",
  appId: "1:202318787686:web:e78ae1fc46b97017bda9a7",
  measurementId: "G-L66YQVL07V"
};

// Firebase 앱 초기화
export const app = initializeApp(firebaseConfig);

// 방문자 수 및 게시판용 Firestore 데이터베이스 인스턴스
export const db = getFirestore(app);

// 실제 사진 파일 저장을 위한 Firebase Storage 인스턴스
export const storage = getStorage(app);

// 브라우저 환경에서만 애널리틱스 지원 확인 후 초기화
export const analytics = typeof window !== "undefined" 
  ? isSupported().then(yes => yes ? getAnalytics(app) : null) 
  : null;
