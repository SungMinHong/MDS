## JVM

- Java Virtual Machine 의 줄임말 이며 Java Byte Code를 OS에 맞게 해석 해주는 역할을 한다. Java compiler는 java 파일을 class라는 Java byte code로 변환시켜 준다.
Byte Code 는 기계어가 아니기 때문에 OS에서 바로 실행되지 못한다.이때 JVM은 OS가 Byte Code를 이해할 수 있도록 해석해준다. 
Byte Code는 JVM 위에서 OS에 상관없이 실행된다는 측면에서 이식성이 높다.

- 프로그램이 실행되면, JVM은 OS으로부터 이 프로그램이 필요로 하는 메모리를 할당 받고, JVM은 이 메모리를 용도에 따라 여러 영역으로 나누어 관리한다.

- JAVA는 JVM의 해석을 거치기 때문에 c언어 같은 네이티브 언어에 비해 속도가 느렸지만 JIT(Just In Time)컴파일러를 구현해 이점을 극복했다. 
JIT는 ByteCode를 어셈블러 같은 NativeCode로 바꿔서 실행이 빠르다. 단점으로는 변환하는데 비용이 발생한다. 
이 같은 장단점 때문에 JVM은 모든 코드를 다 JIT Compiler 방식으로 실행하는 건 아니다.
보통 Interpreter 방식을 사용하다가 내부적으로 해당 메서드가 얼마나 자주 수행되는지 체크하고 일정 정도를 넘을 때에만 컴파일을 수행한다. 
