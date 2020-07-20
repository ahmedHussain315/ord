import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Header1.scss';
import logo from '../media/o.png';

import cartIcon from '../media/cart.png';
import ar from '../media/ar.png';
import en from '../media/en.png';
import {connect} from 'react-redux';
import { GET_FEED_PRODS, CHANGE_LANG } from '../Actions/index';



class Header1 extends Component {
 
    state={
       searchTerm: "",
       searchResult: []
    }

    componentDidMount() {
        // TODO get all products from redux
       this.props.GET_FEED_PRODS(); 
       if(window.localStorage.getItem("lang")) {
        this.props.CHANGE_LANG(window.localStorage.getItem("lang"));
       }
       

        // TODO filter thes products
        // TODO setState Result search
    //    
    }

    handleChange = e =>{
        this.setState({
            searchTerm: e.target.value
        })
        this.setState({searchResult: this.props.gstate.feedProds.feedProds.filter(product=> (product.name.toLowerCase()).includes(this.state.searchTerm.toLowerCase()))})
        console.log(this.state.searchResult)

    }


    render() {
      
       
        return (
            <>
                <div className="Header1-2" style={{direction:this.props.gstate.langReducer.lang}}>
                    
                    <div className="general-container">
                        <div className="img-div">
                            <Link  to="/"  ><img alt="logo" src={logo} /></Link>
                        </div>
                        {/* <form>
                        <input
                            type="text"
                            placeholder="Search"
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                        />
                        </form>
                        <ul className="search_area">
                            {this.state.searchResult.length &&
                            this.state.searchResult.map(item => <li key = {item.id}>{item.name}</li>)
                            }
                        </ul> */}
                    
                        <div className="log-and-cart">
                      
                            <div className="cart-div">
                                <Link  to="/Cart">
                                    <img alt="shopping cart logo" src={cartIcon}/>
                                </Link> 
                               
                            </div>
                                <form  className="mx-2">
                                    <label htmlFor="lang" className="mx-4">  {window.localStorage.getItem("lang") === "rtl" ?  <img style={{width:"35px"}} src={en}/> : <img style={{width:"35px"}} src={ar}/> } </label>
                                    <select name="languages" id="lang" onChange={(e)=>{
                                        console.log(e.target.value);
                                        this.props.CHANGE_LANG(e.target.value);
                                        window.localStorage.setItem("lang",e.target.value )
                                    }}>
                                        
                                          
                                            <>
                                            <option value="rtl">AR</option>
                                            <option value="ltr">EN</option>
                                            </>
                                           
                                        
                                    </select>
                                    
                                </form>
                        </div>
                    </div>  

                </div>      
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {gstate : state};
};


export default connect(mapStateToProps, {GET_FEED_PRODS, CHANGE_LANG}) (Header1);     



