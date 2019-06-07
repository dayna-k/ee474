## README.md

> EE474: Intro to MM
> Team7: Color man-C(hange), 칼라만씨
> Kim Dayeon, Park Byeongjun, Park Sion, Jeon Jiwon

img segmentation and recoloring the clothes


# index.html: 초기 버전 / 구조만 확인 가능
http://dayna-k.github.io/ee474 로 접속

demo 실행 방법
1. public/py_code/input 에 있는 test1, test2, test3, test4 이미지를 로컬에 저장
2. 위의 링크로 접속
3. 저장한 이미지를 select 버튼으로 로드
4. 원하는 color block의 조합 선택
5. change color 버튼 클릭


# app.js: shell(terminal) 연결 위해 nodejs, expressjs 설치
```
node, nodejs, npm, express 설치 후 최신버전 업데이트 필요
```

clone 및 pull 후 (ee474 -> 설치 폴더 이름)

```
npm install

DEBUG=ee474:* npm start
```
http://localhost:3002/ 로 접속

input image : public/py_code/input
