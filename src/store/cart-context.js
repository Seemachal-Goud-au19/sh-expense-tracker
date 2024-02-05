import React,{createContext} from "react";


const CartContext = createContext({
    token:'',
    isLoggedIn:false,
    login:(token)=>{},
    logout:()=>{}

});

export default CartContext;