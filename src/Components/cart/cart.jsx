import {React, useState} from 'react'
import './cart.style.css'
import { cartArrSelector, cartTotalSelector } from '../../Store/CartStore/cart.selectors'
import { useSelector,useDispatch } from 'react-redux'
import { deleteCartItem,decreaseQuantity, increaseQuantity, clearCart } from '../../Store/CartStore/cart.actions'
import Modal from 'react-modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

export const Cart = () => {
    const dispatch = useDispatch();
    const cartArr = useSelector(cartArrSelector);
    const cartTotal = useSelector(cartTotalSelector);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [paymentPrice, setPaymentPrice] = useState(null);


    //Payment Model
    
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };


    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    }
  
    function closeModal() {
      setIsOpen(false);
    }


    const decrement = (item)=>{
      let updatedArr = [...cartArr];
        updatedArr.map((cartItem,index)=>{
            if(item.id === cartItem.id){
              
              // setisQuantityOne(true);
              return item.quantity -=1;
            }
        })
        dispatch(decreaseQuantity(updatedArr))
    }

    const increment = (item)=>{
        let updatedArr = [...cartArr];
        updatedArr.map((cartItem,index)=>{
            if(item.id === cartItem.id)
            return item.quantity +=1;
        })
        dispatch(increaseQuantity(updatedArr))
    }

    const deleteCartProd = (item)=>{
        const filteredArr = cartArr.filter(i=>{
            return i.id !== item.id;
        })
      dispatch(deleteCartItem(filteredArr))
    }

    const orderComplete = ()=>{
      if(cartTotal!= paymentPrice)
      alert('Please pay complete payment')
      else{
        alert('Payment completed successfully!');
        setPaymentPrice('');
        setIsOpen(false);
        dispatch(clearCart());

      }

    }
  return (
  
  <>
  <div>

  </div>
    {cartArr?.length>0?
      <div className='cartContainer'>
      <h1 style={{'textAlign': 'center'}}>
          Cart
      </h1>
    
        {

        cartArr.map((item, ind)=>{
            return(
                  <div className="cartItem" key={ind}>
                    <div className='itemName'>
                        <h4>{item.name}</h4>
                    </div>
                    <div className='itemPrice'>
                        <b>${item.price}</b>
                    </div>
                    <div className='itemPrice'>
                        <h4>{item.quantity}</h4>
                    </div>
                    <div className='itemBtn'>
                      {item.quantity>1 ?  <button className='btn-inc' onClick={()=>decrement(item)}>-</button>: null}
                       
                        <button className='btn-inc' onClick={()=>increment(item)}>+</button>
                    </div>
                    <div>
                        <button className='btn-danger' onClick={()=>deleteCartProd(item)}>Delete</button>
                    </div>
            
                  </div>
            )
        })   
        }
    

        {
          cartTotal>0 ?
      <div className='cartTotal'>
            <h3>Total:</h3>
            <h4>$ {cartTotal}</h4>
            <button onClick={openModal} className='payment-btn btn'>Order Now</button>
      </div>:null
        }
      </div>: <h1>
        There is nothing in Cart.
      </h1>
    }
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button className='close-btn' onClick={closeModal}>Cancel Payment</button>
        <h4>Total Amount: {cartTotal}</h4>
        <form>
          <input value={paymentPrice} className='payment-input' placeholder='Enter Amount to pay!' onChange={e=> setPaymentPrice(e.target.value) }/>
          <button className='btn close-btn' onClick={()=> orderComplete()}>Pay Now</button>
        </form>
      </Modal>
    
  </>

  
  )
}
