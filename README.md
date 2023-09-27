# EE474: Intro to MM (2019 Spring Term Project)
## 0. Image Segmentation and Recoloring the Clothes
Team7: Color man-C(hange), 칼라만씨

Kim Dayeon, Park Byeongjun, Park Sion, Jeon Jiwon

[![Video Label](http://img.youtube.com/vi/1btMlEHldrY/0.jpg)](https://youtu.be/1btMlEHldrY)
https://youtu.be/1btMlEHldrY?si=dMuvuspMhG-QE-Ew
https://www.youtube.com/watch?v=1btMlEHldrY&t=2s


## 1. index.html (Final Presentation Demo용)
#### (http://dayna-k.github.io/ee474) 로 접속

demo 실행 방법
1. public/py_code/input 에 있는 test1, test2, test3, test4 이미지를 로컬에 저장
2. 위의 링크로 접속
3. 저장한 이미지를 select 버튼으로 로드
4. 원하는 color block의 조합 선택
5. change color 버튼 클릭


## 2. app.js, index.ejs
#### shell(terminal) 연결 위해 nodejs, expressjs 설치 필요

1. node module 설치, python module 설치(python 2.7 ver)
```
node, nodejs, npm, express 설치 후 최신버전 업데이트 필요
tensorflow, keras, opencv, etc.
```

2. 파일 clone 및 pull 후 해당 directory로 이동

```
npm install

DEBUG=ee474:* npm start (ee474: directory 이름)
```
3. http://localhost:3002/ 로 접속

4. public/py_code/input에 input으로 사용할 이미지 저장 후 사용


## 3. Project Directory Layout and Structure

        ee474
          │
          ├── bin
          │     └── www **              server creation
          │
          ├── node_modules              nodeJS, expressJS modules
          │
          ├── public
          │     ├── font                10 saved fonts
          │     │
          │     ├── images              used images for the interface (ex. rainbow, sample images)
          │     │
          │     ├── javascripts **
          │     │     └── index.js      all functions for the index.ejs
          │     │                             open_top_box_s(), open_bottom_box_s() : onClick function for color table collapse
          │     │                             btn_reset() : onClick function for reset button
          │     │                             setPng24(obj) : sizing function for png files
          │     │                             $("#getimg").change(function ()) : onClick function for "select" button - load input image file
          │     │                             $("#btn_color").click(function btn_color_onClick()) : onClick function for "change color" button
          │     │                                     - run the python code and load output image file
          │     │                             $("#color_table_top td").click(function()), $("#color_table_bottom td").click(function()) :
          │     │                                     function for selection Hue Color for top and bottom
          │     │                             $("#color_table_top_s td").click(function()), $("#color_table__s td").click(function()) :  
          │     │                                     function for selection Saturation Color for top and bottom
          │     │                             
          │     ├── png                 used png images for the interface (ex. t-shirt, long-pants)
          │     │
          │     ├── py_code **
          │     │     ├── input         input sample images (ex. test1, test2, test3, test4)
          │     │     │
          │     │     ├── models        __init__.py, __init__.pyc, unet.py, unet.pyc
          │     │     │
          │     │     ├── output        output sample images (ex. test1, test2, test3, test4)
          │     │     │
          │     │     ├── utils         __init__.py, __init__.pyc, segdata_generator.py, segdata_generator.pyc
          │     │     │
          │     │     ├── weight        parse_weights.h5
          │     │     │
          │     │     └── myUI.py       implemented python code for segmentation and coloring
          │     │
          │     └── stylesheets **
          │           └── style.css     style css file for index.ejs, index.js
          │
          ├── routes
          │     ├── cmd.js              routes js file for sending command in cmd.ejs (for reference)
          │     │
          │     └── index.js **         routes js file for sending command in index.ejs
          │
          ├── views
          │     ├── cmd.ejs             view ejs file for sending command (for reference)
          │     │
          │     ├── error.ejs           views ejs file for sending error
          │     │
          │     └── index.ejs **        views ejs file for our project
          │
          ├── app.js                    create the scheme of modules(nodeJs and expressJS) and construct routes
          │
          ├── index.html **             html file for demo (http://dayna-k.github.io/ee474)
          │
          ├── style.css **              style css file for index.html
          │
          └── etc.                      python files for test, screenshot of the interface(progression : slide, final : colorbox),
