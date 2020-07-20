import React, { Component } from "react";
import { connect } from "react-redux";
import requester from "../Apis/requester";
import "./styles/ProductPage.scss";
import CartForm from "./CartForm";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ReactImageFallback from "react-image-fallback";
import fallback_img from '../media/fallback.png';
import SweetAlert from 'react-bootstrap-sweetalert'
import { GET_PROD, CLEAR_PROD, ADD_CART_ITEM } from '../Actions/index';

class ProductPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            confirmShow : false,
            cartItemAdded : false
            
        }
    }
  

    componentDidMount(){
        window.scrollTo(0, 0);
        this.props.CLEAR_PROD();
        this.props.GET_PROD(this.props.match.params.id);
        console.log(this.state);
        if(!window.localStorage.getItem("bigCart")){
            window.localStorage.setItem("bigCart", JSON.stringify({"items" : []}))
        }
        
    
    }
    componentDidUpdate(){
        if (this.props.gstate.currentProd.currentProd.description) {
            this.descRef.current.innerHTML = this.props.gstate.currentProd.currentProd.description;
        }
    }
  
    ADD_CART_ITEM = (the_options) => {
        if(this.props.gstate.auth.clientId){
            var onrProductArray = [
                {
                    productid : this.props.match.params.id,
                    quantity : this.state.quantity,
                    options : the_options
                }
            ]
            this.props.ADD_CART_ITEM(this.props.gstate.auth.clientId,onrProductArray)
        }
        
    }

    confirm_handler= (lead, qty) => {
        var post_load = {
            Lead : lead,
            Order : {
                productId:this.props.match.params.id,
                price:this.props.gstate.currentProd.currentProd.price ,
                quantity:qty
            }
        }
        console.log(post_load);
        requester.post("/land/placeOrder",post_load).then(response => {
            console.log(response);
            if(response.status === 200){
                this.setState({confirmShow : true})
            }
        })
    }

    add_to_cart_handler = () => {
        var current = JSON.parse(window.localStorage.getItem("bigCart"));
        var currentItems = current.items;
        currentItems[currentItems.length] = (this.props.gstate.currentProd.currentProd);
        window.localStorage.setItem("bigCart" , JSON.stringify({items:currentItems}))
        console.log(JSON.parse(window.localStorage.getItem("bigCart")));
        this.setState({cartItemAdded : true})
    }
    numberString = (num) => {
        if(num === 1){return "قطعة متبقة"}
        else if(num === 2){return "قطع متبقيتين"}
        else if(num > 2 && num < 11){return "قطع متبقية"}
        else if(num > 11){return "قطعة متبقية"}
        else {return "غير متوفرة"}
    }
    descRef= React.createRef();
        render() {
            // var doc = new DOMParser().parseFromString(this.props.gstate.currentProd.currentProd.description, "text/html");
            // console.log(doc)
            if (this.props.gstate.currentProd.currentProd.id){
                return (
                    <div className="general-container">
                        <div className="product-page " style={{direction:this.props.gstate.langReducer.lang}}>
                        
                            <div className="img-box">

                                <Carousel   showArrows={false} thumbWidth={100}   showThumbs={false}   >
                                
                                    <div >
                                        <ReactImageFallback
                                        src={this.props.gstate.currentProd.currentProd.heroImage}
                                        fallbackImage={fallback_img}
                                        alt={this.props.gstate.currentProd.currentProd.name}
                                        className="prod-img" 
                                        />
                                    </div>   
                                    {this.props.gstate.currentProd.currentProd.carouselsUrls.length > 0 ? this.props.gstate.currentProd.currentProd.carouselsUrls.map((pic, index)=>{
                                        return (
                                            <div key={index}>
                                                <ReactImageFallback
                                                src={pic}
                                                fallbackImage={fallback_img}
                                                alt={this.props.gstate.currentProd.currentProd.name}
                                                className="prod-img" 
                                                />
                                            </div>   
                                        )
                                    }) 
                                    :
                                    <div>
                                        <ReactImageFallback
                                        src={fallback_img }
                                        fallbackImage={fallback_img}
                                        alt={this.props.gstate.currentProd.currentProd.name}
                                        className="prod-img" 
                                        />
                                    </div> }
                                </Carousel>
                                <p className="stock" style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>
                                    {this.props.gstate.currentProd.currentProd.stock} {this.props.gstate.langReducer.lang === "rtl" ? this.numberString(this.props.gstate.currentProd.currentProd.stock): "left in stock"}
                                </p>
                                 <p className="price" style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>
                                    {(this.props.gstate.currentProd.currentProd.price)-this.props.gstate.currentProd.currentProd.discount} {this.props.gstate.langReducer.lang === "rtl" ? "درهم" : "AED"} 
                                    {this.props.gstate.currentProd.currentProd.discount>0 ? <small className="old-price">&nbsp;{this.props.gstate.currentProd.currentProd.price} {this.props.gstate.langReducer.lang === "rtl" ? "درهم" : "AED"} &nbsp;</small> : null}
                                </p>
                                    <div className="btns_container" style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>

                                        <button 
                                            onClick={()=>{ 
                                                window.scrollTo({
                                                    top: window.outerHeight*1.2,
                                                    behavior: 'smooth',
                                                })
                                            
                                                }}
                                            className="btn_mr"
                                        >
                                            {this.props.gstate.langReducer.lang === "rtl" ? "شراء" : "Buy"}
                                        </button>

                                        <button 
                                            onClick={()=>{ 
                                                this.add_to_cart_handler()
                                                }}
                                        >
                                            {this.props.gstate.langReducer.lang === "rtl" ? "إضافة إلى العربة" : "Add To Cart"}
                                        </button>
                                    </div>
                            
                            
                            </div>

                            <div className="data-box">
                                <p className="name" style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>
                                    {this.props.gstate.langReducer.lang === "rtl" ? this.props.gstate.currentProd.currentProd.nameInArabic : this.props.gstate.currentProd.currentProd.name}
                                </p>

                              
                                <p className="desc" 
                               
                                 style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>
                                <b>{this.props.gstate.langReducer.lang === "rtl" ? "الوصف : " : "Description : "} </b> <br />
                                <span ref={this.descRef}></span>
                                </p>
                               


                                <p className="notes" style={{textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right" : "left" }}>
                                <b>{this.props.gstate.langReducer.lang === "rtl" ? "معلومات : " : "Notes : "}</b> <br />
                                {this.props.gstate.currentProd.currentProd.notes}
                                </p>


                            </div>
                            <div>
                                <CartForm stock={this.props} confirm_handler={this.confirm_handler} qty_control={true} btn_text={this.props.gstate.langReducer.lang === "rtl" ? "تأكيد الشراء" : "Confirm"}/>
                                <SweetAlert
                                    success
                                    title={this.props.gstate.langReducer.lang === "rtl" ? "شكرا لك" : "Thanks"}
                                    onConfirm={()=> {
                                        this.setState({confirmShow:false});
                                    }} 
                                    show={this.state.confirmShow}
                                >
                                   {this.props.gstate.langReducer.lang === "rtl" ? "الإستمرار فى التسوق" :  "Continue shopping !"}
                                </SweetAlert>
                                <SweetAlert success title={this.props.gstate.langReducer.lang === "rtl" ? "تم اضافة المنتح للعربة" : "item added to cart"} onConfirm={()=> {this.setState({cartItemAdded:false})}} show={this.state.cartItemAdded}>
                                   {this.props.gstate.langReducer.lang === "rtl" ? "الإستمرار فى التسوق" :  "Continue shopping !"}
                                </SweetAlert>
                            </div>
                        
                        </div>
                    </div>    
                );
            }
            else {
                return (
                    <div className="product-page">
                        <div className="spinner-box"> 
                            <div className="spinner-border spinner" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                   </div>    
                   </div>
                )

        }
    }}
const mapStateToProps = (state) => {
  return { gstate: state };
};


export default connect(mapStateToProps, {
  GET_PROD,
  CLEAR_PROD,
  ADD_CART_ITEM,
})(ProductPage);

