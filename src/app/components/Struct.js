import React, { Component } from "react";
import FormTask from "./FormTask";


export default class BlockStruct extends Component {

    state = {
        dataBlock: null,
        _id: '',
        status: ''
    }
    IdChange = () => {
        console.log('IDCHANGE EJECUTADA')
        this.setState({ _id: '', status: 'POST' })
        this.FetchFirst();


    }
    FetchFirst = () => {
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(data => {
                this.setState({ dataBlock: data.data, status: '' })
            })
    }

    componentDidMount() {
        this.FetchFirst();
    }
    componentDidUpdate(prevProps, prevState) {
        //probar incrementando la prevState para hacer un cambio
        if ((prevState._id !== this.state._id) || (this.state.status == 'POST')) {
            this.FetchFirst();
        }
    }
    deleteTask = (id) => {
        if (confirm('¿Desea eliminar esta tarea?')) {
            fetch(`/api/tasks/${id}`, {
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
                    this.FetchFirst();
                })
        }
    }
    updateTask = (id) => {
        fetch(`/api/tasks/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    title: data.task.title,
                    description: data.task.description,
                    _id: data.task._id,

                })
            })

    }


    render() {
        if (this.state.dataBlock === null) {
            return <></>

        } else {
            console.log('data form else render', this.state.dataBlock)
        }
        return (

            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card grey darken-4">
                            <div className="card-content">
                                <FormTask IdChangeHandler={this.IdChange} updateTask={this.state._id} />
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <div className="table-responsive">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr key={'thead'}>
                                        <th scope="col">#</th>
                                        <th scope="col">Tarea</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        this.state.dataBlock.map((task, index) => (
                                            <tr key={(task._id)}>
                                                <td >{index + 1}</td>
                                                <td >{task.title}</td>
                                                <td >{task.description}</td>
                                                <td>
                                                    <button className={"btn light-blue darken-4"} onClick={() => this.deleteTask(task._id)} >
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                </td>
                                                <td>
                                                    <button className="btn light-blue darken-4" onClick={() => { this.updateTask(task._id) }} >
                                                        <i className="material-icons" >edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );



    };
};