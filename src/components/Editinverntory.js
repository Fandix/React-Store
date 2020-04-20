/*
    name : Editinverntory
    Date : 2020/04/04
    description : 更新商品Component內容
*/

import React from "react";
import axios from "../commons/axios"
import {toast} from 'react-toastify';

class EditInventory extends React.Component
{
    state = {
        id : "", //新增id，因為需要對應到數據庫的內容
        name:'',
        price:'',
        tags:'',
        image:'',
        status:"available"
    }

    //=====================================================================//

    /*
        Date : 2020/04/04
        Description : 當畫面被更新後調用(當Editinverntory Panel被重新render後調用)
    */
    componentDidMount()
    {
        const {id,name,image,tags,price,status} = this.props.product;
        this.setState({
            id : id,
            name:name,
            price:price,
            tags:tags,
            image:image,
            status:status
        })
    }

    //=====================================================================//

    /*
        Date : 2020/04/04
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
        Date : 2020/04/04
        Description : 當更新商品信息後，按下Submit按鈕後觸發
    */
    submit = (e) => {
        //Step 1:取消預設行為
        e.preventDefault();

        //Step 2:取得更新後商品資訊
        const product = {...this.state};

        //Step 3:更新商品數據庫內容
        //更新數據庫的資料需要使用"put"`,而修改資料需要根據id來判斷要修改的數據
        axios.put(`products/${this.state.id}`,product).then(res => {
            this.props.close(res.data);
            toast.success("Edit Success!")
        });
       
    }

    //=====================================================================//

    /*
        Date : 2020/04/04
        Description : 當Delete按鈕被點擊時觸發此funciton
    */
    onDelete = (e) => {
        axios.delete(`products/${this.state.id}`).then(res => {
            this.props.deleteProduct(this.state.id);
            this.props.close();
            toast.success("Delete Success!")
        });
    };

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
                            <button className="button is-link">Update</button>
                        </div>
                        <div className="control">
                            <button 
                              className="button is-danger" 
                              type = "button" 
                              onClick={this.onDelete}
                            >
                                  Delete
                            </button>
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

export default EditInventory;