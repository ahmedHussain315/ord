import React, { Component } from 'react';
import {Route} from "react-router-dom";
import {connect} from 'react-redux';


import Cart from "./Cart";
import Cart2 from "./Cart2";
import Header1 from './Header1';
import Header2 from './Header2';
import FeedProducts from './FeedProducts';
import ProductPage from './ProductPage';
import Footer from './Footer';
import './styles/Orderato.scss';



class Orderato extends Component {
    componentDidMount(){
        console.log("innovation mounted");
    }

    
    render() {
        return (
          
               
                <div className="Orderato" >

                    <Route          path="/"  component={Header1}/>
                    <Route   exact  path="/"  component={Header2}/>
                    <Route   exact  path="/"  component={FeedProducts}/>
                    <Route          path="/product/:id"  component={ProductPage}/>
                    <Route          path="/Cart"  component={Cart}/>
                    <Route          path="/"  component={Footer}/>
                   

                </div>
                
        
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

       
export default connect(mapStateToProps) (Orderato);     