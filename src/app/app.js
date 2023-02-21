import React, { Component } from "react";
import Navigator from "./components/Navigator";
import BlockStruct from "./components/Struct";
export default class App extends Component {

    componentDidMount(){
        console.log('app load')
    }
    render() {


        return (
            <div>
                <Navigator />
                <BlockStruct />
            </div>

        )
    };
};
