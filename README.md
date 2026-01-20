# 엔드필드 가챠 시뮬레이터

Arknights: Endfield 헤드헌팅 시뮬레이터 - v1.0 정식 출시 기준

## 🎮 데모

[Live Demo](https://endfield.tools)

## ✨ 기능

- **배너 선택**: 레바테인, 질베르타, 이본 배너 시뮬레이션
- **천장 시스템**: 소프트 천장(65뽑), 하드 천장(80뽑), 픽업 확정(120뽑) 구현
- **50/50 시스템**: 픽업 50%, 다음 한정 14.28%, 상시 풀 35.72%
- **배너 변경 경고**: 120뽑 카운터 리셋 전 확인 다이얼로그
- **통계 추적**: 총 뽑기 횟수, 합성옥 소모량, 6성/픽업 획득 수
- **확률 정보**: 토글 가능한 상세 확률 정보 섹션

## 🎯 엔드필드 가챠 핵심 규칙

| 항목 | 내용 | 이월 |
|------|------|------|
| **6성 천장** | 80뽑 (65뽑부터 +5%/뽑) | ✅ 이월됨 |
| **픽업 확정** | 120뽑 | ❌ 배너별 리셋 |
| **50/50 확천** | 없음 | - |

### 6성 획득 시 분배
- 현재 픽업: **50%**
- 다음 한정 (2명 중 1명): **14.28%**
- 상시 풀 (5명 중 1명): **35.72%**

## 🛠️ 기술 스택

- React 18
- Vite 5
- Tailwind CSS 3
- shadcn/ui (Radix UI)
- lucide-react

## 🚀 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

## 📁 프로젝트 구조

```
src/
├── App.jsx                 # 메인 가챠 시뮬레이터
├── main.jsx               # React 진입점
├── index.css              # Tailwind + CSS 변수
├── lib/
│   └── utils.js           # cn() 유틸리티
└── components/ui/         # shadcn/ui 컴포넌트
    ├── alert-dialog.jsx
    ├── alert.jsx
    ├── badge.jsx
    ├── button.jsx
    ├── card.jsx
    ├── progress.jsx
    └── separator.jsx
```

## 📊 데이터 출처

- 정식 출시 미리보기 특별 방송 (2026-01-19)
- CBT2 커뮤니티 분석

## ⚠️ 면책 조항

본 시뮬레이터는 팬메이드 도구이며, Gryphline/Hypergryph와 무관합니다.
게임 내 실제 확률과 다를 수 있습니다.
Arknights: Endfield™ 및 관련 상표는 각 소유자의 자산입니다.

## 📄 라이선스

MIT License

---

**Endfield Tools** - [GitHub](https://github.com/meloncafe/endfield-tools-gacha-simulator)
