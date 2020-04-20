//React是每一個js檔案中都需要include的
import React from 'react';
//引入 React DOM 其目的是可以將js檔案顯示HTML指定的元件中 (id and class....)
import ReactDOM from 'react-dom';
//include 其他js檔案宣告的元件，需要輸入"絕對路徑"不然默認裝況下會在package.jsom中尋找而導致錯誤
import { ToastContainer } from 'react-toastify';

//import Router
import Router from "./Router"

//JWT Token Funciton
import "../src/commons/auth"


//import CSS樣式
import "./css/app.scss";
import "./css/style.css"
import "./css/style.scss"
import 'react-toastify/dist/ReactToastify.css';

//將要顯示的東西指定給html中指定的元素，這邊使用id指定。
//若要將class顯示在html中，可以將class寫成與html一樣的標籤形式引入
ReactDOM.render(
<div>
    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
    />
    <Router />
</div>
,document.getElementById("root"));  //將Router渲染到html中，而Router已經將路徑設定完成