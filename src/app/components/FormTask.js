import React, { Component } from "react";

export default class FormTask extends Component {


    state = {
        title: '',
        description: '',
        _id: '',
    }
    obtenerId = () => {
        this.state._id = this.props.updateTask;

    }
    HandleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        })
    }

    FetchTask = () => {
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(data => {
                this.obtenerId();
            })


    }

    AddTask = (e) => {
        e.preventDefault();
        if (this.state.title == '') {
            alert('Por favor ponga un titulo a la tarea');
        } else {
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
                        console.log(data.status)
                        let toastHTML = '<span>Task Saved!</span><button class="btn-flat toast-action">Desliza</button>';
                        M.toast({ html: toastHTML })
                        this.setState({ title: '', description: '' });
                        this.FetchTask();
                    })
                    .catch(err => console.error(err));

            }


        }
    }



    componentDidMount() {
        console.log('Form load')
        this.FetchTask();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.updateTask !== this.props.updateTask) {
            this.FetchTask();
        }
    }

    render() {

        return (
            <form onSubmit={this.AddTask} >
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
                <button className="waves-effect light-blue darken-4 btn-large" onClick={this.props.IdChangeHandler} type="submit" > Send Task </button>
            </form>

        );
    };

};