/*
    name : ToolBox
    Date : 2020/03/21
    description : 搜尋欄位與購物車按鈕
*/

import React from "react"
import {withRouter}  from "react-router-dom"
import { toast } from "react-toastify";

class ToolBox extends React.Component
{
    state = {
        searchText:""
    }

    //=====================================================================//

    handleChange = e =>{
        const value = e.target.value;
        this.setState({
            searchText:value
        })
        this.props.search(value);
    }

    //=====================================================================//
    
    clearSearchText = () =>{
        this.setState({
            searchText:""
        })
        this.props.search("")
    }

    //=====================================================================//

    /*
        Date : 2020/04/08
        Description : 購物車按鈕點擊後觸發 => 進入購物車頁面
    */
    goCart = () => {
        if(!global.auth.isLogin())
        {
            this.props.history.push("/Login");     
            toast.info("Please Login First")
            return;   
        }
        this.props.history.push("/cart");
    };

    //=====================================================================//

    render()
    {
        return(
            <div className = "tool-box">
                {/*----------- Logo -----------*/}
                    <div className = "logo-text">STORE</div>
                {/*----------- Search -----------*/}
                    <div className = "search-box">
                        <div class="field has-addons">
                            <div className = "control">
                                <input 
                                className="input search-input" 
                                type="text" 
                                placeholder="Search Product" 
                                value = {this.state.searchText}
                                onChange = {this.handleChange}
                                />
                            </div>
                            <div className = "control">
                                <button className = "button" onClick = {this.clearSearchText}>X</button>
                            </div>
                        </div>
                    </div>
                {/*----------- Shopping Car -----------*/}
                    <div to="./" className = "cart-box" onClick={this.goCart}>
                        <i className = "fas fa-shopping-cart"></i>
                        <span className = "cart-num">({this.props.cartNum})</span>
                    </div>
            </div>
        );
    }
};
export default withRouter(ToolBox);