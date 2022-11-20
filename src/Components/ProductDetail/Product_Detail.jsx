import {React,useState} from 'react'
import '../Products/Products.style.css'
import './Product_Detail.style.css'
import { productsArr } from '../Products/productsData'
import { Link, useSearchParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { cartArrSelector } from '../../Store/CartStore/cart.selectors'
import { addToCart } from '../../Store/CartStore/cart.actions'
import { Cart } from '../cart/cart'

export const Product_Detail = () => {
  const dispatch = useDispatch();
  const [searchParams]=  useSearchParams()
  const cartArray=useSelector(cartArrSelector)
  console.log('cartArray', cartArray)

 const id= searchParams.get('id')
 const addCart=(product)=>{
  const cartProductIndex = cartArray.findIndex(cp => {
    return cp.id ===  product.id;
  });
  let newQuantity = 1;
  let updatedCartItems = [...cartArray];

  if (cartProductIndex >= 0) {
    newQuantity = cartArray[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
    dispatch(addToCart(updatedCartItems))
  } else {
    updatedCartItems.push({
      ...product,
      quantity: newQuantity
    });
    dispatch(addToCart(updatedCartItems))
  }





  // let updatedCart=cartArray;
  // if(updatedCart.length<=0)
  // updatedCart.push({...product, quantity:1});
  // else{
  //   updatedCart.map((item,ind)=>{
  //     if(item.id === product.id){
  //       return item.quantity +=1;
  //     }
  //     else{
  //       updatedCart.push({...product, quantity: 1})
  //     }
      
  //   })
  // }
  // dispatch(addToCart(updatedCart))
}
 

  return(
    <>   
    <div className='productDetail'>

          {
            
            productsArr.map((product,ind)=>{
              if(product.id == id)
            return(
                <div className='productItem' key={product.id}>
                        <h4 style={{'textAlign': 'center'}}>
                            {product.name}
                        </h4>
                        <div className='card__image'>
                          <img src={product.imgUrl} alt="product image" />
                        </div>
                        <div className='price'>
                              <b> Price: ${product.price}</b>
                        </div>
                        <Link className='btn' onClick={()=>addCart(product)} to='/cart'>
                          <b>
                          Add to Cart
                          </b>
                        </Link>    
                </div>
         )
        })  
      }
    </div>  
   </>
  )
}
