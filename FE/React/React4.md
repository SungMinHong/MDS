## LifeCycle API 소개 및 사용법
![생명주기](https://user-images.githubusercontent.com/18229419/61991948-94392e80-b092-11e9-8e7c-04f4601b5f59.png)

### 3가지 단계
- Mounting: 컴포넌트가 브라우저 상에 나타나는 것을 의미
- Updating: 컴포넌트의 props가 바뀌거나 state가 바뀌었을 때를 의미
- Unmounting: 컴포넌트가 브라우저 상에서 사라지는 것을 의미 

### 함수
- Constructor: 생성자 함수. 컴포넌트가 만들어질 때 가장 먼저 실행되는 함수. 컴포넌트가 가지고 있을 state를 초기화하거나 컴포넌트가 만들어지는 과정에서 먼저 실행해야하는 것을 이 함수에서 처리한다.

- getDrivedStateFromProps: 주로 props로 받은 값을 state에 바로 동기화하고 싶은 경우 이 함수를 사용한다. mounting과정에도 실행이되고 props가 변경이되도 실행이 된다.

- render:  어떤 돔을 만들게 될지 내부에있는 태그들에 어떤 값을 전달해 줄지 정의 해준다. 

- componentDidMount: 브라우저상에 나타나게 된 경우 해당 함수가 호출이 된다. 예를 들어 외부 차트 라이브러리를 사용하는 경우 특정 dom에 차트를 그려달라고 정의할 수 있다. Api 요청을 하는 경우 여기에서 처리하게 된다, 특정 이벤트(스크롤, 클릭 등)를 리스링할 수 있다.

- shouldComponentUpdate: 컴포넌트가 업데이트되는 성능을 최적화하고 싶을 때 사용한다. 컴포넌트는 기본적으로 부모 컴포넌트가 리랜더링 되면 그 부모 자식 컴포넌트들도 랜더함수가 실행이 된다.  이 작업이 가끔씩 불필요한 경우가 있다. 버츄얼돔에서 실제로 업데이트된 부분만 업데이트되서 빠르지만 랜더함수가 호출이 되 버츄얼 돔 상에 그리고 있는 것이다. 버츄얼 돔 상에 그리는 리소스 조차 아끼고 싶은 경우 shouldComponentUpdate함수를 사용한다. 해당 함수는 true/false를 반환할 수 있다. true 반환시에는 랜더 과정을 거치는 것이고 false를 반환할 경우 랜더 과정을 거치지 않는다. 

- getSnapshotBeforeUpdate: 랜더링을 한 이후에 브라우저에 반영되기 직전에 호출되는 함수이다. 스크롤의 위치, 해당 돔의 크기를 사전에 가져오고 싶은 경우 해당 함수를 사용한다. 

- componentDidUpdate: 컴포넌트가 업데이트 되었을 때 호출되는 함수이다. 주로  state가 바뀐 경우 이전의 상태와 비교해 지금 상태가 바뀐 경우 어떤 작업을 할지 정의 해둘 수 있다. 스크롤 위치등을 받아서 그려줄 수 있다(크롬, 파이어폭스는 기본적으로 제공돼서 필요 없지만 다른 브라우저에서는 직접 코드를 작성해야함.

- componentWillUnmount: 컴포넌트가 사라지는 과정에서 호출되는 함수이다. componentDidMount에서 설정한 리스너를 없애주는 작업을 할 수 있다.


[예제 코드](https://codesandbox.io/s/xl313zyrkw)


컴포넌트에 에러 발생시
render 함수에서 에러가 발생한다면, 리액트 앱이 크래쉬 되어버립니다. 그러한 상황에 유용하게 사용 할 수 있는 API가 한 가지 있다.

ComponentDidCatch로 잡으면 된다. 단 부모 컴포넌트에서만 잡을 수 있다.

~~~js
import React, { Component } from 'react';
import MyComponent from './MyComponent';

class App extends Component {
state = {
counter: 1,
error: false
};

componentDidCatch(error, info) {
console.log(error);
console.log(info);
this.setState({
error: true
});
}

constructor(props) {
super(props);
console.log('constructor');
}

componentDidMount() {
console.log('componentDidMount');
// console.log(this.myDiv.getBoundingClientRect());
}

handleClick = () => {
console.log(this.state.counter + 1);
this.setState({
counter: this.state.counter + 1
});
};

render() {
if (this.state.error) {
return (
<div>
예상치 못한 에러입니다. 최선을 다해 복구하겠습니다. 감사합니다.
</div>
);
}
return (
<div ref={ref => (this.myDiv = ref)}>
{this.state.counter > 15 && <MyComponent value={this.state.counter} />}
{this.state.counter < 10 && <MyComponent value={this.state.counter} />}
<button onClick={this.handleClick}>Click Me</button>
</div>
);
}
}

export default App;
~~~
