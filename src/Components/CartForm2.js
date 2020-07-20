import React , {Component} from 'react'
// import {connect} from 'react-redux';
// import { GET_PROD, CLEAR_PROD, ADD_CART_ITEM } from '../Actions/index';
import ReactFormInputValidation from "react-form-input-validation";
import {connect} from 'react-redux';
import { GET_PROD } from '../Actions/index';
import SweetAlert from 'react-bootstrap-sweetalert'
import "./styles/Cart.scss";


class CartForm2 extends Component{
    constructor(props) {
        super(props);
        this.state ={
            name:"",
            phone:"",
            emirate:"Abu Dhabi",
            address:"",
            lakeOfProductShow : false,
            completeData : false,
            qty :1,
            arrow_class : "",
            errors: {}
        };
        this.form = new ReactFormInputValidation(this);
        this.form.useRules({
        name: "required",
        phone: "required|numeric",
        emirate: "required",
        address: "required"
        });
        let messages = ReactFormInputValidation.getMessages("en");
        messages.required = "*Required" 
        ReactFormInputValidation.setMessages("en", messages);
    
        this.handleChange = this.handleChange.bind(this);
      }
      
      
      fomrSumbitter = ()=> {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const utm_campaign = urlParams.get("utm_campaign")||null;
        const utm_content = urlParams.get("utm_content")||null;
        const utm_source = urlParams.get("utm_source")||null;
        const utm_medium = urlParams.get("utm_medium")||null;
        const utm_term = urlParams.get("utm_term")||null;
        const u = urlParams.get("u") || "orle";
        
        var lead = {
                name: this.state.name,
                mobile: this.state.phone,
                utmsource:utm_source,
                utmcampaign:utm_campaign,
                utmMedium : utm_medium,
                utmTerm : utm_term,
                utmcontent:utm_content,
                empcode:u,
                shortage:"ordr",
                address:`${this.state.address} - ${this.state.emirate}`
        }
        if(this.state.name !== "" && this.state.phone !== "" && this.state.address!==""){
            this.props.confirm_handler(lead)
        }
        else{
            this.setState({completeData : true})
        }
        
}

    handleChange(event)
    {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        })
    }
    arrow_class_toggler = () => {
        if(this.state.arrow_class ==="rotate"){this.setState({arrow_class : ""})}
        else {this.setState({arrow_class : "rotate"})}
    }
    arrow_class_remover = () => {
        this.setState({arrow_class : ""})
    }
    qty_control = (action) =>{
        if(action ==="plus"){
            if(this.props.gstate.currentProd.currentProd.stock > 1 && this.state.qty < this.props.gstate.currentProd.currentProd.stock) {
                let qty = this.state.qty + 1;
                this.setState({
                    qty : qty
                })
            }else {
                this.setState({
                    lakeOfProductShow : true
                })
            }
        }
        else if (action ==="minus"){
            if(this.state.qty > 1) {
                let qty = this.state.qty - 1;
                this.setState({
                    qty : qty
                })
            }
            
        }
    }
    render(){
        return(
            <div className='cart-form'>
                <form onSubmit={(e)=>{e.preventDefault()}}>
                    <input  type="text" name="name" id="name"  placeholder={this.props.gstate.langReducer.lang === "rtl" ? "الأسم" : "Name"} value={this.state.name} onChange={this.handleChange}
              onBlur={this.form.handleBlurEvent} />
                    {this.state.errors.name && (
                        <div>
                            <label style = {{color: 'red',marginLeft: '5px'}} className="error">{this.state.errors.name}</label>
                        </div>
                        )}
                    <input  type="text" name="phone" id="phone" placeholder={this.props.gstate.langReducer.lang === "rtl" ? "رقم الهاتف" : "Phone"} value={this.state.phone} onChange={this.handleChange} onBlur={this.form.handleBlurEvent}/>
                    {this.state.errors.phone && (
                        <div>
                            <label style = {{color: 'red',marginLeft: '5px'}} className="error">{this.state.errors.phone}</label>
                        </div>
                        )}
                    <div   className="position-relative select-box">
                        <select
                        
                         className="w-100"
                         onChange={(e)=>{this.setState({emirate:e.target.value})}}
                         onBlur={this.arrow_class_remover}
                         onClick={this.arrow_class_toggler}
                        > 
                           <option  value="Abu Dhabi">{this.props.gstate.langReducer.lang === "rtl" ? "أبوظبي" : "Abu Dhabi"}</option>
                            <option  value="Dubai">{this.props.gstate.langReducer.lang === "rtl" ? "دبى" : "dubi"} </option>
                            <option  value="Ajman">{this.props.gstate.langReducer.lang === "rtl" ? "عجمان" : "Ajman"}</option>
                            <option  value="Fujairah">{this.props.gstate.langReducer.lang === "rtl" ? "الفجيرة" : "Fujairah"}</option>
                            <option  value="Ras al Khaimah">{this.props.gstate.langReducer.lang === "rtl" ? "راس الخيمة" : "Ras al Khaimah"}</option>
                            <option  value="Umm al Quwain">{this.props.gstate.langReducer.lang === "rtl" ? "ام القيوين" : "Umm al Quwain"}</option>
                            <option  value="Sharjah">{this.props.gstate.langReducer.lang === "rtl" ? "الشارقة" : "Sharjah"}</option>
                        </select>
                        <span  className={`position-absolute arrow ${this.state.arrow_class}`} style={this.props.gstate.langReducer.lang === "rtl" ? {left : "5%"} : {right: "5%"} }><i className=" mx-3 pointer qty-action fas fa-sort-down"></i></span>

                    </div>
                        
                    <input  type="text" name="address" id="address"placeholder={this.props.gstate.langReducer.lang === "rtl" ? "العنوان" : "Address"} value={this.state.address} onChange={this.handleChange} onBlur={this.form.handleBlurEvent} />
                    {this.state.errors.address && (
                        <div>
                            <label style = {{color: 'red',marginLeft: '5px'}} className="error">{this.state.errors.address}</label>
                        </div>
                        )}
                    { this.props.qty_control ? 
                        <div className="qty" >
                            QTY : 
                            <i onClick={()=>{this.qty_control("minus")}} className=" mx-3 pointer qty-action fas fa-minus-circle"></i>
                            <span>{this.state.qty}</span>
                            <i onClick={()=>{this.qty_control("plus")}} className=" mx-3 pointer qty-action fas fa-plus-circle"></i>
                        </div>
                         :
                        null
                    }
                    <button onClick={this.fomrSumbitter}>
                        {this.props.btn_text || "Buy"}
                    </button>
                   
                    <SweetAlert
                    title={this.props.gstate.langReducer.lang === "rtl" ? "لا يتوفر عدد اكبر من هذا المنتج" : "No more items in stock!"}
                    show= {this.state.lakeOfProductShow}
                    onConfirm={()=> {this.setState({lakeOfProductShow:false})}}
                    onCancel={()=> {this.setState({lakeOfProductShow:false})}}
                    />
                    <SweetAlert
                    title={this.props.gstate.langReducer.lang === "rtl" ? "يرجى ادخال كافة بياناتك" : "please enter your data"}
                    show= {this.state.completeData}
                    onConfirm={()=> {this.setState({completeData:false})}}
                    onCancel={()=> {this.setState({completeData:false})}}
                    />
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {gstate : state};
};

export default connect(mapStateToProps, {GET_PROD}) (CartForm2);
