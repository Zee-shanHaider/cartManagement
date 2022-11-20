import {React, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import { setUser, passwordError, emailError} from '../../Store/user/user_actions'
import { validationErrorsSelector,isUserLoggedInSelector} from '../../Store/user/user_selectors'

import { Link } from 'react-router-dom'
import './navbar.style.css'
import { useDispatch, useSelector } from 'react-redux';



export const Navbar = () => {
  const isLoggedIn = useSelector(isUserLoggedInSelector)
  console.log(isLoggedIn)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch()
  const formErrors = useSelector(validationErrorsSelector);

  const Initial_formValues = {
    email: '',
    password:'',
}
const [formValues, setFormValues] = useState(Initial_formValues);

  const handleChange =(e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value})
    switch(name){
        case 'email':
             if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)){ 
                setFormValues({...formValues, [name]: value})
                dispatch(emailError({}))
            }
            else{
                const errors = {};
                errors.email = 'email is not valid!'
                dispatch(emailError(errors))
            }
            break;
            case 'password':
                if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)){
                    setFormValues({...formValues, [name]: value})
                    dispatch(passwordError({}))
                }
                else{
                    const errors = {};
                    errors.password = 'Password must of Minimum eight characters, at least one letter, one number and one special character'
                    dispatch(passwordError(errors))
                }
                break;
    }
   
    
}
const submitHandler =async (e)=>{
  e.preventDefault();
  if(Object.keys(formErrors).length === 0){
    var data = JSON.stringify(formValues);
    try{

      var config = {
      method: 'POST',
      url: 'http://localhost:8080/login',
      headers: { 
          'Content-Type': 'application/json'
      },
      data : data
      };
  
      const response =await axios(config);
  
      const data = await response.json();
      console.log(data.token)
      dispatch(setUser(formValues))  
    }

    
    catch(error) {
    console.log(error.response.data);
    };
   
}
}



  return (
    <div className='navbar'>
        <div style={{'marginLeft': '30px'}}>
            Cart Management System
        </div>
        <div style={{'marginRight': '30px'}}>
          {
            isLoggedIn?( <button className='btn' onClick={handleShow}>
            Sign in
          </button>): <button className='btn' onClick={signout}>
              Signout
          </button>
          }
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          
             <Modal.Title>Sign in</Modal.Title>
         
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
          <div class="mb-3">
                    <label htlmFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  onChange={handleChange}/>                
                {formErrors?.email? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.email} </p> ): null}
                </div>

                <div class="mb-3">
                    <label htlmFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' class="form-control" id="exampleInputPassword1" onChange={handleChange}/>
                {formErrors?.password? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.password} </p> ): null}
                </div>
           
            <Button variant="primary" onClick={handleClose} type='submit'>
            Sign in
          </Button>
           
          
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
            <Link className='cart' to='/cart'>
            <i class="fa fa-shopping-cart"></i>
            </Link>
        </div>
        
    </div>
  )
}
