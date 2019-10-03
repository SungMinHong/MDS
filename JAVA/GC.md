# 가비지 컬렉터(Garbage Collector)
자바의 가비지 컬렉터를 이해하려면 먼저 메모리를 이해해야 한다.

## 1. JVM과 메모리
메모리는 OS가 관리한다. 모든 프로그램은 OS 위에서 돌아간다. 프로그램이 돌기 위해서는 메모리가 필수적으로 필요하다. 이 떄문에 프로그램은 OS에게 항상 메모리 요청을 한다. OS는 프로그램에게 메모리의 일정 부분만을 할당한다.
<br/>
<br/>
JVM 또한 프로그램으로서 OS에게 메모리를 요청한다. JVM은 실행 도중 부족한 메모리를 OS에 요청한다. (JVM 구동시 최소 최대 메모리를 옵션으로 셋팅할 수도 있다.) JVM은 받은 메모리 안에서 절대주소가 아닌 절대주소에 대한 상대주소를 사용한다. 이것을 offset 주소라 한다.
<br/>
<br/>
예를 들어 JVM이 할당받은 절대 주소가 101~200, 501~600 이라면 상대주소는 1~200 처럼 될 수 있다. 이는 JVM이 할당받은 메모리는 물리적으로 분리되어 있지만 논리적으로는 하나의 메모리처럼 사용할 수 있다는 뜻이다.

## 2. Garbage
참조가 끊어져 더 이상 유효하지 않은 메모리를 가비지라고 한다. 프로그래밍언어에서는 Dangling Object라고 정의한다.

## 3. Garbage Collector
### 인트로
가비지 컬렉터가 하는 일은 유효하지 않은 메모리를 해제 시키고 정리해 메모리를 재사용 가능하도록 하는 것이다.
<br/>
<br/>
유닉스 서버든 윈도우 기반 서버든 풀(Full) GC를 수행하는 시점에는 해당 WAS의 컨테이너에서 서비스가 처리되지 않는다는 단점이 있다. 다시 이야기하면 GC를 많이하면할수록 응답 시간에 많은 영향을 끼친다. 그러므로 자신이 만든 자바 프로그램의 성능을 생각하는 자바 엔지니어라면, GC가 어떻게 처리되는지 기본 지식은 갖고 있어야 한다. 실무에서 서비스 제공 중에 특정 상황(일시적으로 한번에 몰리는 트래픽 등)에서 GC가 발생해 행이 걸리고 있다면 해당 상황에 최적화된 GC를 사용해 성능을 향상시킬 수도 있다.

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
> 자바 메모리

JVM의 메모리는 크게 클래스 영역, 자바 스택, 힙, 네이티브 메소드 스택의 4개 영역으로 나뉜다. 

<br/>

![JVM Heap](https://t1.daumcdn.net/cfile/tistory/22296F3C58FF0CA120)
> JVM Heap
가비지 컬렉터에서는 힙 메모리를 다룬다. 즉 자바콜렉터가 인식하고 할당하는 자바 메모리 영역은 힙 영역이다. Young, Old, Perm 세 영역으로 나뉜다. 
- 이 중 Perm(Permanent) 영역은 거의 사용되지 않는 영역으로서 클래스와 메소드 정보와 같이 자바 언어 레벨에서 사용되지 않는다.
- Young 영역은 Eden영역과 두 개의 Survivor 영역으로 나뉜다.
- 우리가 고려해야 할 자바의 메모리 영역은 총 4개의 영역으로 나뉜다고 볼 수 있다. 
  - Young 3개 영역(Eden, Survivor 1, Survivor 2)
  - Old 1개 영역(메모리)

![java memory management](https://t1.daumcdn.net/cfile/tistory/267FB93758FF0CB017)
> java memory management

일단 메모리에 객체가 생성되면, Eden 영역에 객체가 지정된다.  Eden 영역에 데이터가 어느 정도 쌓이면, 이 영역에 있던 객체가 어디론가 옮겨지거나 삭제된다. 이 때 옮겨가는 위치가 survivor 영역이다. 두개의 Survivor 영역 사이에 우선 순위가 있는 것은 아니다. 하지만, 이 두 개의 영역 중 한 영역은 반드시 비어 있어야 한다. 그 비어있는 영역에 Eden 영역에 있던 객체가 할당된다.

<br/>

Eden에서 survivor 둘 중 하나의 영역으로 할당 되고, 할당된 Survivor 영역이 차면, GC가 되면서 Eden 영역에 있는 객체와 꽉 찬 Survivor 영역에 있는 객체가 비어 있는 Survivor 영역으로 이동한다. 그러다가 더 큰 객체가 생성되거나, 더 이상 Young 영역에 공간이 남지 않으면 객체들은 Old 영역으로 이동하게 된다.

<br/>
위 과정을 그림으로 도식화해보았다. 메모리 공간을 원형통으로, heap에 쌓이는 데이터를 원형통에 담긴 내용물로 시각화 했다. 내용물이 작아지는 것을 GC로 표현했다. 영역은 young 영역만으로 한정했다. 

<img src="https://user-images.githubusercontent.com/18229419/66101345-72f04380-e5e9-11e9-9c40-9ab346ef87d3.png" width="400" height="600">

> 1. eden영역에서 survivor 영역으로

![사용이 끝난 survivor 영역에서 다른 survivor 영역으로](https://user-images.githubusercontent.com/18229419/66101350-75eb3400-e5e9-11e9-8fc6-473876c43f08.png)
> 2. 사용이 끝난 survivor 영역에서 다른 survivor 영역으로


### GC의 종류
- 크게 두 가지 타입으로 마이너 GC와 메이저 GC의 두가지 GC가 발생할 수 있다.

> minor GC: Young 영역에서 발생하는 GC <br/>
major GC(FULL GC): Old 영역이나 Perm 영역에서 발생하는 GC

<br/>
이 두 가지 GC가 어떻게 상호 작용하느냐에 따라서 GC 방식에 차이가 나며, 성능에도 영향을 준다. GC가 발생하거나 객체가 각 영역에서 다른 영역으로 이동할 때 애플리케이션의 병목이 발생하면서 성능에 영향을 주게 된다. 그래서 핫 스팟(Hot Spot) JVM에서는 스레드 로컬 할당 버퍼(TLABs: Thread-Local Allocation Buffers)라는 것을 사용한다. 이를 통해 각 스레드별 메모리 버퍼를 사용하면 다른 스레드에 영향을 주지 않는 메모리 할당 작업이 가능하다. 

![쓰레드 로컬 할당 버퍼](https://t1.daumcdn.net/cfile/tistory/224A224358FF17593F)

### GC(가비지 콜렉터) 방식
WAS나 자바 애플리케이션 수행시 옵션을 지정하여 GC를 선택할 수 있다. (상황에 맞춰 호완성 테스트 및 여러 상황별 테스트 이후 GC를 교체해야한다. 섣부른 GC변경은 오히려 성능을 악화시키거나 JVM crash를 발생시킬 수 있다.)

> Serial Collector (이하 시리얼 콜렉터) </br>
Parallel Collector (이하 병렬 콜렉터) </br>
Parallel Compacting Collector (이하 병렬 컴팩팅 콜렉터) </br>
Concurrent Mark-Sweep (CMS) Collector (이하 CMS 콜렉터) </br>
Garbage First (G1)

+) 현재 8버전 이상의 JDK에서 GC를 선택할 때 주로 CMS, G1 GC를 두고 고민을 하게 된다고 생각합니다.


### TODO:: 이후 포스트에서 다뤄야 할 내용 리스트
- GC 방식 5가지 중 CMS와 G1 방식에 대해 중점적으로 정리하기
- GC 선택과 GC 커스텀을 위한 자료 정리하기
- 직접 GC 커스텀해보기
  - 참고: [G1 GC 적용과 JVM Upgrade](https://brunch.co.kr/@alden/45)


---
출처: [오라클 JAVA SE DOCS](http://java.sun.com/javase/technologies/hotspot/gc/index.jsp)
<br/>
출처: [네이버D2: Java Garbage Collection](https://d2.naver.com/helloworld/1329)
<br/>
출처: [[성능튜닝] 가비지 컬렉터(GC) 이해하기](https://12bme.tistory.com/57)
<br/>
출처: [JAVA :: 가비지 컬렉터(Garbage Collector)란 :: WANZARGEN](https://wanzargen.tistory.com/15)
<br/>
출처: [JVM의 Garbage Collection](https://www.holaxprogramming.com/2013/07/20/java-jvm-gc/)
