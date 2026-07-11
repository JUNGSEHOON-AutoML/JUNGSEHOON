# Jung Se-Hoon — 개발자 포트폴리오

> 중앙대학교 AI 대학원 석사과정 · AutoML Lab  
> Robot Vision · 산업 이상 탐지 · False Positive 억제 · 엣지 환경 경량화

🌐 **Live Site**: https://jungsehoon-automl.github.io/JUNGSEHOON/  
📧 **Email**: storyfor980107@gmail.com  
💻 **GitHub**: https://github.com/JUNGSEHOON-AutoML

---

## 프로젝트 구조

```
JUNGSEHOON/
├── index.html          # 메인 포트폴리오 (Single-page)
├── style.css           # 다크 테마 스타일시트
├── script.js           # 인터랙션 스크립트
├── README.md           # 이 파일
├── .gitignore
└── assets/
    └── img/
        ├── projects/   # 프로젝트 카드 이미지 (웹 세이프 이름)
        │   ├── kakeibo-app.png
        │   ├── ai-voice-conversion.png
        │   ├── ai-voice-music1.gif
        │   └── mbti-text-classification.png
        └── events/     # 활동/교육 이미지 (웹 세이프 이름)
            ├── ieie-conference.jpg
            ├── cau-ai-symposium.jpg
            └── chiang-mai-robotics.jpg
```

---

## 기술 스택

- **HTML / CSS / JS** 순수 정적 사이트 (빌드 도구 없음)
- 구글 폰트: Inter, JetBrains Mono, Noto Sans KR
- 다크 테마, 반응형(모바일), 상단 고정 내비
- IntersectionObserver 기반 스크롤 애니메이션

---

## 로컬 실행

빌드 과정이 없으므로 정적 서버만 있으면 됩니다.

### VS Code Live Server (추천)
1. VS Code에서 `index.html` 열기
2. 우측 하단 **Go Live** 클릭 → 브라우저에서 바로 확인

### Python 내장 서버
```bash
# Python 3
python -m http.server 8080
# 브라우저에서 http://localhost:8080 접속
```

### Node.js serve
```bash
npx serve .
```

---

## GitHub Pages 배포

```bash
# 1) Git 초기화 (처음 한 번)
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/JUNGSEHOON-AutoML/JUNGSEHOON.git
git push -u origin main

# 2) GitHub 저장소 설정
#    Settings → Pages → Source: Deploy from branch → Branch: main / (root)

# 3) 이미 원격에 커밋이 있어 push가 거부될 때
git pull origin main --allow-unrelated-histories
git push -u origin main

# 4) 원격 내용을 덮어쓸 때 (주의: 원격 기존 내용 삭제)
git push -u origin main --force
```

배포 완료 후: `https://jungsehoon-automl.github.io/JUNGSEHOON/`

---

## 이미지 파일명 매핑표

| 원본 파일명 (한글/특수문자) | 웹 세이프 파일명 | 용도 |
|---|---|---|
| `내돈어디가계.PNG` | `projects/kakeibo-app.png` | 가계부 앱 프로젝트 카드 |
| `가수보컬.PNG` | `projects/ai-voice-conversion.png` | AI 음성변환(RVC) 프로젝트 카드 |
| `music1.gif` | `projects/ai-voice-music1.gif` | AI 음성변환(RVC) 서브 이미지 |
| `빅데이터.PNG` | `projects/mbti-text-classification.png` | MBTI 텍스트분류 프로젝트 카드 |
| `대한전자공학회 하계학술대회.jpg` | `events/ieie-conference.jpg` | 학회 발표 이미지 |
| `중앙대학교 ai 대학원 심포지엄.jpg` | `events/cau-ai-symposium.jpg` | AI 심포지엄 이미지 |
| `치앙마이대학.jpg` | `events/chiang-mai-robotics.jpg` | K-CAMT 로보틱스 해외교육 이미지 |

> 원본 파일은 `assets/img/` 에 보존되어 있습니다.  
> 복사된 웹 세이프 파일은 `assets/img/projects/` 및 `assets/img/events/` 에 있습니다.

---

## 포트폴리오 섹션 구성

| # | 섹션 | 내용 |
|---|------|------|
| Hero | 인트로 | 이름·한줄소개·Email·GitHub·Lab 링크 |
| 01 | About | 연구 관심 분야, 핵심 성과 수치 |
| 02 | Publications | 논문 3건 (Journal · 학위논문 · 학술대회) |
| 03 | Experience | 석사 연구원, 특허 관리 담당 |
| 04 | Skills | 4개 카테고리 기술 스택 |
| 05 | Projects | 5개 프로젝트 카드 (이미지 포함) |
| 06 | Education & Activities | 학력·대외활동·해외교육·자격/어학 |
| 07 | Contact | 이메일·GitHub·Lab 링크 카드 |

---

## 업데이트 배포

```bash
git add .
git commit -m "Update: [변경 내용]"
git push
```

GitHub Actions 없이도 push하면 Pages가 자동으로 재배포됩니다 (약 1-2분 소요).

---

## License

© 2026 Jung Se-Hoon. All rights reserved.
