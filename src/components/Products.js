/*
    name : Products
    Date : 2020/03/12
    description : 多樣商品擺放組件
*/

import React from "react";
import ToolBox from "./ToolBox";
import Product from "./Product";
import Panel from "./panel";
import AddInventory from "./Addinverntory";
import axios from "../commons/axios";
import { CSSTransition,TransitionGroup } from "react-transition-group";

class Products extends React.Component
{
    //State初始化
    state = {
        products : [],
        sourceProducts:[],
        cartNum : 0
    }
    
    //=====================================================================//

    //取得資料庫數據
    componentDidMount()
    {   
        //使用axios取得外部api data並將他設定到可控組件products中
        axios.get("/products")
        .then(response => {
            this.setState({
                products:response.data,
                sourceProducts:response.data
            });
        });
        this.updataCartNum();
    }

    //=====================================================================//

    /*
        複製數據是使用新的陣列，若使用products這個陣列會導致我篩選完後渲染到html的元素無法回到完整
        所以需要一個新的陣列sourceProducts負責當作篩選的模板
        products負責渲染整體html,sourceProducts負責當篩選模板
    */
    //state條件篩選
    search = text => {
        //1.複製一份新的數據庫
        let _products = [...this.state.sourceProducts]

        //2.過濾新的數據庫
        _products = _products.filter(p => {
           const matchArray = p.name.match(new RegExp(text,"gi"))
           return matchArray !== null
        })

        //setState
        this.setState({
            products:_products
        });
    };

    //=====================================================================//

    /*
        Date : 2020/04/04
        Description : 當商品卡片的編輯按鈕被點擊後觸發開啟panel視窗 
    */
    toAdd = () => {
        Panel.open({
            component:AddInventory,
            callback:data => {
                if(data)
                {
                    this.add(data);
                }
            }
        });
    };

    //=====================================================================//

    //更新產品列表狀態(若有新的產品加入)
    add = (product) => {
        const _products = [...this.state.products];
        _products.push(product);
        const _Sproducts = [...this.state.sourceProducts];
        _products.push(product);

        this.setState({
            products:_products,
            sourceProducts:_Sproducts
        })
    };

    //=====================================================================//

    /*
        Date : 2020/04/04
        Description : 用於當編輯商品卡的資訊後(一個)，需要從父層將全部商品卡更新
    */
    update = (product) => {
        if(product)
        {
            const _products = [...this.state.products];  //Step 1:取得product內容並存放在_product中
            const _index = _products.findIndex(p => p.id === product.id); //Step 2:找到變更Data的index值
            _products.splice(_index,1,product); //Step 3:插入更新後的商品
    
            const _Sproducts = [...this.state.sourceProducts];
            const _sIndex = _products.findIndex(p => p.id === product.id); 
            _Sproducts.splice(_sIndex,1,product);
            this.setState({ //Step 4:更新商品卡
                products:_products,
                sourceProducts:_Sproducts
            })
        }
    };

    //=====================================================================//

    /*
        Date : 2020/04/04
        Description : 當商品被刪除時，從父層將全部商品卡更新
    */
    delete = (id) => {
        const _products = this.state.products.filter(p => p.id !== id); //過濾掉要刪除的商品id(留下未被刪除的)
        const _Sproducts = this.state.sourceProducts.filter(p => p.id !== id);
        console.log(_products);
        console.log(_Sproducts);
        this.setState({ 
            products:_products,
            sourceProducts:_Sproducts
        })
    };

    //=====================================================================//

    /*
        Date : 2020/04/05
        Description : 透過axios來獲取購物車數據庫中的信息並進行計算
    */
    initCartNum = async() => {
        //Step 1:取得購物車數據庫中所有數據
        const user = global.auth.getUser() || {};
        const res = await axios.get('/carts', {
            params: {
                userId: user.email
            }
        });
        const carts = res.data || []; //若res.data為空則回傳[]

        //Step 2:將購物車數據中的mount相加
        const cartNum = carts
                        .map(cart => cart.mount)  //取得購物車數據庫數據中所有的mount並放到cart中
                        .reduce((a,value) => a + value,0);  //相加
        return cartNum;
    };


    //=====================================================================//

    /*
        Date : 2020/04/05
        Description : 當有商品被加入購物車後，用來更新購物車圖示旁的數量
    */
    updataCartNum = async() => {
        //Step 1:通過數據庫取得購物車中總共有多少物件
        const cartNum = await this.initCartNum();

        //Step 2:更改cartNum狀態
        this.setState({
            cartNum:cartNum
        });
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
                <button className="button is-primary add-btn" onClick={this.toAdd}>Add</button>
            );
        }
    };

    //=====================================================================//

    render()
    {
        return (
            <div>
                <ToolBox search = {this.search} cartNum={this.state.cartNum}/>
                <div className = "products">
                    <div className = "columns is-multiline is-desktop">
                        {/* 由於引用了TranstisionGroup會產生一個div，導致我們布局會更改，所以使用
                            component = {null}可以將TranstisionGroup生成的div隱藏*/}
                        <TransitionGroup component={null}>
                            {
                                this.state.products.map(product => {
                                    return(
                                        <CSSTransition classNames="product-fade" timeout={500} key={product.id}>
                                            {/* 需要新增動畫的地方 */}
                                            <dic className = "column is-3" key = {product.id}> 
                                                <Product 
                                                  product = {product} 
                                                  update={this.update} 
                                                  delete={this.delete}
                                                  updataCartNum={this.updataCartNum}
                                                />
                                            </dic>
                                        </CSSTransition>  
                                    );
                                })
                            }
                        </TransitionGroup>
                    </div>
                    {this.renderManagerBtn()}
                </div>
            </div>
        )
    }
}

export default Products;