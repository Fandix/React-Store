/*
    name : CartItem
    Date : 2020/04/08
    description : 購物車中商品的Component
*/

import React,{useState,useMemo} from "react";
import { formatPrice } from "commons/helper";
import axios from "../commons/axios";

const CartItem = (props) => {

    const [mount,setMount] = useState(props.cart.mount);

     //=====================================================================//

    /*
        Date : 2020/04/08
        Description : 取得購物車商品資訊
    */
    const {id,name,image,price} = props.cart || {};

     //=====================================================================//

    /*
        Date : 2020/04/08
        Description : 計算單品總價
        Note : React HOOK API 
    */
    const sumPrice = useMemo(() => {
        return formatPrice(mount * parseInt(price))
    },[mount , price]);
    
    //=====================================================================//

    /*
        Date : 2020/04/09
        Description : 當購物車商品數量發生改變時調用，直接更改購物車數據庫中的數量
    */
    const handleChange = e => {
        //Step 1:取得input的資料
        const _mount = parseInt(e.target.value);
        setMount(_mount);

        //Step 2:更改mount數量 
        const newCart = {
            ...props.cart,
            mount:_mount
        }

        //Step 3:更改購物車數據庫
        axios.put(`/carts/${id}`,newCart).then(res => {
            props.updataCart(newCart)
        });
    };

    //=====================================================================//

    /*
        Date : 2020/04/09
        Description : 當購物車刪除商品按鈕被點擊時調用
    */
    const deleteCart = () => {
        //Step 1: 取得被點擊要刪除的商品id
        axios.delete(`/carts/${id}`).then(res => {
            //Step 2: 將要刪除的商品id傳入父層的deleteCart function
            props.deleteCart(props.cart);
        })
    };

    //=====================================================================//

    return(
        <div className="columns is-vcentered">
            {/* ---------- Cancel Buttin ---------- */}
            <div className="column is-narrow">
                <span className="close" onClick={deleteCart}>X</span>
            </div>
            {/* ---------- Product img ---------- */}
            <div className="column is-narrow">
                <img src={image} alt={name} width="100"/>
            </div>
            {/* ---------- Product Name ---------- */}
            <div className="column cart-name is-narrow">
                {name}
            </div>
            {/* ---------- Product Price ---------- */}
            <div className="column">
                <span className="price">{formatPrice(price)}</span>
            </div>
            {/* ---------- Number of Products(mount) ---------- */}
            <div className="column">
                <input 
                    className="input num-input" 
                    type="number" value={mount} 
                    onChange={handleChange} 
                    min={1}
                />
            </div>
            {/* ---------- Total of Price ---------- */}
            <div className="column">
                <span className="sum-price">{sumPrice}</span>
            </div>
        </div>
    );
}

export default CartItem