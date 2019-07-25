# 리액트
## 리액트 프로젝트 시작하기
### webpack
코드들을 의존하는 순서대로 잘 합쳐서 하나 또는 여러개의 파일로 결과물을 만들어 냄.
빌드(번들링작업)할 때마다 어떤 처리작업을 준비해주는 역할을 한다.
<br/>
![](https://user-images.githubusercontent.com/18229419/61837465-e4ac6280-aebf-11e9-80eb-e63b324c9e57.png)

### Bable
자바스크립트 변환 도구.
새로운 문법을 적용하는 경우 이전 버전 자바스크립트로 변환해주는 역할을 한다. 그렇게 되면 구버전 브라우저에서도 사용이 가능하다. Jsx에서도 바벨이 사용됨.
<br/>
![](https://user-images.githubusercontent.com/18229419/61837472-ec6c0700-aebf-11e9-9ad4-43888a3bb450.png)

컴포넌트는 함수를 통해서 만들 수도 있고 클래스를 통해서도 만들 수 있음.
[bit.ly](https://bit.ly/beginreact) 들어가서 fork해서 시작하기.

## JSX기본 문법 알아보기 1

HTML이랑 비슷하지만, 지켜야 할 규칙이 몇가지 있다.
(JSX 참고문서 let const 화살표 함수)

- var 의 스코프는 함수 단위이다. 블록단위가 아니다. es6에서는 더이상 var 사용안함.
<br/>
![](https://user-images.githubusercontent.com/18229419/61837579-571d4280-aec0-11e9-8eaa-88750c536f6d.png)


- let의 스코프는 블록단위이다. 유동적인 값
<br/>
![](https://user-images.githubusercontent.com/18229419/61837582-597f9c80-aec0-11e9-9cae-585d03020481.png)

- const: 한번 선언 후 고정적인 값

### JSX기본 문법 알아보기 2

- Style 적용
<br/>
![](https://user-images.githubusercontent.com/18229419/61837657-c98e2280-aec0-11e9-847c-6be2db83c14c.png)
<br/>
![](https://user-images.githubusercontent.com/18229419/61837662-cd21a980-aec0-11e9-9e91-657e8b9a2657.png)

- 주석달기
<br/>
![](https://user-images.githubusercontent.com/18229419/61837664-ceeb6d00-aec0-11e9-8ace-fc10c5f723f4.png)
