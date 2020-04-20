/*
    name : panel
    Date : 2020/03/22
    description : 建立彈出組件
    Step : 
            1.渲染在html中一次，可以使用function隨時調用
            2.裝載子組件
                (1) 子組件作為參數傳遞並選染到html中
                (2) 子組件可以關閉彈出的組件
                (3) 子組件與調用者可以通訊
*/

import React from "react";
import {render} from "react-dom";

class Panel extends React.Component
{
    state = {
        active:false,
        component:null,
        callback:() =>{}
    }

    //=====================================================================//

    /*
        Date : 2020/03/22
        Description : 當Add按鈕被點擊時調用 => 開起Panel頁面
    */
    open = (options = { //設定若沒有參數傳入，則使用初始值
        props : {},
        component : null,
        callback : () => {}
    }) => {
        //這裡的compont是AddIneventory
        const {props,component,callback} = options;
        const _key = new Date().getTime();
        const _component = React.createElement(component , {...props ,close:this.close , key:_key})
        this.setState({
            active:true,
            component:_component,
            callback:callback
        })
    } 

    //=====================================================================//

    close = Data => {
        this.setState({
            active:false
        })
        this.state.callback(Data);
    }

    //=====================================================================//

    render()
    {
        const _class = {
            true:"panel-wrapper active",
            false:"panel-wrapper"
        }
        return(
            /* -------------wrapp -------------*/
            <div className={_class[this.state.active]}>
            {/* ------------ over layer ------------ */}
                <div className="over-layer"  onClick={() => {this.close()}} />
            {/* ----------------- panel ----------------- */}
                <div className="panel">
            {/* ----------------- head ----------------- */}
                     <div className="head">
                         <span className="close" onClick={()=>{this.close()}}>X</span>
            {/* ----------------- 內容 ----------------- */}
                        {this.state.component}
                     </div>
                </div>
            </div>
        );
    }
}

const _div = document.createElement("div");
document.body.appendChild(_div);
console.log(_div);

const _panel = render(<Panel /> , _div);
export default _panel;
