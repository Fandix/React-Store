/*
    name : Product
    Date : 2020/03/12
    description : 單一商品組件
*/

import React from "react";
import {formatPrice} from "../commons/helper"; //引用function
import Panel from "./panel";
import EditInventory from "./Editinverntory";
import axios from "../commons/axios";
import {toast} from 'react-toastify';
import {withRouter} from "react-router-dom"

class Product extends React.Component
{
    /*
        Date : 2020/04/04
        Description : 當商品卡片的編輯按鈕被點擊時所觸發
    */
    ToEdit = () => {
        Panel.open({
            component : EditInventory, 
            props : {
                product : this.props.product,
                deleteProduct : this.props.delete 
            },
            callback : (data) => { 
                this.props.update(data);
            }   
        })
    };

    //=====================================================================//

    /*
        Date : 2020/04/05
        Description : 當購物車按鈕被點擊時觸發
    */
    addCart = async() => {
        if(!global.auth.isLogin())
        {
            this.props.history.push("/Login");     
            toast.info("Please Login First")
            return;   
        }
        //Step 5:使用try catch來抓取錯誤並輸出error message
        try 
        {
            //Step 1:將商品物件導入
            const user = global.auth.getUser() || {};
            const {id,name,image,price} = this.props.product;
            
            //Step 2:查詢購物車中是否已經存在同樣id的商品
            const res = await axios.get(`/carts?productId=${id}`);
            const carts = res.data;

            if(carts && carts.length > 0)
            {
                const cart = carts[0];
                cart.mount += 1; 
                axios.put(`/carts/${cart.id}`,cart)
            }
            else
            {
                //Step 3:放入cart Object中
                const cart = {
                    productId : id,
                    name : name,
                    image : image,
                    price : price,
                    mount : 1, //在購物車中的數量，初始值為1
                    userId: user.email
                };

                //Step 4:將選擇好的物件(cart Object)放入axios資料庫中
                await axios.post("/carts",cart);  
            }
            toast.success("Add Cart Success!!");
            this.props.updataCartNum();
        } 
        catch (error) 
        {
            console.log(error)
            toast.error("Add Cart False!!");
        }  
    };

    //=====================================================================//

    /*
        Date : 2020/04/18
        Description : 判斷權限以確認是否顯示商品編輯的功能
    */
    renderManagerBtn = () => {
        
        //Step 1 : 取得目前登錄用戶的資訊
        const user = global.auth.getUser() || {};

        //Step 2 : 判斷目前登錄的帳號type是否為Manager
        if(user.type === 1)
        {
            return(
                <div className="p-head has-text-right">
                    <span className="icon edit-btn">
                        <i className="fas fa-sliders-h" onClick={this.ToEdit}></i>
                    </span>
                </div>
            )
        }
    };

    //=====================================================================//

    render()
    {
        const {name,image,tags,price,status} = this.props.product;
        const _pClass = {
            available:"product",
            unavailable : "product out-stock"
        }

        return(
            //使用status狀態丟入_pClass中輸出available或unavailable
            //unavailable中會使scss套用.out-stock {.out-stock-text {z-index: 1;}讓class : out-stock-text(缺貨提示)往上移動一層
            //而available則輸出product讓class : out-stock-text(缺貨提示)隱藏在圖片後面
            <div className = {_pClass[status]}>
                <div className = "p-content">
                    {/* 更新商品 */}
                    {this.renderManagerBtn()}
                    <div className = "img-wrapper">
                        {/* 缺貨提示 */}
                        <div className = "out-stock-text">Out Stock</div>
                        {/* 圖片 */}
                        <figure className = "image is-4by3">
                            <img src = {image} alt ={name} />
                        </figure>
                    </div>
                        {/* title */}
                        <p className = "p-tags">{tags}</p>
                        {/* 商品名稱 */}
                        <p className = "p-name">{name}</p>
                   
                </div>
                <div className = "p-footer">
                    {/* 價格 */}
                    <p className = "price">{formatPrice(price)}</p>
                    {/* 購物車按鈕 */}
                    <button className = "add-cart" disabled={status === "unavailable"} onClick={this.addCart}>
                        <i className = "fas fa-shopping-cart"></i>
                        <i className = "fas fa-exclamation"></i>
                    </button>
                </div>
            </div>
        );
    }

};
export default withRouter(Product);