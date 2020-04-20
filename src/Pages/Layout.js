/*
    name : Layout
    Date : 2020/04/08
    description : 建立通用模板以供其他Conponent使用
*/

import React,{useMemo} from "react";
import Header from "../components/Header"

const Layout = (props) => {

    /*
        Date : 2020/04/18
        Description : 取得用戶輸入的數據(email,password,nickname,id)
        Note : React HOOK API(當依賴改變時才會從新計算return的值，避免每一次render都要重新計算)
    */
    const user = useMemo(() => {
        return global.auth.getUser() || {}
    },[])

    return(
        <div className="main">
            <Header user={user} />
            {props.children}
        </div>
    )
}

export default Layout;