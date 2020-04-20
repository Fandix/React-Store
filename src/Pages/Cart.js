/*
    name : Cart
    Date : 2020/04/08
    description : 購物車UI
*/

import React, {useState,useEffect,useMemo} from "react";
import Layout from "./Layout";
import CartItem from "../components/CartItem";
import axios from "../commons/axios";
import { formatPrice } from "commons/helper";
import { CSSTransition,TransitionGroup } from "react-transition-group";

const Cart = () => {

    const [carts,setCarts] = useState([]);

    //=====================================================================//

    /*
        Date : 2020/04/08
        Description : 獲取購物車數據庫的資料
        Note : 在Component被選染的時候呼叫，帶第componentDidMount()
    */
    useEffect(() => {
        const user = global.auth.getUser() || {};

        //取得購物車數據庫資料後更新State
        axios.get(`/carts?userId=${user.email}`).then(res => setCarts(res.data))
    },[]);

    //=====================================================================//

    /*
        Date : 2020/04/08
        Description : 計算購物車內總價錢(取得每項商品的mount乘上價錢再相加)
        Note : React HOOK API(當依賴改變時才會從新計算return的值，避免每一次render都要重新計算)
    */
    const TotalPrice = useMemo(() => {
        const totalPrice = carts
        .map(cart => cart.mount * parseInt(cart.price))
        .reduce((a,value) => a + value , 0);

        return totalPrice;
    },[carts]);
     

    //=====================================================================//

    /*
        Date : 2020/04/09
        Description : 當單向購物車商品發生改變(數量)，則調用此function將整體購物車數據刷新
    */
     const updataCart = cart => {
        const newCarts = [...carts];
        const _index = newCarts.findIndex(c => c.id === cart.id);
        newCarts.splice(_index,1,cart);
        setCarts(newCarts);
     };


    //=====================================================================//

    /*
        Date : 2020/04/09
        Description : 刪除其中一項購物車商品
    */
   const deleteCart = (cart) => {
        //Step 1:取得需要被刪除的商品id並將整體購物車商品過濾掉需要被刪除的商品 = 留下未被刪除的
        const _carts = carts.filter(c => c.id !== cart.id);

        //Step 2:更新cart的State
        setCarts(_carts);
   };


    //=====================================================================//

    return(
        <div className="main">
            <Layout>
                <div className="cart-page">
                    {/* Shopping Car Title */}
                    <span className="cart-title">Shoppiong Cart</span>
                    {/* Shopping Cart List */}
                    <div className="cart-list" >
                        <TransitionGroup conponent={null}>
                            {
                                carts.map(cart => (
                                <CSSTransition classNames="cart-item" timeout={300} key={cart.id}>   
                                    <CartItem 
                                     key={cart.id} 
                                     cart={cart} 
                                     updataCart={updataCart} 
                                     deleteCart={deleteCart}
                                    />
                                </CSSTransition> 
                                ))
                            }
                        </TransitionGroup>
                    </div>
                    {/* No Product in Shopping Cart */}
                    {carts.length === 0 ? <p className="no-cart">NO GOODS</p>:""}
                    {/* Shopping Car Total Price */}
                    <div className="cart-total">
                        Total:
                        <span className="total-price">{formatPrice(TotalPrice)}</span>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Cart;