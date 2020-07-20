import React, { Component } from 'react';
import './styles/SingleProductCard.scss';

import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import ReactImageFallback from "react-image-fallback";
import fallback_img from '../media/fallback.png';
import { CLEAR_PROD, ADD_CART_ITEM } from '../Actions/index';

class SingleProductCard extends Component {

    render() {
        return (
            <Link to={`/product/${this.props.item.id}`}>
                <div onClick={this.props.CLEAR_PROD}  className="prod-box" style={{direction:this.props.gstate.langReducer.lang}}>
                    <div className="img-box">
                        <ReactImageFallback
                            src={this.props.item.heroImage}
                            fallbackImage={fallback_img}
                            alt={this.props.item.name}
                            className="prod-img" 
                        />
                    </div>
                    <div className="data-box">
                        <p className="name">{}{this.props.gstate.langReducer.lang === "rtl" ? this.props.item.nameInArabic : this.props.item.name}</p>
                        <div className="data">
                            <p className="price">
                                {this.props.item.price-this.props.item.discount} {this.props.gstate.langReducer.lang === "rtl" ? "درهم" : "AED"} &nbsp;&nbsp;
                                {this.props.item.discount>0 ? <span className="old-price">{this.props.item.price} EGB </span> : null}
                                
                            </p>
                            
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps, {CLEAR_PROD, ADD_CART_ITEM} ) (SingleProductCard);

