import React, { Component } from 'react';
import './styles/Footer.scss';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import U from "../media/u.png";
class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="footer_container" style={{direction:this.props.gstate.langReducer.lang}} >
                    <div className="data" style={{direction:"ltr", textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right " : "left  "}} >
                        <h4>{this.props.gstate.langReducer.lang === "rtl" ? "تواصل معنا" : "Contact Information"}</h4>
                        <p>{this.props.gstate.langReducer.lang === "rtl" ? "البريد الإلكترونى  " : "Email  "}<br/> info@innovation.com</p>
                        <p>{this.props.gstate.langReducer.lang === "rtl" ? "الهاتف  " : "Phone  "}<br/> +971 56 679 5422</p>
                        <p>{this.props.gstate.langReducer.lang === "rtl" ? "العنوان  " : "Address  "}<br/> {this.props.gstate.langReducer.lang === "rtl" ? "برج أوبال , بيزنس باي , دبى" : "Opal tower , Business Bay ,Dubai"}</p>
                    </div>
                    <div className="social">
                        <h4>{this.props.gstate.langReducer.lang === "rtl" ? "صفحات التواصل الاجتماعى" : "Social Media"}</h4>
                        <div className="social_container" style={{direction:"ltr", textAlign : this.props.gstate.langReducer.lang === "rtl" ? "right " : "left  "}}>
                            <Link to="/"> <i className="fab fa-facebook-square">  </i></Link>
                            <Link to="/"> <i className="fab fa-twitter-square">   </i></Link>
                            <Link to="/"> <i className="fab fa-youtube-square">   </i></Link>
                        </div>
                    </div>
                </div>
              <div className="copy">
                {this.props.gstate.langReducer.lang === "rtl" ? "Order © جميع الحقوق محفوظة 2020 " : "Ordr © Copyrights 2020. All Rights Reserved."}
                <br/>
                <br/>
                Crafted with 	&nbsp;
                <i className="text-danger fas fa-heart"></i>&nbsp;
                by 	&nbsp;
                <img className="logo" alt="urgent solutions" src={U}/>
              </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};


export default connect(mapStateToProps) (Footer);     


