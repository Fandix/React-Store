import React from "react";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import App from "./Pages/App";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound"
import Cart from "../src/Pages/Cart"
import Register from "../src/Pages/Register"

const Router = () =>(
    <BrowserRouter>
        <Switch>
            {/* 
                指定主畫面輸出到App,加上"exact"達到精確匹配 
                --> 若沒有加上精確匹配，會導致就算看到"/login"也只會匹配到第一個字元"/"所以就會直接輸出主畫面
            */}
            <Route path = "/" exact component = {App} />  
            {/* 指定login輸出到Login */}
            <Route path = "/login" component = {Login} />
            <Route path = "/register" component = {Register} />
            <Route path = "/cart" component = {Cart} />
            {/* 將為定義的路徑指定到 Not Found */}
            <Route component = {NotFound} />
            
        </Switch>
    </BrowserRouter>
)

export default Router;