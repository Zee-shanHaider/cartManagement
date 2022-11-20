import  Cart_Types from './cart.types'
const {Add_To_Cart, Delete_From_Cart,Decrease_Quantity,Increase_Quantity,Clear_Cart} = Cart_Types
const Inital_State = {
    cartArr: [],
    cartTotal: 0,
}

export const cartReducer = (state=Inital_State, action)=>{
    const {type,payload} = action;
    switch(type){
        case Add_To_Cart:
            return{
                ...state,
                cartArr: payload,
            }
            case Delete_From_Cart:
                return{
                    ...state,
                    cartArr: payload,
                }
                case Decrease_Quantity:
                    return{
                        ...state,
                        cartArr: payload

                    }
                case Increase_Quantity:
                    return{
                        ...state,
                        cartArr: payload

                    }
                    case Clear_Cart:
                        return{
                            ...state,
                            cartArr: payload,
                        }
                    default:
                        return state
    }
}