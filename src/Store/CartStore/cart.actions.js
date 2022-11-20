import { type } from '@testing-library/user-event/dist/type'
import  Cart_Types from './cart.types'
const {Add_To_Cart, Delete_From_Cart,Decrease_Quantity,Increase_Quantity,Clear_Cart} = Cart_Types
export const addToCart = (updatedCartArr)=>{
   

    return{
        type: Add_To_Cart,
        payload: updatedCartArr,
    }
}

export const deleteCartItem = (filteredArr)=>{
    return {
        type: Delete_From_Cart,
        payload: filteredArr
    }
}

export const decreaseQuantity = (updatedArr)=>{
    return{
        type: Decrease_Quantity,
        payload: updatedArr
    }
}
export const increaseQuantity = (updatedArr)=>{
    return{
        type: Increase_Quantity,
        payload: updatedArr
    }
}

export const clearCart = ()=>{
    return{
        type: Clear_Cart,
        payload: [],
    }
    
}

