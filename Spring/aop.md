# 스프링 AOP

## AOP(Aspect Oriented Programming)
- 기능을 핵심 비지니스 로직과 공통 모듈로 구분하고. 핵심 로직에 영향을 미치지 않고 사이사이에 공통 모듈을 효과적으로 잘 끼워넣도록 하는 방법이다.
- 공통모듈(보안 인증, 로깅 같은 요소등)을 만든 후에 코드 밖에서 이 모듈을 비지니스 로직에 삽입하는 것이 바로 AOP 적인 개발이다. 코드 밖에서 설정된다는 것이 핵심이다.

### AOP가 사용되는 경우
- 간단한 메소드 성능 검사
  - System.current.TimeMills()를 사용하거나 스프링이 제공하는 StopWatch코드를 사용하기는 매우 번거롭다. 이런 경우 해당 작업을 하는 코드를 밖에서 설정하고 해당 부분을 사용하는 편이 편리하다.
- 트렌잭션 처리
  - 트랜젝션의 경우 비지니스 로직의 전후에 설정된다. 하지만 매번 사용하는 트랜젝션(try-catch부분)의 코드 작성은 번거롭다.
- 예외 반환
- 아키텍처검증
- 기타

### AOP의 구성요소
1. 조인포인트
2. 포인트컷
3. 어드바이스 또는 인터셉터
4. 위빙 또는 크로스컷팅
5. 인트로덕션 또는 인터타입 선언
6. 애스팩트 또는 어드바이저

![](https://user-images.githubusercontent.com/18229419/62197680-43d80e80-b3bb-11e9-8ba2-66ee414604f2.png)