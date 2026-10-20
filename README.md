# Se-Hoon Jung · AI Research Portfolio

🌐 **포트폴리오:** [https://jungsehoon-automl.github.io/JUNGSEHOON/](https://jungsehoon-automl.github.io/JUNGSEHOON/)

GitHub Pages에 그대로 배포할 수 있는 **정적 HTML/CSS/JavaScript 포트폴리오**입니다. Manus 계열의 넓은 여백과 단순한 정보 위계를 참고하되, 연구 실적과 프로젝트 증거를 중심으로 별도로 설계했습니다. 별도 프레임워크·빌드 과정이 필요하지 않습니다.

## 완성된 메뉴·순서

1. Hero 및 대표 성과
2. **학술 실적** — 국제학술지 / 석사학위논문 / 학술대회 발표
3. **석사 연구·프로젝트** — CCIFPS 및 대학원 TCN/FNO 교과 팀 프로젝트
4. **학사 프로젝트** — 어종·RVC 캡스톤과 학부 팀 프로젝트
5. **대내외 활동** — 연구실 특허 지원, 학술행사, K-CAMT, 학생회 등
6. **AI 활용 개인 프로젝트** — ARIA/CNOTTA (Claude·Codex 활용), 학사·석사 프로젝트와 별도 분류
7. Contact / CV

MBTI 예측과 내돈어디가계 프로젝트는 두 보기에서 항상 표시됩니다. **Recruiter View / Full Portfolio** 전환은 추가 교과 과제·활동을 펼칩니다. 각 프로젝트의 원본 자료는 클릭해 확대할 수 있습니다.

## 배포 방법

### GitHub Pages

1. 파일의 루트 위치(`index.html`, `style.css`, `script.js`, `projects/`, `assets/`, `.nojekyll`)를 기존 `JUNGSEHOON` 저장소의 배포 브랜치 **루트**에 업로드합니다.
2. GitHub 저장소에서 **Settings → Pages → Build and deployment** 항목에 `Deploy from a branch`, 사용하는 브랜치와 `/(root)`를 지정합니다. 기존 설정이 정상이라면 변경할 필요는 없습니다.
3. `https://jungsehoon-automl.github.io/JUNGSEHOON/`에서 새 사이트를 확인합니다.
4. 이미지, PDF 다운로드, 상세 페이지, 모바일 메뉴와 Full Portfolio 버튼을 확인합니다.

직접 배포하지 않고 로컬에서 검증하려면 이 폴더에서 다음 명령을 실행하면 됩니다.

```bash
python -m http.server 8000
```

그 뒤 `http://localhost:8000/`에 접속합니다.

### 중요한 주의

- 이 저장소의 `main` 브랜치가 GitHub Pages 배포 소스입니다. 변경 후 Actions의 Pages 배포 결과를 확인합니다.
- 이력서는 `assets/resume.pdf`에 포함돼 있습니다. 추후 내용이 바뀌면 같은 파일을 교체하면 됩니다.
- 한국어 웹폰트는 Google Fonts를 사용하며, 네트워크가 없어도 시스템 폰트로 대체됩니다.
- Github repo 자체의 기존 에셋을 대폭 교체하므로, 적용 전에 현재 브랜치 백업 또는 별도 PR에서 검토하는 편이 안전합니다.
- ARIA 프로젝트는 저장소의 공장 가동 MP4와 로봇 구동 모듈 캡처를 사용합니다. 실물 공장 촬영이 아닌 가상 공정 데모이며, 상세 출처는 `assets/MEDIA_SOURCES.md`에 기록했습니다.
- 학위논문에 보고된 Pixel AP `0.5714 → 0.6160`과 평균 저장 특징 `18,967 → 13,482`는 별도 집계 성과입니다. 한 번의 실행에서 동시에 달성했다고 설명하지 않습니다.
- ARIA의 `2,970`은 고유 A DES 결과(기존 유효 15회 포함), `4,320`은 B 사후 계산 결과(별도 B DES 0회), `6.03시간`은 본 실행 단계 기록입니다.

## 주요 파일

| 파일 | 용도 |
| --- | --- |
| `index.html` | 홈·학술 실적·연구·프로젝트·대내외활동·AI 개인 프로젝트 |
| `projects/ccifps.html` | 석사 연구 상세 페이지 |
| `projects/aria.html` | ARIA 상세 페이지 |
| `projects/fish-app.html` | 어종 판별 캡스톤 상세 페이지 |
| `style.css` | 디자인·반응형 규칙·인터랙션 스타일 |
| `script.js` | 모바일 메뉴·Recruiter/Full 전환·스크롤 인디케이터·이미지 확대 |
| `assets/img/` | 기존 ZIP에서 추출·경량화한 이미지 |
| `assets/resume.pdf` | 이력서 다운로드 파일 |
| `robots.txt`, `sitemap.xml`, `.nojekyll` | 배포/검색엔진 기본 파일 |

## 교체하기 쉬운 내용

- **Hero 소개 문구**: `index.html`의 `id="hero-title"`, `.hero-lead`
- **학술 실적**: `id="publications"`
- **석사 연구**: `id="graduate"`
- **학사 프로젝트**: `id="undergraduate"`
- **AI 활용 개인 프로젝트**: `id="agent-project"`
- **연락처와 CV**: `id="contact"`, `assets/resume.pdf`
- **디자인 컬러**: `style.css`의 `:root` 변수

2026-10 · Original content and images: Se-Hoon Jung.
