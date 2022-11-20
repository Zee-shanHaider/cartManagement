import {createSelector} from 'reselect'

const selectCartReducer = state=> state.cartReducer;


export const cartArrSelector = createSelector(
    [selectCartReducer],(cartReducer)=>{
        return cartReducer.cartArr
    }
)

export const cartTotalSelector = createSelector(
    [cartArrSelector],(cartArray=>{
        return cartArray?.reduce(
            (total,cartItem)=> total + cartItem.price * cartItem.quantity, 0
        )
    })
)