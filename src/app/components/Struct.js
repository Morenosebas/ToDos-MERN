import React, { Component } from "react";
import FormTask from "./FormTask";


export default class BlockStruct extends Component {

    constructor(props){
        super(props)
        this.ReceiveData();
    }
    state = {
        dataBlock: null,
    }


    ReceiveData = (dataForm) => {
        this.state.dataBlock = dataForm;
        console.log(this.state.dataBlock)

    }
    componentDidMount() {
        console.log('updateStruct')
        this.ReceiveData();
    }

    componentDidUpdate(){
        this.ReceiveData();

    }

    render() {
        const conteiner = []
        console.log('Data form',this.state.dataBlock )
        if (this.state.dataBlock === null) {
            return <>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card grey darken-4">
                                <div className="card-content">
                                    <FormTask onData={this.ReceiveData} />
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
            for (let tasks in this.state.dataBlock) {
                conteiner.push(
                    <tr key={this.state.dataBlock[tasks]._id}>
                        <td >{Number(tasks) + 1}</td>
                        <td >{this.state.dataBlock[tasks].title}</td>
                        <td >{this.state.dataBlock[tasks].description}</td>
                        <td>
                            <button className="btn light-blue darken-4" >
                                <i className="material-icons">delete</i>
                            </button>
                        </td>
                        <td>
                            <button className="btn light-blue darken-4" >
                                <i className="material-icons">edit</i>
                            </button>
                        </td>
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
                                <FormTask onData={this.ReceiveData} />
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