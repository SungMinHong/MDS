# MSA(Microsevice Architecture)
- Monolithic과 반대되는 개념
- "시스템을 여러개의 독립된 서비스로 나눠서, 이 서비스를 조합함으로서 기능을 제공하는 아키텍쳐 디자인 패턴" (조대협)
- MSA에서는 코드 중복을 어느 정도 허용하는 편이다.(공통 모듈로 꼭 같이 쓸 필요는 없다는 의미..)

![Monolithic Architecture vs Microsevice Architecture](https://www.zirous.com/wp-content/uploads/2018/08/Microservice-Architecture-01.png)

## 실습
- Cloud Native 사용
- repo: https://github.com/SungMinHong/spring-cloud-workshop

### Cloud Native
- 클라우드 네이티브의 핵심은 애플리케이션을 어떻게 만들고 배포하는지에 있으며 위치는 중요하지 않다.
- 클라우드 서비스를 활용한다는 것은 컨테이너와 같이 민첩하고 확장가능한 구성 요소를 사용해서 재사용 가능한 개별적인 기능을 제공하는 것을 의미한다. 이러한 기능은 멀티클라우드와 같은 여러 기술 경계 간에 매끄럽게 통합되므로 제공팀이 반복 가능한 자동화와 오케스트레이션을 사용해서 빠르게 작업과정을 반복할 수 있다. (- 앤디 맨)
  - 신축성
  - 민첩성
  - 확장 가능성
  - 자동화
  - 무상태

> 출처: [SKplanet Tacademy](https://www.youtube.com/watch?v=mJMzV6GCmPw)
