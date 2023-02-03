import React, { Component } from "react";

export default class FormTask extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        title: '',
        description: '',
        _id: '',
        content: null,
    }

    HandleChange = (e) => {
        //pedir name y value e.target.name....
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    FetchTask = () => {
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(data => {
                this.setState({ content: data.data });
                this.props.onData(this.state.content);
            })

    }

    AddTask = (e) => {

        e.preventDefault();
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: this.state.title,
                    description: this.state.description,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json)
                .then(data => {
                    let toastHTML = '<span>Task Update!</span><button class="btn-flat toast-action">Desliza</button>';
                    M.toast({ html: toastHTML })
                    this.setState({ _id: '', title: '', description: '' });
                    this.FetchTask();
                })

        } else {

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
                    this.FetchTask();
                })
                .catch(err => console.error(err));

        }

    }
    UpdateTask = (ID) => {
        fetch(`/api/tasks/${ID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id,
                })

            })

    }
    DeleteTask = (ID) => {
        if (confirm('¿Desea eliminar esta tarea?')) {
            fetch(`/api/tasks/${ID}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    let toastHTML = '<span>Task Delete!</span><button class="btn-flat toast-action">Desliza</button>';
                    M.toast({ html: toastHTML })
                    this.FetchTask();
                })
        }
    }

    componentDidMount() {
        console.log('Form load')
        this.FetchTask();
    }

    render() {

        return (
            <form onSubmit={this.AddTask}  >
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