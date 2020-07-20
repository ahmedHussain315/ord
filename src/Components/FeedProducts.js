import React, { Component } from 'react';
import "./styles/FeedProducts.scss";

import {connect} from 'react-redux';
import { GET_FEED_PRODS} from '../Actions/index';

import SingleProductCard from './SingleProductCard';
class FeedProducts extends Component {
  
   componentDidMount(){ 

      
   } 

  


  
    render() {
        return (
            <div className="feed">
                <div className="general-container">
                    
                   
                  

                    {
                        this.props.gstate.feedProds.feedProds.length>0 ? 

                        <div className="feed-prods" >
                            {
                            this.props.gstate.feedProds.feedProds.map((i,index)=>(

                                <SingleProductCard key={index} itemIndex={index} item={i}/>

                                ))
                            }
                        </div> 

                            :

                        <div className="spinner-box"> 
                            <div className="spinner-border spinner" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }

                </div> 
                
            </div>
        );
    }



}


const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps, {GET_FEED_PRODS}) (FeedProducts);        