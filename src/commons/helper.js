/*
    title : helper.js
    description : 將有使用到的工具放入此處
    Content : 
                1.貨幣轉換 (formatPrice)
*/

//貨幣轉換
export const formatPrice = (cents) => {
    return(
            cents/4).toLocaleString("zh",{
            style:"currency",
            currency:"TWD"
    });
}
