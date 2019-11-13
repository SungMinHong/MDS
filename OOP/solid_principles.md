## 객체지향 개발 5대 원칙: SOLID
1. SRP(Single responsibility principle): 단일책임 원칙. 
- 한 클래스는 하나의 책임만 진다.
<br/>

2. OCP(Open/closed principle): 개방폐쇄 원칙. 
- 확장에 대해 열려있어야 하고, 수정에 대해서는 닫혀 있어야 한다.
- 추상화와 다형성을 이용.
<br/>

3. LSP(Liskov substitution principle): 리스코프 치환 원칙.
- is-a관계 성립해야함.  
<br/>

4. ISP(Interface segregation principle): 인터페이스 분리 원칙. 
- 한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다. 하나의 일반적인 인터페이스보다는, 여러 개의 구체적인 인터페이스가 낫다.
<br/>

5. DIP(Dependency inversion principle): 의존역전 원칙. 
- 의존 관계를 맺을 때, 변화하기 쉬운것 보단 변화하기 어려운 것에 의존해야 한다. 여기서 말하는 변화하기 쉬운것이란 구체적인 것을 말하고, 변화하기 어려운 것이란 추상적인 것을 말한다.
- DIP를 만족한다는 것은 의존관계를 맺을 때, 구체적인 클래스보다 인터페이스나 추상 클래스와 관계를 맺는다는 것을 의미한다.
