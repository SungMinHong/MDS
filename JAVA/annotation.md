# Java에서 어노테이션(Annotation) 이란?
---
- 자바 코드를 보면 클래스, 메서드, 변수 앞에 @ 표시를 많이 볼 수 있다.
- @는 어노테이션 식별자이다.
- 어노테이션은 JEE5(Java Platform, Enterprise Edition 5)부터 새롭게 추가된 요소이다.
- 어노테이션을 통해 데이터의 유효성 검사 등을 쉽게 알 수 있고, 이와 관련한 코드를 깔끔하게 작성하는데 도움이 된다.
- 일단 어노테이션의 용도는 다양한 목적이 있지만 메타 데이터의 비중이 가장 크다 할 수 있다.

> 메타-테이터(Meta-Data) : 데이터를 위한 데이터를 의미하며, 한 데이터에 대한 설명을 의미하는 데이터이다. (자신의 정보를 담고 있는 데이터)

<br/>

## Java에서 기본적으로 제공하는 어노테이션 종류
---
### 1. @Override
- 선언한 메서드가 오버라이드 되었다는 것을 나타냄.
- 만약 상위(부모) 클래스(또는 인터페이스)에서 해당 메서드를 찾을 수 없다면 컴파일 에러를 발생 시킴.
### 2. @Deprecated
- 해당 메서드가 더 이상 사용되지 않음을 표시.
- 만약 사용할 경우 컴파일 경고를 발생 시킴.
### 3. @SuppressWarnings
- 선언한 곳의 컴파일 경고를 무시하도록 함.
### 4. @SafeVarargs
- Java7 부터 지원하며, 제너릭 같은 가변인자의 매개변수를 사용할 때의 경고를 무시함.
### 5. @FunctionalInterface
- Java8 부터 지원하며, 함수형 인터페이스를 지정하는 어노테이션임.
- 만약 메서드가 존재하지 않거나, 1개 이상의 메서드(default 메서드 제외)가 존재할 경우 컴파일 오류를 발생 시킴.

<br/>

## 어노테이션은 어떻게 구성되어 있을까?
---
- 어노테이션의 구조를 보기 위해서 아래의 커스텀 어노테이션 코드를 참고해 보자.

~~~java
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface CustomAnnotation {
	boolean isCheck() default true;
}
~~~
- 어노테이션은 기본적으로 인터페이스 형태를 취하고 있으며, interface 앞에 @ 표시를 해준다.
- @Target, @Retention 어노테이션은 메타 어노테이션(Meta Annotation)이라 하며 이를 이용해 커스텀 어노테이션을 작성할 수 있다.

<br/>

## 메타 어노테이션의 종류
---
### 1. @Retention
- 자바 컴파일러가 어노테이션을 다루는 방법을 기술하며, 특정 어느 시점까지 영향을 미칠지 결정한다.
- 종류는 아래와 같이 3가지가 있다.
  - RetentionPolicy.SOURCE : 컴파일 전까지만 유효. (컴파일 이후에는 사라짐)
  - RetentionPolicy.CLASS : 컴파일러가 클래스를 참조할 때까지 유효.
  - RetentionPolicy.RUNTIME : 컴파일 이후에도 JVM에 의해 계속 참조가 가능. (리플렉션 사용)
  
### 2. @Target
- 어노테이션을 적용할 위치를 선택한다.
- 종류는 아래와 같다.
  - ElementType.PACKAGE : 패키지 선언
  - ElementType.TYPE : 타입 선언
  - ElementType.ANNOTATION_TYPE : 어노테이션 타입 선언
  - ElementType.CONSTRUCTOR : 생성자 선언
  - ElementType.FIELD : 멤버 변수 선언
  - ElementType.LOCAL_VARIABLE : 지역 변수 선언
  - ElementType.METHOD : 메서드 선언
  - ElementType.PARAMETER : 전달인자 선언
  - ElementType.TYPE_PARAMETER : 전달인자 타입 선언
  - ElementType.TYPE_USE : 타입 선언

### 3. @Documented
- 해당 어노테이션을 Javadoc에 포함시킨다.

### 4. @Inherited
- 어노테이션의 상속을 가능하게 한다.

### 5. @Repeatable
- Java8 부터 지원하며, 연속적으로 어노테이션을 선언할 수 있게 해준다.

<br/>
<br/>
<br/>


# 커스텀 어노테이션을 만들어 보기
---
- 정수, 문자열 값을 주입하는 2개의 예제를 만들어 보자.

## 첫째, 정수 값 주입 예제
---
### 1. 어노테이션 인터페이스 작성
~~~java
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface InsertIntData {
    int data() default 0;
}
~~~
- 주입 받는 값을 저장하기 위해 멤버 변수에 data라는 int형 필드를 만들어 준다.
### 2. 어노테이션을 사용할 예제 클래스 작성
~~~java
public class AnnotationIntInjectionExam {
    @InsertIntData(data = 10)
    private int myAge;

    @InsertIntData
    private int defaultAge;

    public AnnotationIntegerInjectionExam() {
        this.myAge = -1;
        this.defaultAge = -1;
    }

    public int getMyAge() {
        return myAge;
    }

    public int getDefaultAge() {
        return defaultAge;
    }
}
~~~
- 변수는 다음과 같이 myAge와 defaultAge 두 가지인데 myAge에 어노테이션에서는 10으로 값을 주입한다.
- 하지만 defaultAge 에서는 값이 없는데 이 경우 어노테이션에서 정한 기본 값인 0으로 값이 주입이 된다.
- 전달인자가 없는 생성자에서는 두 변수를 -1으로 초기화 한다.


## 둘째, 문자열 값 주입 예제
---
TODO:: 이어서 작성

---
출처: https://elfinlas.github.io/2017/12/14/java-annotation/

<br/>

출처: https://elfinlas.github.io/2017/12/14/java-custom-anotation-01/

<br/>
