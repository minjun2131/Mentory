# 💻 MENTORY: 예비 개발자를 위한 취업 컨설팅 플랫폼

**MENTORY**는 개발자를 꿈꾸는 예비 개발자들을 위해 설계된 취업 컨설팅 플랫폼입니다.<br/><br/>
**사용자는 멘토와 직접 1:1 채팅을 통해 멘토링 상담 일정을 조율할 수 있습니다.**

---

### **팀 구성**
| 역할  | 이름  |
|:-----:|:-----:|
| 팀장  | 김호준 |
| 팀원  | 박상기 |
| 팀원  | 엄정은 |
| 팀원  | 문다슬 |
| 팀원  | 최혜진 |

---

### **기술 스택**

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white&style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-06B6D4?logo=tailwindcss&logoColor=white&style=for-the-badge)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?logo=reacthookform&logoColor=white&style=for-the-badge)
![Shadcn](https://img.shields.io/badge/Shadcn-121212?logo=shadcn&logoColor=white&style=for-the-badge)
![Zustand](https://img.shields.io/badge/Zustand-FFC107?logo=zustand&logoColor=white&style=for-the-badge)

---

### **기능 설명**

#### **홈페이지**
- **멘토 소개 섹션**: 다양한 멘토를 소개하며 멘토 리스트로 이동하는 버튼 제공.
- **검색 UI**: 사용자가 원하는 멘토를 쉽게 찾을 수 있는 인터페이스.
- **Skeleton**: 로딩 상태에서도 자연스러운 사용자 경험 제공.

#### **멘토 리스트**
- **멘토 목록 표시**: 모든 멘토를 한눈에 볼 수 있는 리스트 형태.
- **간략 정보 제공**: 각 멘토의 주요 정보 표시.
- **상세 페이지 이동**: 특정 멘토를 선택하면 상세 페이지로 이동.

#### **상세 페이지**
- **멘토 경력 소개**: 선택한 멘토의 전문성과 경력을 상세히 소개.
- **1:1 채팅 버튼**: 멘토와 즉시 소통 가능한 버튼 제공.

#### **마이페이지**
- **프로필 관리**: 프로필 사진 및 이름 변경 가능.
- **멘토 신청**: 멘토로 등록할 수 있는 신청 버튼 제공.
- **로그아웃**: 간편한 로그아웃 기능 제공.

#### **멘토 등록**
- **자기소개 작성**: 자신의 정보를 등록하여 멘토 활동 시작.
- **프로필 사진 업로드**: 사용자 이미지 업로드 가능.
- **경력 입력**: 상세 경력 정보 제공.
- **해시태그 등록**: 멘토의 전문 분야를 표현할 해시태그 저장.

#### **로그인 / 회원가입**
- **모달 창 관리**: 로그인 및 회원가입을 위한 모달 창 제공.
- **유효성 검사**: 입력된 정보의 실시간 검사 기능.
- **GitHub 로그인**: GitHub 계정을 활용한 간편 로그인 제공.

#### **채팅방**
- **채팅방 열기/닫기**: 플로팅 버튼을 통해 간편하게 채팅방 제어.
- **메시지 입력 및 전송**: 실시간 메시지 전송 및 수신.
- **상대방 정보 표시**: 상대방 프로필 및 이름 제공.
- **채팅 리스트**: 기존 대화 상대와의 대화창 목록 제공.

---

### **폴더 구조**

```plaintext
src
 ┣ app
 ┃ ┣ api
 ┃ ┃ ┗ auth
 ┃ ┣ fonts
 ┃ ┣ mentor-list
 ┃ ┃ ┣ [id]
 ┃ ┣ mentors
 ┃ ┃ ┗ new
 ┃ ┃ ┃ ┣ _components
 ┃ ┣ mypage
 ┃ ┃ ┣ _components
 ┃ ┃ ┣ _hooks
 ┃ ┃ ┣ _lib
 ┃ ┃ ┣ edit
 ┣ components
 ┣ hooks
 ┣ lib
 ┣ store
 ┣ types
 ┣ utils
```

