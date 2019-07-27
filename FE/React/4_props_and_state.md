## Props를 사용하는 방법

### Props & State
- props와 state는 리액트에서 데이터를 다룰 때 사용하는 개념이다.
- props는 부모 컴포넌트가 자식 컴포넌트에게 데이터를 넘겨줄 때 사용한다.<br/>
![부모자식데이터전달](https://user-images.githubusercontent.com/18229419/61991842-c184dd00-b090-11e9-85d9-d58982577fbb.png)
![](https://user-images.githubusercontent.com/18229419/61991843-c2b60a00-b090-11e9-8400-fac56245fd2f.png)
- state는 컴포넌트 자기 자신이 가지고 있다. 부모가 자식에게 주는 데이터가 아니다.
- props는 읽기 전용이지만 state는 setState( )로 변경이 가능하다.
 ![](https://user-images.githubusercontent.com/18229419/61991884-7f0fd000-b091-11e9-98d3-354a722e7291.png)
 
App.js
~~~js
import React, { Component } from "react";
import Counter from "./Counter";

class App extends Component {
render() {
return <Counter />;
}
}

export default App;
~~~

Counter.js
~~~js
import React, { Component } from "react";

class Counter extends Component {
/*문자나 숫자는 안되고 객체이어야만 함 */
state = {
number: 0
};

handleIncrease = () => {
this.setState({
number: this.state.number + 1
});
};

handleDecrease = () => {
this.setState({
number: this.state.number - 1
});
};

render() {
return (
<div>
<h1>카운터</h1>
<div>값: {this.state.number}</div>
<button onClick={this.handleIncrease}>+</button>
<button onClick={this.handleDecrease}>-</button>
</div>
);
}
}
export default Counter;
~~~

### 함수형 컴포넌트 
- 속도 최적화에 사용할 수는 있지만 큰 차이는 없음, 컴포넌트를 더 간단하게 만들 수 있음<br/>
![함수형 컴포넌트](https://user-images.githubusercontent.com/18229419/61991846-c3e73700-b090-11e9-92d9-a13e1e20acf1.png)
