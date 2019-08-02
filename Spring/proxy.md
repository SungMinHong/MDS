# 프록시

## 자바의 프록시 팩토리 빈
### 디자인패턴 관점에서의 2가지 프록시
- 데코레이션 패턴과 프록시 패턴이 있다. 공통점으로 둘다 마치 실제 오브젝트처럼 클라이언트의 요청을 받아 처리하는 대리자 역할을 하는 패턴이다.
1. 데코레이션 패턴: 추가적인 기능을 수행한다.
2. 프록시 패턴: 추가적인 기능없이 접근 제어 등의 역할만 한다.

&nbsp; 보통 트랜젝션처리를 하기 위해 프록시를 구현한다.
하지만 프록시를 계속해서 구현하기는 쉽지 않다. 메서드가 100개이면 100개에 대해서 실제 객체에게 위임해서 처리하는 메서드를 100개 선언해야하기 때문이다.
자바는 다이내믹프록시를 제공한다. 이는 reflect를 사용하기 때문에 가능하다. 인자로 클래스로더, 반환 자료형, 핸들러(invocationHandler를 구현한)를 전달해 다이내믹 프록시를 생성한다.
하지만 스프링 컨테이너에 빈으로 등록하기 위해서는 실제 클래스가 필요한대 다이내믹프록시는 런타임때 생성되므로 등록될 수 없다. 이런 점으로 인해 스프링에서는 factory를 통한 빈등록이 가능하도록 하고 있다. 
그래서 다이내믹프록시를 통해 프록시를 반환하는 팩토리(다이내믹 프록시를 위한 팩토리 빈, FactoryBesn인터페이스를 구현한)를 스프링빈으로 등록해서 객체를 생성 하면 해결할 수 있다.
<br/>
### 자바 프록시 팩토리 빈 방식의 장점
- 프록시 클래스를 일일이 만들어야 하는 번거로움을 해결해 준다.
- 코드 중복의 문제가 발생한다는 점을 해결해 준다.
<br/>

### 자바 프록시 팩토리 빈의 한계
- 프록시를 통해 타깃에 부가기능을 제공하는 것은 메소드 단위로 일어나는 일이다. 하나의 클래스 안에 존재하는 여러 개의 메서드에 부가기능을 한 번에 제공하는 건 어렵지 않게 가능했다. 하지만 한 번에 여러 개의 클래스에  공통적인 부가기능을 제공하는 일은 지금까지 살펴본 방법으로는 불가능하다. 트랜젝션과 같이 비즈니스 로직을 담은 많은 클래스의 메소드에 적용할 필요가 있다면 거의 비슷한 프록시 팩토리 빈의 설정이 중복되는 것을 막을 수 없다.
- 하나의 타깃에 여러 개의 부가기능을 적용하려고 할 때도 문제다. 같은 타깃 오브젝트에 대해 트랜잭션 프록시 뿐만 아니라 보안 기능을 제공하는 프록시도 적용하고 싶고, 기능 검사를 위해 주고받는 메소드 정보를 저장해두는 부가기능을 담은 프록시도 추가하고 싶다면 어떻게 될까? 적용 대상인 서비스 클래스가 200개쯤 된다면 엄청난 라인이 XML에 쓰여져야 한다. 
- TransactionHandler 오브젝트가 프록시 팩토리 빈 개수만큼 만들어진다는 점이다. TransactionHandler는 타깃 오브젝트를 프로퍼티로 갖고 있다. 따라서 트랜잭션 부가기능을 제공하는 동일한 코드임에도 불구하고 타깃 오브젝트가 달라지면 새로운 TransactionHandler 오브젝트를 만들어야 한다.
- 위와 같은 한계를 극복하고자 스프링의 프록시 팩토리 빈이 만들어짐
<br/>

## 스프링의 ProxyFactoryBean
### 스프링의 프록시 팩토리 빈(ProxyFactoryBean)
&nbsp; 스프링은 트랜젝션 기술과 메일 발송 기술에 적용했던 서비스 추상화를 프록시 기술에도 동일하게 적용하고 있다. 스프링은 일관된 방법으로 프록시를 만들 수 있게 도와주는 추상 레이어를 제공한다. 생성된 프록시는 스프링의 빈으로 등록돼야 한다. 스프링은 프록시 오브젝트를 생성해주는 기술을 추상화한 팩토리 빈을 제공해준다. 스프링의 ProxyFactoryBean은 프록시를 생성해서 빈 오브젝트로 등록하게 해주는 팩토리 빈이다. 기존에 예제에서 만들었던 TxProxyFactoryBean과 달리, ProxyFactoryBean은 순수하게 프록시를 생성하는 작업만을 담당하고 프록시를 통해 제공해줄 부가기능은 별도의 빈에 둘 수 있다.
ProxyFactoryBean이 생성하는 프록시에서 사용할 부가기능은 MethodInterceptor 인터페이스를 구현해서 만든다. MethodInterceptor는 InvocationHandler와 비슷하지만 한 가지 다른점이 있다. InvocationHandler의 invoke( ) 메소드는 타킷 오브젝트에 대한 정보를 제공하지 않는다. 따라서 타깃은 InvocationHandler를 구현한 클래스가 직접 알고 있어야 한다. 하지만MethodInterceptor invoke( ) 메소드는 ProxyFactoryBean으로부터 타깃 오브젝트에 대한 정보까지도 함께 제공 받는다. 그 차이 덕분에 MethodInterceptor는 타깃 오브젝트에 상관없이 독립적으로 만들어 질 수 있다. 따라서 MethodInterceptor 오브젝트는 타깃이 다른 여러 프록시에서 함께 사용할 수 있고, 싱글톤 빈으로 등록 가능하다. 
<br/>

### 어드바이스: 타깃이 필요없는 순수한 부가기능
&nbsp; MethodInterceptor를 구현한 클래스에는 타깃 오브젝트가 등장하지 않는다. MethodInterceptor의 invoke 메소드로 메서드 정보와 타깃 오브젝트가 담긴 MethodInvocation 오브젝트가 전달된다. MethodInvocation은 타깃 오브젝트의 메소드를 실행할 수 있는 기능이 있기 때문에 MethodInterceptor는 부가기능을 제공하는 데만 집중할 수 있다. 
&nbsp; MethodInvocation은 일종의 콜백 오브젝트로, proceed( ) 메소드를 실행하면 타깃 오브젝트의 메소드를 내부적으로 실행해주는 기능이 있다. 
MethodInterceptor처럼 타깃 오브젝트에 적용하는 부가 기능을 담은 오브젝트를 스프링에서는 어드바이스(advice)라고 부른다.
ProxyFactoryBean 하나만으로 여러 개의 부가 기능을 제공해주는 프록시를 만들 수 있다. ProxyFactoryBean에는 인터페이스 자동검출 기능을 사용해 타깃 오브젝트가 구현하고 있는 인터페이스 정보를 알아낸다. 그리고 알아 낸 인터페이스를 모두 구현하는 프록시를 만들어 준다. 
<br/>

### 포인트컷: 부가기능 적용 대상 메소드 선정 방법
![스프링의 ProxyFactoryBean 이용한 방법](https://user-images.githubusercontent.com/18229419/62299515-0d2ff000-b4b0-11e9-8d5a-1fb1d6645c2f.png)
- 어드바이스와 포인트컷은 모두 프록시에 DI로 주입돼서 사용된다.
- 두 가지 모두 여러 프록시에서 공유가 가능하도록 만들어지기 때문에 스프링의 싱글톤 빈으로 등록이 가능하다. 

~~~java
@Test
public void pointcutAdvisor() {
  ProxyFactoryBean pfBean = new ProxyFactoryBean();
  pfBean.setTatget(new HelloTaget());
  
  //메소드 이름을 비교해서 대상을 선정하는 알고리즘을 제공하는 포인트컷 생성
  NameMatchMethodPointcut pointcut = new NameMatchMethodPointcut();
  
  //이름 비교조건 설정, sayH로 시작하는 모든 메소드를 선택하게 한다.
  pointcut.setMappedName("sayH*");
  
  pfBean.addAdvisor(new DefalutPointcutAdvisor(pointcut, new UppercaseAdvisor));
  
  Hello proxiedHello = (Hello) pfBean.getObject();
  
  assetThat(proxiedHello.sayHello("SungMin"), is("HELLO SUNGMIN"));
  assetThat(proxiedHello.sayHi("SungMin"), is("HI SUNGMIN"));
  
  //메소드 이름이 포인트컷의 선정조건에 맞지 않으므로, 부가기능(대문자 변환)이 적용되지 않는다.
  assetThat(proxiedHello.sayThankYou("SungMin"), is("Thank You SungMin"));  
}
~~~

어드바이저 = 포인트컷(매소드 선정 알고리즘) + 어드바이스(부가기능)

## 스프링 AOP
### 어드바이스와 포인트컷의 재사용
![](https://user-images.githubusercontent.com/18229419/62364242-f47d1400-b55b-11e9-85b0-240934278fc5.png)
- 아직 해결해야할 점: 거의 비슷한 내용의 ProxyFactoryBean 빈 설정정보를 추가해주는 부분

### 빈 후처리기를 이용한 자동 프록시 생성기
![](https://user-images.githubusercontent.com/18229419/62364259-fb0b8b80-b55b-11e9-9dcd-959946900426.png)
- DefaultAdvisorAutoProxyCreator(어드바이저를 이용한 자동 프록시 생성기)를 살펴보자. 빈 으로 등록시켜두면 빈 후처리기를 동작시킬 수 있다. 스프링이 설정을 참고해서 만든 오브젝트가 아닌 다른 오브젝트를 빈으로 등록시키는 것이 가능하다.
- DefaultAdvisorAutoProxyCreator 빈 후처리기가 등록되어 있으면 스프링은 빈 오브젝트를 만들 때마다 후처리기에게 빈을 보낸다. 빈으로 등록된 어드바이저 내의 포인트컷을 이용해 전달받은 빈이 프록시 적용 대상인지 확인한다. 빈 후처리기는 프록시가 생성되면 원래 컨테이너가 전달해준 빈 오브젝트 대신 프록시 오브젝트를 컨테이너에게 돌려준다. 컨테이너는 최종적으로 빈 후처리기가 돌려준 오브젝트를 빈으로 등록하고 사용한다.
- 적용할 빈을 선정하는 로직이 추가된 포인트컷이 담긴 어드바이저를 등록하고 빈 후처리기를 사용하면 일일이 ProxyFactoryBean을 설정하는 문제를 말끔하게 해결할 수 있다. PointCut 인터페이스는 클래스필터와 메소드 매처 두가지를 돌려주는 메소드를 갖고 있다. DefaultAdvisorAutoProxyCreator는 등록된 빈 중에서 Advisor 인터페이스를 구현한 것을 모두 찾는다. 

## AOP를 활용한 트랜잭션
> 이어서 정리
