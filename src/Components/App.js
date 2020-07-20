import React, { Component } from 'react';


import {connect} from 'react-redux';

import Orderato from './Orderato';
import Pop from './Pop';

import './styles/App.scss';



// amira
class App extends Component {
    state = {
        pop_display : "none"
    }

    pop_display_controller = (prop) =>{
        this.setState({pop_display : prop})
    }

    render() {
        return (
            
            <div className="App" style={{position:"relative", minHeight:"100vh"}}>
                <Orderato pop_display_controller={this.pop_display_controller} />
                <Pop  pop_display_controller={this.pop_display_controller}   pop_display={this.state.pop_display}/>
            </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps) (App);        