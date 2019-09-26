# JDBC timeout

## JDBC 드라이버에 대해 알아야 하는 이유
 JDBC는 DBMS에 접근하기 위한 표준 API이다. Sun은 4가지 타입의 드라이브를 정의하는데. NHN에서 주로 사용하는 것은 Type4형식이다. JDBC Type4 드라이버는 Java로만 작성되어 있으면 , Java 애플리케이션에서 소켓을 이용해 DBMS와 통신한다. 

![그림 1 JDBC Type4 드라이버의 DBMS 통신 구조](https://d2.naver.com/content/images/2015/06/helloworld-1321-1.png)
>그림 1 JDBC Type4 드라이버의 DBMS 통신 구조

Type4 드라이버는 소켓을 통해 바이트 스트림(byte stream)을 처리하기 때문에 HttpClient 같은 네트워크 라이브러리와 근본적으로 동작이 같다. 즉, 많은 CPU자원을 소모하고, Response Time의 손해가 있으며, 다른 네트워크 라이브러리가 가지고 있는 장애 포인트를 동일하게 가지고 있다. HttpClient를 사용한 경험이 있다면 타임아웃 값을 제대로 설정하지 않아 장애(hang)가 발생한 상황을 겪어 보았을 것이다. Type4 드라이버 역시 SocketTimeout 값을 제대로 설정하지 않으면 동일한 장애가 발생할 수 있다.

## WAS와 DBMS의 통신 시 타임아웃 계층
그림 2는 WAS와 DBMS와 통신 시 타임아웃 계층을 단순화한 것이다.
![그림 2 타임아웃 계층](https://d2.naver.com/content/images/2015/06/helloworld-1321-2.png)
> 그림 2 타임아웃 계층

상위 레벨의 타임아웃은 하위 레벨의 타임아웃에 의존성을 가지고 있다. 하위 레벨의 타임아웃이 정상으로 동작해야 상위 레벨의 타임아웃도 정상으로 동작한다. 예를 들어, JDBC Driver SocketTimeout이 정상으로 동작하지 않으면, 그보다 상위 레벨의 타임아웃인 StatementTimeout과 TransactionTimeout도 정상으로 동작하지 않는다.

"StatementTimeout을 설정했는데도 네트워크 장애가 발생했을 때, StatementTimeout이 동작하지 않아 애플리케이션이 장애 상황에서 회복되지 않았어요"란 문의를 많이 받았다. StatementTimeout은 네트워크 연결 장애에 대한 타임아웃을 담당하는 것이 아니다. StatementTimeout은 Statement 한 개의 수행 시간을 제한하는 기능만 담당한다. 네트워크 장애에 대비하는 타임아웃은 JDBC Driver SoecketTimeout이 처리해야 한다.

JDBC Driver SocketTimeout은 OS의 SocketTimeout 설정에 영향을 받는다. JDBC Driver SocketTimeout을 설정하지 않아도 네트워크 장애 발생 이후 30분이 지나면 JDBC Connection Hang이 복구되는 것은 OS의 SocketTimeout 설정때문이다.

그림 2에서 DBCP Connection Pool이 타임아웃 계층과 분리되어 왼쪽에 있는 것을 볼 수 있다. DBCP는 Connection을 생성하고 관리하는 일을 하며, 타임아웃 처리에는 관여하지 않는다. DBCP 내부에서 Connection을 생성하거나 Connection 유효성을 확인하려 Validation Query를 보낼 때에는 SocketTimeout이 영향을 주지만 애플리케이션에 직접적인 영향을 주지는 않는다.

단, 애플리케이션 로직에서 DBCP에 getConnection() 메서드를 호출할 때 Connection을 애플리케이션이 얻을 때까지의 타임아웃을 지정할 수 있다. 하지만 이것은 JDBC의 ConnectTimeout과는 무관하다.

![그림 3 각 레벨 별 타임아웃](https://d2.naver.com/content/images/2015/06/helloworld-1321-3.png)
>그림 3 각 레벨 별 타임아웃

## TransactionTimeout이란?
TransactionTimeout은 프레임워크(Spring, EJB Container)나 애플리케이션 레벨에서 유효한 타임아웃이다.

TransactionTimeout은 생소한 개념일 수 있다. 간단히 설명하면 "StatementTimeout x N(Statement 수행 수) + α(가비지 컬렉션 및 기타)"라고 할 수 있다. 전체 Statement 수행 시간을 허용할 수 있는 최대 시간 이내로 제한하려 할 때 TransactionTimeout을 사용한다.

가령 Statement 한 개를 수행할 때 0.1초가 필요하다면, 몇 개 안 되는 Statement를 수행할 때에는 문제가 없다. 그러나 Statement 10만 개를 수행할 때에는 일만 초(약 7시간)가 필요하다. TransactionTimeout은 이런 경우에 사용할 수 있다.

실 구현체로 EJB CMT(Container Managed Transaction)가 가장 대표적인 예이다. EJB CMT는 제작사마다 구현 방식과 동작 과정이 다르다. NHN에서는 EJB Container를 사용하지 않으므로, 가장 익숙한 예는 Spring의 TransactionTimeout이 될 수 있겠다. Spring에서는 다음과 같이 XML을 이용하여 설정하거나, Java 코드에서 @Transactional을 이용하여 타임아웃을 설정할 수 있다.

~~~xml
<tx:attributes>  
<tx:method name="…" timeout="3">  
</tx:method></tx:attributes>  
~~~

---
출처: https://d2.naver.com/helloworld/1321
출처: https://fuirosun.tistory.com/entry/JDBC-Timeout%EA%B3%BC-DBCP
