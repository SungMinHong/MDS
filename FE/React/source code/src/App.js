import React, { Component } from 'react';
import PhoneForm from "./components/PhoneForm";
import PhoneInfoList from "./components/PhoneInfoList";

class App extends Component {
    id = 3;
    state = {
        information: [
            {
                id: 0,
                name: '홍길동',
                phone: '010-3192-1923'
            },
            {
                id: 1,
                name: '김방배',
                phone: '010-8688-3199'
            },
            {
                id: 2,
                name: '이무관',
                phone: '010-11-8623'
            }
        ],
        keyword: '',
    }

    handleSearchChange = (e) => {
        this.setState({
            keyword: e.target.value,
        });
    }


    handleCreate = (data) =>{
        this.setState({
            information: [...this.state.information, {
                ...data,
                id: ++this.id
            }]});
    }

    handleRemove = (id) => {
        const {information} = this.state;
        this.setState({
            information: information.filter(info =>info.id !== id)
        });

    }

    handleUpdate = (id, data) => {
        const { information } = this.state;
        this.setState({
            information: information.map(
                info => {
                    if (info.id === id) {
                        return {
                            id,
                            ...data,
                        };
                    }
                    return info;
                }
            )
        })
    }

    render() {
        return (
            <div>
                <PhoneForm onCreate={this.handleCreate}/>
                <input
                    value={this.state.keyword}
                    onChange={this.handleSearchChange}
                    placeholder={"검색..."}
                />
                <PhoneInfoList
                    data={this.state.information.filter(
                        info => info.name.indexOf(this.state.keyword) > -1
                    )}
                    onRemove={this.handleRemove}
                    onUpdate={this.handleUpdate}
                />
            </div>
        );
    }
}

export default App;