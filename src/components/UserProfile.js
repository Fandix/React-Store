import React from "react"

const UserProfile = (props) => {

    /*
        Date : 2020/04/18
        Description : 當登出按鈕被點擊時觸發 => 刪除瀏覽器中的JWToken以達到登出的效果 
    */
    const logout = () => {

        //Step 1 : 刪除用戶瀏覽器中的JWToken
        global.auth.logout();

        //Step 2 : 由於Panel Component與Router Component為平行法調用到Router進行頁面刷新，所以將一個字串返回給上層以供其他使用
        props.close("logout");
    };



    return(
        <div className="user-profile">
            <p className="title has-text-centered">Profile</p>

            {/* --------------- 表單 ------------------ */}
            <fieldset disabled>
            {/******************** Nickname *********************/}
            <div className="field">
                <div className="control">
                    <label className="label">Nickname</label>
                    <input className="input" type="text" defaultValue={props.user.nickname} />
                </div>
            </div>
            {/******************** Email *********************/}
            <div className="field">
                <div className="control">
                    <label className="label">Email</label>
                    <input className="input" type="email" defaultValue={props.user.email}/>
                </div>
            </div>
            {/******************** Email *********************/}
            <div className="field">
                <div className="control">
                    <label className="label">Type</label>
                    <input className="input" type="text" defaultValue={props.user.type === 1 ? "Manager":"General User"} />
                </div>
            </div>
            </fieldset>

            {/******************** Button *********************/}
            <br />
            <br />
            <div className="field is-grouped is-grouped-centered">
                <div className="control">
                    <button className="button is-danger" type = "button" onClick={logout}>Logout</button>
                 </div>

                <div className="control">
                    <button className="button" type = "button" onClick={()=>{props.close()}}>Cancel</button>
                </div>
            </div>

            
        </div>
                    
    )
}


export default UserProfile;