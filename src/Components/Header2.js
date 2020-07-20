import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Header2.scss';


import offer1 from '../media/offer1.png';
import offer2 from '../media/offer2.png';
import offer3 from '../media/offer3.png';

import OwlCarousel from 'react-owl-carousel2';
import '../../node_modules/react-owl-carousel2/lib/styles.css'; //Allows for server-side rendering.

import {connect} from 'react-redux';


class Header1 extends Component {
 
    state={
       
    }

    componentDidMount() {
       console.log("Header 2 is mounted");
    }

    render() {
        const options = {
            items: 1,
            rewind: true,
            nav : false,
            mouseDrag :false,
            autoplay : true
        };
         
       
        return (
            <div className="Header2-2">
            
                    <div className="general-container py-3">
                        <OwlCarousel ref="car" options={options}  >
                                <div className="img-box" > <Link to="/product/some_Product_ID"><img src={offer1} alt="offer banner"/></Link> </div>
                                <div className="img-box" > <Link to="/product/some_Product_ID"><img src={offer2} alt="offer banner"/></Link> </div>
                                <div className="img-box" > <Link to="/product/some_Product_ID"><img src={offer3} alt="offer banner"/></Link> </div>
                                
                        </OwlCarousel>
                    </div>    
             
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};


export default connect(mapStateToProps) (Header1);     



