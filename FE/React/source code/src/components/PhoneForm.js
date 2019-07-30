import React, { Component } from 'react';

class PhoneForm extends Component {
    nameInputRef = null;

    state = {
        name: '',
        phone: '',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: '',
        })
        this.nameInputRef.focus();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name="name"
                           placeholder="이름"
                           onChange={this.handleChange}
                           value={this.state.name}
                           ref={ref => this.nameInputRef = ref}
                    />
                    <input name="phone"
                           placeholder="핸드폰번호"
                           onChange={this.handleChange}
                           value={this.state.phone}/>
                    <button type="submit">등록</button>
                </form>
            </div>
        );
    }
}

export default PhoneForm;