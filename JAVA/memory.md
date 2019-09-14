# 메모리

- JAVA Source: 사용자가 작성한 JAVA 코드
- JAVA Compiler: JAVA 코드를 Byte Code로 변환시켜주는 기능
- Class Loader: Class파일을 메모리(Runtime Data Area)에 적재하는 기능
- Execution Engine: Byte Code를 실행 가능하게 해석해주는 기능
- Runtime Data Area: 프로그램을 수행하기 위해 OS에서 할당 받은 메모리 공간

클래스(Class) 단위의 객체 지향언어이고, interpreter방식 입니다. </br>
~~~
a.java → 컴파일 → a.class → interpreter(자바가상머신) → 각 플랫폼에 맞게 실행
~~~
바이너리가 아닌 바이트 코드의 클래스 파일을 읽으면서 자기 플랫폼에 맞게 실행됩니다. 플랫폼에 독립적입니다.
