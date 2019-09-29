# 가비지 컬렉터(Garbage Collector)
자바의 가비지 컬렉터를 이해하려면 먼저 메모리를 이해해야 한다.

## 1. JVM과 메모리
메모리는 OS가 관리한다. 모든 프로그램은 OS 위에서 돌아간다. 프로그램이 돌기 위해서는 메모리가 필수적으로 필요하다. 이 떄문에 프로그램은 OS에게 항상 메모리 요청을 한다. OS는 프로그램에게 메모리의 일정 부분만을 할당한다.
<br/>
JVM 또한 프로그램으로서 OS에게 메모리를 요청한다. JVM은 실행 도중 부족한 메모리를 OS에 요청한다. (JVM 구동시 최소 최대 메모리를 옵션으로 셋팅할 수도 있다.) JVM은 받은 메모리 안에서 절대주소가 아닌 절대주소에 대한 상대주소를 사용한다. 이것을 offset 주소라 한다.
<br/>
예를 들어 JVM이 할당받은 절대 주소가 101~200, 501~600 이라면 상대주소는 1~200 처럼 될 수 있다. 이는 JVM이 할당받은 메모리는 물리적으로 분리되어 있지만 논리적으로는 하나의 메모리처럼 사용할 수 있다는 뜻이다.

## 2. Garbage
참조가 끊어져 더 이상 유효하지 않은 메모리를 가비지라고 한다. 프로그래밍언어에서는 Dangling Object라고 정의한다.

## 3. Garbage Collector
### 인트로
가비지 컬렉터가 하는 일은 유효하지 않은 메모리를 해제 시키고 정리해 메모리를 재사용 가능하도록 하는 것이다.
<br/>
유닉스 서버든 윈도우 기반 서버든 풀(Full) GC를 수행하는 시점에는 해당 WAS의 컨테이너에서 서비스가 처리되지 않는다는 단점이 있다. 다시 이야기하면 GC를 많이하면할수록 응답 시간에 많은 영향을 끼친다. 그러므로 자신이 만든 자바 프로그램의 성능을 생각하는 자바 엔지니어라면, GC가 어떻게 처리되는지 기본 지식은 갖고 있어야 한다. 

### 정의 
자바에서는 메모리를 GC라는 알고리즘을 통하여 관리(automatic memory management)하기 때문에, 개발자가 메모리를 처리하기 위한 로직을 만들 필요가 없고, 절대로 만들어서는 안된다.
<br/>
Garbage Collection. 자바에서 쓰레기는 객체이다. 하나의 객체는 메모리를 점유하고, 필요하지 않으면 메모리에서 해제되어야 한다.

### 원리
GC 작업을 하는 가비지 컬렉터(Garbage Collector)는 다음의 역할을 한다.

1. 메모리 할당
2. 사용 중인 메모리 인식
3. 사용하지 않는 메모리 인식

GC를 해도 더이상 사용 가능한 메모리 영역이 없는데 계속 메모리를 할당하려고 하면, OutOfMemoryError가 발생하여 WAS가 다운될 수도 있다. 행(Hang) 즉, 서버가 요청을 처리 못하고 있는 상태에 빠진다.
<br/>

![자바 메모리](https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile22.uf.tistory.com%2Fimage%2F9973563D5ACE0315215FF6)

JVM의 메모리는 크게 클래스 영역, 자바 스택, 힙, 네이티브 메소드 스택의 4개 영역으로 나뉜다. 

<br/>

![JVM Heap](https://t1.daumcdn.net/cfile/tistory/22296F3C58FF0CA120)

가비지 컬렉터에서는 힙 메모리를 다룬다. 즉 자바콜렉터가 인식하고 할당하는 자바 메모리 영역은 힙 영역이다. Young, Old, Perm 세 영역으로 나뉜다. 
- 이 중 Perm(Permanent) 영역은 거의 사용되지 않는 영역으로서 클래스와 메소드 정보와 같이 자바 언어 레벨에서 사용되지 않는다.
- Young 영역은 Eden영역과 두 개의 Survivor 영역으로 나뉜다.
- 우리가 고려해야 할 자바의 메모리 영역은 총 4개의 영역으로 나뉜다고 볼 수 있다. 
  - Young 3개 영역(Eden, Survivor 1, Survivor 2)
  - Old 1개 영역(메모리)



---
출처: [오라클 JAVA SE DOCS](http://java.sun.com/javase/technologies/hotspot/gc/index.jsp)
<br/>
출처: [네이버D2: Java Garbage Collection](https://d2.naver.com/helloworld/1329)
<br/>
출처: [[성능튜닝] 가비지 컬렉터(GC) 이해하기](https://12bme.tistory.com/57)
<br/>
출처: [JAVA :: 가비지 컬렉터(Garbage Collector)란 :: WANZARGEN
](https://wanzargen.tistory.com/15)
