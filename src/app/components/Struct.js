import React, { Component } from "react";
import FormTask from "./FormTask";


export default class BlockStruct extends Component {

    state = {
        content: null,

    }

    FetchTask = () => {
        fetch('/api/tasks/')
            .then(response => response.json())
            .then(data => {
                this.setState({ content: data.data });
            })
    }
    componentDidMount() {
        console.log('updateStruct')
        this.FetchTask();
    }
    componentDidUpdate() {
        this.FetchTask();
    }
    render() {
        const conteiner = []
        if (this.state.content === null) {
            return <>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card grey darken-4">
                                <div className="card-content">
                                    <FormTask />
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <div className="table-responsive">
                                <table className="table table-striped table-dark">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tarea</th>
                                            <th scope="col">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr scope="col" >
                                            <td >cargando</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div></>

        } else {
            for (let tasks in this.state.content) {
                conteiner.push(
                    <tr key={this.state.content[tasks]._id}>
                        <td >{Number(tasks) + 1}</td>
                        <td >{this.state.content[tasks].title}</td>
                        <td >{this.state.content[tasks].description}</td>
                    </tr>
                )
            }
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col s5">
                        <div className="card grey darken-4">
                            <div className="card-content">
                                <FormTask />
                            </div>
                        </div>
                    </div>
                    <div className="col s7">
                        <div className="table-responsive">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Tarea</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {
                                        conteiner
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