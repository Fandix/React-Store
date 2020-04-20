/*
    name : auth
    Date : 2020/04/18
    description : 將登錄用戶的jwt token Method統一管理
*/

import decode from "jwt-decode"

const JWT = "store_token_id"

//=====================================================================//

/*
    Date : 2020/04/18
    Description : 將JWT Token利用"localStorage"的Method保存在使用者的瀏覽器中
    NOTE : 語法 -> localStorage.setItem(key, value)
*/
const setToken = (token) => {
    localStorage.setItem(JWT,token);
}

//=====================================================================//

/*
    Date : 2020/04/18
    Description : 利用"localStorage"的Method取得使用者瀏覽器中的JWT Token
    NOTE : 語法 -> localStorage.getItem(key)
*/
const getToken = () => {
    return localStorage.getItem(JWT);
};

//=====================================================================//

/*
    Date : 2020/04/18
    Description :  判斷用戶登錄是否已超時
*/

const isTokenExpired = (toKen) => {
    try 
    {
        //Step 1:取得用戶瀏覽器中的toKen
        const _info = decode(toKen);

        //Step 2:超時判斷
        if(_info.exp < Date.now() / 1000)
        {
            return true;
        }
        else
        {
            return false;
        }
    } 
    catch (error) 
    {
        return false;
    }
};

//=====================================================================//

/*
    Date : 2020/04/18
    Description :  判斷用戶使否已經登錄
*/
const isLogin = () => {
    const jwToken = getToken();
    if(jwToken && !isTokenExpired(jwToken))
    {
        return true;
    }
    else
    {
        return false;
    }
};

//=====================================================================//

/*
    Date : 2020/04/18
    Description : 將用戶的JWT Token進行解碼
*/
const getUser = () => {

    //Step 1:取得瀏覽器中的JWToken
    const jwToken = getToken();

    //Step 2 : 判斷用戶是否已登錄
    if(isLogin())
    {
        //Step 3 : 將取得的JWToken進行解碼
        const user = decode(jwToken);
        return user
    }
    else
    {
       return null;
    }
};

//=====================================================================//

/*
    Date : 2020/04/18
    Description : 刪除用戶瀏覽器中的JWToken以達到登出的目的
    NOTE : 語法 -> localStorage.removeItem(key);
*/

const logout = () => {
    localStorage.removeItem(JWT);
}


//=====================================================================//

//將setToken function設置為全域
global.auth = {
    setToken,
    getUser,
    logout,
    isLogin,
    getToken
}