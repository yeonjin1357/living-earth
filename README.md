# Living Earth 🌍

실시간 공개 데이터를 3D 지구본 위에 비주얼 아트로 그리는 사이드 프로젝트.

첫 번째 데이터 소스는 [USGS 실시간 지진 피드](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) — 지진이 발생한 위치에서 규모에 따라 파문이 퍼지는 연출을 목표로 한다.

## Stack

- Vite + React + TypeScript
- Three.js + React Three Fiber + drei

## 개발

```bash
npm install
npm run dev
```

## 로드맵

- [x] 프로젝트 세팅 (R3F 씬 + 자리표시용 지구본)
- [x] USGS 지진 데이터 fetch + 폴링
- [x] 경위도 → 구면 좌표 매핑, 지진 마커 표시
- [ ] 규모 기반 파문(ripple) 셰이더
- [ ] 지구 텍스처/대륙 윤곽 렌더링
- [ ] 배포 (GitHub Pages)
