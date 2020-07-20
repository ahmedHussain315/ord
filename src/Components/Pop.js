import React, { Component } from 'react';
import {connect} from 'react-redux';
import './styles/Pop.scss';
// import Logger from './Logger';

class Pop extends Component {
    

    render() {
        return(
            <div className="Pop" onClick={()=>{this.props.pop_display_controller("none")}}   style={{display: this.props.pop_display}}>
                
                
                <h1>pop to be used, just in case</h1>
               

                
                
            </div>
            ); 
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps) (Pop);  

