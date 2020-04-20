/*
    name : Login
    Date : 2020/04/14 (updata)
    description : 登錄頁面
*/

import React from 'react';  
import { useForm } from 'react-hook-form'
import axios from "../commons/axios"
import {toast} from 'react-toastify';

export default function Login(props) 
{
    const {register,handleSubmit,errors } = useForm();


    //=====================================================================//

    /*
        Date : 2020/03/02
        Description : 當submit按鈕被點擊時觸發
    */
    const OnSubmit = async data => {
        try 
        {
            //Step 1 : 取得Login頁面的資料(email & password)
            const {email,password} = data;

            //Step 2 : 將email與password傳入JSON-Server中並計算返回JWT Token
            const res = await axios.post("/auth/login",{email,password});
            const jwToken = res.data;
            
            //Step 3 : 將JWT Token存入使用者的瀏覽器中
            global.auth.setToken(jwToken);
            toast.success("Login Success!");

            //Step 4 : 跳轉到主頁面
            props.history.push("/");
        } 
        catch (error) 
        {
            const ErrorMess = error.response.data.message;
            toast.error(ErrorMess);
        }
       
    };

    return(
        <React.Fragment> 
            <div className = "login-wrapper">
                <form className = "box login-box" onSubmit = {handleSubmit(OnSubmit)}>
                {/* ------------------ Email --------------------- */}
                    <div className="field">
                        <label class="label">Email</label>
                        <div class="control">
                            <input 
                                className={`input ${errors.email && "is-danger"} `}
                                type="text" 
                                placeholder="Email" 
                                name = "email"
                                ref={register({
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Za-z0-9]+([...\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}/,
                                        message: 'invalid Email' 
                                    }
                                })}
                            />
                            {
                                errors.email && <p className="hepler has-text-danger">{errors.email.message}</p>
                            }
                        </div>
                    </div>
                {/* ------------------ Password --------------------- */}
                <div className="field">
                        <label class="label">Password</label>
                        <div class="control">
                            <input 
                                className={`input ${errors.password && "is-danger"} `}
                                type="password" 
                                placeholder="Password" 
                                name = "password"
                                ref={register({
                                    required: "Password is required",
                                    minLength : {
                                        value: 6,
                                        message: "Can not be less then 6 digits" 
                                      }
                                })}
                            />
                            {
                                errors.password && <p className="hepler has-text-danger">{errors.password.message}</p>
                            }
                        </div>
                    </div>
                {/* ------------------ Botten --------------------- */}
                    <div className="control">
                        <button className = "button is-fullwidth is-primary">Login</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}
