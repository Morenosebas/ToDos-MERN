import React, { Component } from "react";

export default class FormTask extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        title: '',
        description: '',
    }

    HandleChange = (e) => {
        //pedir name y value e.target.name....
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }
    AddTask = (e) => {
        console.log(this.state.title);
        console.log(this.state.description);
        fetch('/api/tasks/', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let toastHTML = '<span>Task Saved!</span><button class="btn-flat toast-action">Desliza</button>';
                M.toast({ html: toastHTML })
                this.setState({ title: '', description: '' });
            })
            .catch(err => console.error(err));
        e.preventDefault();
    }

    componentDidMount() {
        console.log('Form load')
    }
    render() {

        return (
            <form onSubmit={this.AddTask}>
                <div className="row">
                    <div className="input-field col s12">
                        <input name="title" type='text' value={this.state.title} onChange={this.HandleChange} placeholder={'Task title'} style={{ color: 'white' }}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <textarea name="description" onChange={this.HandleChange} placeholder="Task description" className="materialize-textarea" style={{ color: 'white' }} value={this.state.description}></textarea>
                    </div>
                </div>
                <button className="waves-effect light-blue darken-4 btn-large" type="submit" > Add Task </button>
            </form>

        );
    };

};