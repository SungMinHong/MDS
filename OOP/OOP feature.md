# OOP 특징

## 개념
-객체지향 프로그래밍이란 추상화, 캡슐화, 다형성, 상속을 이용하여 코드 재사용을 증가시키고, 유지보수를 용이하게 하기 위해서 객체들을 연결 시켜 프로그래밍하는 것이다.

## OOP 4가지 특징
1. 추상화(Abstraction)
객체를 Class로 설계하는 과정을 추상화라고 부른다.
객체들의 공통적인 특징(속성, 기능)을 뽑아내는 것이다.
즉, 우리가 구현하는 객체들이 가진 공통적인 데이터와 기능을 도출해 내는 것을 의미한다.

2. 캡슐화(Encapsulation)
Class의 Logic이나 상태를 외부에서 알 수 없도록 숨기는 과정을 일컫는다.
접근제한자는 클래스를 캡슐화시키는 중요한 문법이다. (자바9 부터는 패키지 간 접근제한도 가능하다. public의 접근제한이 다양해짐) 
Class간의 Interface를 이용한 느슨한 결합도 캡슐화를 잘 이용하는 하나의 예가 될 수 있다.

3. 상속성(Inheritance)
Class의 변수와 Method를 물려받아 Class를 정의하는 방법을 상속이라 부른다.
상위개념의 특징을 하위 개념이 물려받는 것을 말한다.
자식 Class는 물려받은 method를 재정의 할 수 있는데 이러한 기능을 [overriding](https://github.com/SungMinHong/TIL/blob/master/JAVA/overloading%26overriding.md)이라고 부른다.

4. 다형성(Polymorphism)
Class의 같은 Method를 호출해도 각기 다른 method가 호출되는 특징을 다형성의 특징이라 부른다.
- 총 3가지 의 경우 다형성의 특징을 가진다고 볼 수 있다.
  - method의 이름은 같지만, mothod의 파라미터의 타입, 파라미터의 개수, return type에 따라 실제로 다른 메소드가 호출될 수 있도록 구현하는 기능을 overloading이라고 부른다
  - 자식 Class는 물려받은 method를 재정의 할 수 있는데 이러한 기능을 overriding이라고 부른다.
  - 부모클래스, 인터페이스 등을 통해 접근하는 경우 실제 구현된 각각의 class에 따라서 다른 메소드가 호출될 수 있다.


## 객체지향개발 5대 원칙: SOLID

    1. SRP(Single responsibility principle): 단일책임 원칙
      - 한 클래스는 하나의 책임만 진다.
    2. OCP(Open/closed principle): 개방폐쇄 원칙
      - 추상화와 다형성을 이용.  확장에 대해 열려있어야 하고, 수정에 대해서는 닫혀 있어야 한다.
    3. LSP(Liskov substitution principle): 리스코프 치환 원칙
      - is-a관계 성립해야함.  
    4. ISP(Interface segregation principle): 인터페이스 분리 원칙 
      - 한 클래스는 자신이 사용하지 않는 인터페이스는 구현하지 말아야 한다. 하나의 일반적인 인터페이스보다는, 여러 개의 구체적인 인터페이스가 낫다.
    5. DIP(Dependency inversion principle): 의존역전 원칙
      - 의존 관계를 맺을 때, 변화하기 쉬운것 보단 변화하기 어려운 것에 의존해야 한다. 여기서 말하는 변화하기 쉬운것이란 구체적인 것을 말하고, 변화하기 어려운 것이란 추상적인 것을 말한다. DIP를 만족한다는 것은 의존관계를 맺을 때, 구체적인 클래스보다 인터페이스나 추상 클래스와 관계를 맺는다는 것을 의미한다.
