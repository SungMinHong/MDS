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
## 대표적인 페이지 교체 알고리즘
- FIFO ( First In First Out )
- OPT ( OPTimal Page Replacement )
- LRU ( Least Recently Used )
- Count-Based
- LFU ( Least Frequently Used )
- MFU ( Most Frequently Used )

## LRU(Least Recently Used)
- LRU 알고리즘은 Least Recently Used 의 약자로 직역하자면 가장 최근에 사용되지 않은 것 정도의 의미를 가지고 있다.
페이지에서 제거할 때 가장 오랫동안 사용하지 않은 것을 제거하겠다는 알고리즘이다.
이 알고리즘의 기본 가설은 가장 오랫동안 사용하지 않았던 데이터는 앞으로도 사용할 확률이 적다는 것이다.

- LRU 알고리즘을 구현하기 위한 첫 번째 방법은 페이지에 저장된 데이터가 언제 사용되었는지를 알 수 있게하는 부분을 구현해서 제일 오랫동안 참조되지 않은 데이터를 제거하는 방법이다.

- 두 번째 방법은 페이지에 데이터를 큐형식으로 저장하는 방식이다. 페이지 내에 필요한 데이터가 존재한다면 데이터를 페이지 내에서 제거하고 맨 위로 다시 올리고, 만약 데이터가 존재하지 않는다면 바로 입력하여 맨 아래에 있는 데이터를 삭제하는 과정을 통해 LRU 를 구현할 수 있다.

### LRU 예제
![LRU 알고리즘 - 페이지 상태 변환 과정](https://t1.daumcdn.net/cfile/tistory/99B0263C5A40B09F32)
- LRU 알고리즘의 상태 변화과정을 나타낸 표이다. 페이지 크기가 3이라고 가정하고 0 부터 4 까지의 숫자들이 참조되는 경우이다. 황색 표시는 페이지가 교체 되는 상황이고 연두색은 페이지에 데이터가 존재하여 갱신되는 경우이다. 

- 구현과정에서 주의해야할 부분은 7번, 9번 그리고 8번, 10번 정도 이다. 7번 9번은 페이지에 저장되는 값들은 바뀌지 않지만 최근에 참조되었다는 부분을 알 수 있게 구현해야하며, 8번 10번은 7, 9번이 반영되어 3이 최근에 사용 되었음을 인지한 상태로 다른 페이지를 변경해 주어야 하는 것을 구현해야 한다.

### LRU 구현
- 간단한 LRU 를 파이썬 이 코드는 카카오 신입 공채 1차 코딩 테스트에 나온 문제를 위한 코드 이기 때문에 과정만 참조하는 것을 추천.
<br/>

~~~py
def calc_cache(cache, string, cache_size):
    try:
        if len(cache) > cache_size:
            if cache.count(string) == 0:
                cache.pop()
                cache[0] += 1
            elif cache.count(string) == 1:
                cache.remove(string)
        else:
            if cache.count(string) == 0:
                cache[0] += 1
        cache.insert(1, string)
    except:
        cache[0] = len(cities)
    finally:
        return cache
~~~

> 출처: https://gomguard.tistory.com/115
