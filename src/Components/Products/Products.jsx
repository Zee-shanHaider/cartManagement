import {React, useState} from 'react'
import './Products.style.css'
import { productsArr } from './productsData'
import { createSearchParams, Link, useNavigate } from 'react-router-dom'


export const Products = () => {

    const navigate=useNavigate()

    const getDetail = (id)=>{
        productsArr.map((product,ind)=>{
          if(product.id === id)
          console.log(product)
        })
    }
   

  return(
    <>   
    
      {productsArr?
   <div className='shopContainer'>
      
      <h2 style={{'textAlign': 'center'}}>
          Shop Now
      </h2>
      
        <div className='products'>
          {
            productsArr?.map((product,ind)=>{
                const path= `productDetail/?id=${product.id}`;
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
                          <button className='btn' onClick={()=>
                          navigate({
                            pathname:'/detail',
                            search:createSearchParams({
                              id:product.id
                          }).toString()
                          })}>
                            <b>
                            Shop now
                            </b>
                          </button>
                          
                          
                  </div>
         )
        })  
      }
        </div> 
  </div>
      :null}
   </>
  )
}
