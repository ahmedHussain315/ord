import React, { Component } from 'react';
import {connect} from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert'
import requester from "../Apis/requester";
import CartForm2 from './CartForm2'
import Cart2 from './Cart2';
import "./styles/Cart.scss";

import { CLEAR_PROD, ADD_CART_ITEM } from '../Actions/index';

class Cart extends Component {
    state = {
        products:[],
        confirmShow : false
    }
    componentDidMount(){
        console.log(JSON.parse(window.localStorage.getItem("bigCart")));
    }

   
    confirm_handler= (lead) => {
        var items = JSON.parse(window.localStorage.getItem("bigCart"));
        var Order = [];
        console.log(items.items);
        items.items.map(i=>{
            
           var one = {
               price : i.price-i.discount,
               productId : i.id ,
               quantity :  parseInt( window.localStorage.getItem(i.id) )
           }
           Order.push(one);
        })

        var post_load = {
            Lead : lead,
            Orders : Order
        }
        console.log(post_load);
        requester.post("/land/placeOrders",post_load).then(response => {
            console.log(response);
            if(response.status === 200){
               this.setState({confirmShow : true});
               
            }
        })
    }
    
    render() {
        var items = JSON.parse(window.localStorage.getItem("bigCart"));
        

        return (
            <div className="Cart">
               <div className="products " style={{direction:this.props.gstate.langReducer.lang}}>
                               
                  {

                 items.items.length > 0 ? 
                  
                  items.items.map((item, index)=>{
                    return(
             
                    <Cart2 key={index} item={item}/>
                
                     
                    )
                })
                
                  :
                  <h3 className="text-center m-4">
                      {this.props.gstate.langReducer.lang === "rtl" ? "لا يوجد منتجات فى عربتك" : "there is no items in your cart"}
                  </h3>
                  }
                   {

                    window.localStorage.getItem("bigCart")?
                    <div className='form'>
                        <CartForm2 confirm_handler={this.confirm_handler}/>
                    </div>
                    :
                    <h3 className="text-center m-4 d-none">
                        ...
                    </h3>
                    }
                
                </div>       
                
                <SweetAlert 
                    success 
                    title={this.props.gstate.langReducer.lang === "rtl" ? "تمت بنجاح, شكرا لك" : "successfully done, thanks"} 
                    onConfirm={()=> {
                        this.setState({confirmShow:false});
                        window.localStorage.setItem("bigCart" ,JSON.stringify({items : []}));
                        // window.location.assign("/");
                    }} 
                    show={this.state.confirmShow}
                >
                    {this.props.gstate.langReducer.lang === "rtl" ? "الإستمرار فى التسوق" :  "Continue shopping !"}
                </SweetAlert>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps, { CLEAR_PROD, ADD_CART_ITEM } ) (Cart);     
          