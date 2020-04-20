/*
    name : Header
    Date : 2020/01/25
    description : 商品主頁頂部頁面
*/

import React from "react";
import {Link,withRouter} from "react-router-dom";
import UserProfile from "./UserProfile";
import Panel from "./panel";

const Header = props => {

    /*
        Date : 2020/04/18
        Description : 當點擊用戶按鈕後觸發 => 打開Profile頁面
    */
    const toProfile = () => {
        Panel.open({
            component : UserProfile,
            props:{
                user:props.user
            },
            callback : (data) => { 
                if(data === "logout")
                {
                    props.history.go(0);
                }
            }
        })
    }

    //=====================================================================//

    return (
        <div className = "header">
                    <div className = "grid">
                        <div className = "start">
                            <Link to = "/">Home</Link>
                        </div>
                        <div className = "end">
                            {/* 若使用function傳遞輸入參數就不需要使用this */}
                            {props.user.nickname?(
                                <span className = "nickname" onClick={toProfile}>
                                <i className = "far fa-user"></i>
                                {props.user.nickname}
                                </span>   
                            ):(
                                <React.Fragment>
                                <Link to = "/login">Login</Link>
                                <Link to = "/register">Register</Link>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
    )
};

export default withRouter(Header);



