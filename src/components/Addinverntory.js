/*
    name : Addinverntory
    Date : 2020/03/22
    description : Panel Component中裝載得內容
*/

import React from "react";
import axios from "../commons/axios"
import {toast} from 'react-toastify';

class AddInventory extends React.Component
{
    state = {
        name:'',
        price:'',
        tags:'',
        image:'',
        status:"available"
    }

    //=====================================================================//

    /*
        Date : 2020/03/10
        Description : 當商品發生變化時調用
    */
    handleChange = (e) => {
        //Step 1: 取得變化的數值
        const value = e.target.value;

        //Step 2: 取得變化數值的input名稱(image,name...)
        const name = e.target.name;
        
        //Step 3 : 更新State
        this.setState({
            [name]:value
        })
    }

    //=====================================================================//

    /*
        Date : 2020/03/10
        Description : 當Submit按鈕被點擊時調用 => 將新增的商品加入數據庫中
    */
    submit = (e) => {
        //Step 1:取消預設行為 
        e.preventDefault();

        //Step 2:取得預新增的商品資訊
        const product = {...this.state};

        //Step 3:新增到資料庫中
        axios.post("products",product).then(res => {
            console.log(res.data)
            this.props.close(res.data);
            toast.success("Add Success!")
        });
       
    }

    //=====================================================================//

    render()
    {
        return(
            <div className="inventory">
                <p className="title has-text-centered">Inventory</p>
                <form onSubmit={this.submit}>
                    {/* ------------------ Massage ------------------ */}
                    <div className="field">
                        <div className="control">
                            <label className="label">Name</label>
                            <textarea 
                            className="textarea" 
                            name="name" 
                            value={this.state.name} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {/* ------------------ Price ------------------ */}
                    <div className="field">    
                        <div className="control">
                            <label className="label">Price</label>
                            <input 
                            type="number" 
                            className="input" 
                            name="price" 
                            value={this.state.price} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {/* ------------------ Tags ------------------ */}
                    <div className="field">
                        <div className="control">
                            <label className="label">Tags</label>
                            <input 
                            type="text" 
                            className="input" 
                            name="tags" 
                            value={this.state.tags} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {/* ------------------ Image ------------------ */}
                    <div className="field">
                        <div className="control">
                            <label className="label">Image</label>
                            <input 
                            type="text" 
                            className="input" 
                            name="image" 
                            value={this.state.image} 
                            onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    {/* ------------------ Status ------------------ */}
                    <div className = "field">
                        <div className="control">
                            <label className="label">Status</label>
                            <div className="select is-fullwidth">
                                <select name="status" value={this.state.status} onChange={this.handleChange}>
                        
                                    <option>available</option>
                                    <option>unavailable</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <br />
                    {/* ------------------ button ------------------ */}
                    <div className="field is-grouped is-grouped-centered">
                        <div className="control">
                            <button className="button is-link">Submit</button>
                        </div>
                        <div className="control">
                        <button className="button" type = "button" onClick={()=>{this.props.close()}}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddInventory;