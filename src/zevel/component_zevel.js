import React from 'react';
import globals from './globalTmp';

class Miki extends React.Component{
    constructor(props){
        super(props);
    }
    render(){

        return (<div>{globals.i_am_global}</div>);
    }
}
export default Miki;



