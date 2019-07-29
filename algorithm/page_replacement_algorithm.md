# 페이지 교체 알고리즘
컴퓨터는 보통 주기억 장치인 램과 보조기억 장치인 하드나 ssd 등의 대용량 기억장치를 가지고 있다.
램이 속도가 빠르기 때문에 보조기억장치로부터 데이터를 램에 저장해놓고 램에 있는 데이터를 가지고 빠르게 연산을 한다.
이 때 램을 같은 크기의 블록으로 구성해서 운용하는데 이 블록을 페이지 라고 부른다. 
<br/>
만약 cpu 가 계산을 할 때 필요한 데이터가 페이지에 있다면 cache hit 라고 부르며,
없을 경우에는 보조기억장치로부터 데이터를 페이지로 옮겨온 후에 계산을 하는데 이 때를 cache miss 라고 한다. 
당연히 hit 일 때 시간이 miss 일 때 시간보다 단축된다.
<br/>
+) 주기억장치와 CPU 사이의 캐시 hit과는 다른 내용이다. 해당 캐시 hit은 프로그래밍 언어별로 배열 접근시 행우선, 열우선으로 접근하는 것이 대표적인 예이다.
<br/>
### 대표적인 페이지 교체 알고리즘
- FIFO ( First In First Out )
- OPT ( OPTimal Page Replacement )
- LRU ( Least Recently Used )
- Count-Based
- LFU ( Least Frequently Used )
- MFU ( Most Frequently Used )

이어서 
> 출처: https://gomguard.tistory.com/115
