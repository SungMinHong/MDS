## shouldComponentUpdate를 통한 최적화. 불변성을 왜 유지하는가?

### 1.불변성을 유지하지 않은 경우. shouldComponentUpdate에서 하나하나 다 확인해야해서 복잡해진다.
![](https://user-images.githubusercontent.com/18229419/62143137-75ed6000-b32a-11e9-944f-71b827786a72.png)

### 2.불변성을 유지한 경우. shouldComponentUpdate할 때 불변성이 유지돼 효율적이다.
![](https://user-images.githubusercontent.com/18229419/62143148-7980e700-b32a-11e9-9744-67465859aedb.png)
![](https://user-images.githubusercontent.com/18229419/62143153-7be34100-b32a-11e9-863c-df06e04fdb6a.png)

### 불변성을 유지하기 어려운 깊은 Object나 배열 등을 여러개 가진 복잡한 Object의 불변성을 유지하고 싶은 경우 아래 라이브러리를 사용하면 편함.
- https://github.com/immerjs/immer

> 코드 출처: https://codesandbox.io/s/1xpzj13yl
