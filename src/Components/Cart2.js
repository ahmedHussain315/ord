import React, { Component } from 'react';
import {connect} from 'react-redux';
import ReactImageFallback from "react-image-fallback";
import fallback_img from '../media/fallback.png';
import SweetAlert from 'react-bootstrap-sweetalert'



class Cart2 extends Component {
    state = {
       qty : 1,
       lakeOfProductShow:false,
       itemRemove : false
    }
    componentDidMount(){
        window.localStorage.setItem(this.props.item.id, this.state.qty)
    }
    
    itemRemover = () => {
       this.setState({itemRemove :true})
    }

    render() {
        return (
            
            <div  style={{direction: this.props.gstate.langReducer.lang, textAlign: this.props.gstate.langReducer.lang === "rtl" ? "right" : "left"}} >
                            <div   className="prod-box">
                                <div className="img-box">
                                    <ReactImageFallback
                                        src={this.props.item.heroImage}
                                        fallbackImage={fallback_img}
                                        alt={this.props.item.name}
                                        className="prod-img" 
                                    />
                                </div>
                                <div className="data-box">
                                    <p className="name">{this.props.gstate.langReducer.lang === "rtl" ? this.props.item.nameInArabic : this.props.item.name}</p>
                                    <div className="data">
                                        <p className="price">
                                            <small>{this.props.gstate.langReducer.lang === "rtl" ? "سعر المنتج : " : "item price : "}</small>
                                            {this.props.item.price-this.props.item.discount} {this.props.gstate.langReducer.lang === "rtl" ? "درهم" : "AED"}  &nbsp;&nbsp;
                                            {this.props.item.discount>0 ? <span className="old-price">{this.props.item.price} </span> : null}
                                            
                                        </p>
                                        
                                    </div>
                                    <div className="qty" >
                                    {this.props.gstate.langReducer.lang === "rtl" ? " العدد : " : "QTY"}
                                            <i 
                                                onClick={()=>{
                                                    if(this.state.qty > 1){    
                                                var n = this.state.qty;
                                                this.setState({qty : n-1});
                                                window.localStorage.setItem(this.props.item.id, n-1)
                                                        }
                                                        else {
                                                            this.itemRemover()
                                                        }
                                                    }
                                                } 
                                                className=" mx-1 pointer qty-action fas fa-minus-circle"
                                                >
                                            </i>
                                            <span>{this.state.qty}</span>
                                            <i onClick={()=>{
                                                if(this.state.qty < this.props.item.stock){
                                                    var n = this.state.qty;
                                                    window.localStorage.setItem(this.props.item.id, n+1)
                                                    this.setState({qty : n +1});
                                                }
                                                else{
                                                    this.setState({lakeOfProductShow : true})
                                                }
                                               
            
                                                }} 
                                                className=" mx-1 pointer qty-action fas fa-plus-circle"
                                            >  
                                            </i>
                                          
                                        </div> 
                                </div>
                            </div>
                            <SweetAlert
                            title={this.props.gstate.langReducer.lang === "rtl" ? "لا يتوفر عدد اكبر من هذا المنتج" : "No more items in stock!"}
                            show= {this.state.lakeOfProductShow}
                            onConfirm={()=> {this.setState({lakeOfProductShow:false})}}
                            onCancel={()=> {this.setState({lakeOfProductShow:false})}}
                            />
                            <SweetAlert
                            showCancel
                            cancelBtnBsStyle = "danger"
                            title={this.props.gstate.langReducer.lang === "rtl" ? "إزالة هذا المنتج" : "remove this item ? "}
                            show= {this.state.itemRemove}
                            onConfirm={()=> {
                                this.setState({itemRemove:false});
                                var current = JSON.parse(window.localStorage.getItem("bigCart"));
                                var currentItems = current.items;
                                var  filterd_current = currentItems.filter((i)=>{
                                    return i.id !== this.props.item.id
                                })
                                window.localStorage.setItem("bigCart" , JSON.stringify({items:filterd_current}))
                                console.log(JSON.parse(window.localStorage.getItem("bigCart")));
                                // window.location.reload(true);                            
                            }}
                            onCancel={()=> {
                                this.setState({itemRemove:false});
                            }}
                            />
                        </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps) (Cart2);        