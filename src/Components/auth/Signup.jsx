import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser,  validationErrors,passwordError, emailError} from '../../Store/user/user_actions'
import { validationErrorsSelector, userSelector} from '../../Store/user/user_selectors'
import axios from 'axios'
import './Signup_Style.css'
import { useNavigate } from 'react-router-dom'

export const Signup = () => {
    const userData = useSelector(userSelector);
    const formErrors = useSelector(validationErrorsSelector);
    // const emailErrorSelector = useSelector(state=> state.userReducer.emailError)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const Initial_formValues = {
        username: '',
        email: '',
        password:'',
    }
    const [formValues, setFormValues] = useState(Initial_formValues);
    // useEffect(()=>{
    //    if( Object.keys(formErrors).length === 0 && isLoggedIn)
    //    console.log(formValues)
    // }, [formErrors])
    // const validate = (values)=>{
    //     const errors = {};
    //     if(!values.username){
    //         errors.username = 'Username is required!'
    //     }
    //     if(!values.email){
    //         errors.email = 'email is required!'
    //     }
      
    //     else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
    //         errors.email = 'email is not valid!'
    //     }
    //     if(!values.password){
    //         errors.password = 'Password is required!'
    //     }
    //     if(values.password.length <4){
    //         errors.password = 'Password characters should not be less than 4'
    //     }
    //     return errors;

    // }


    const handleChange =(e)=>{
        const {name, value} = e.target;
        // setFormValues({...formValues, [name]: value})
        const regex = !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        switch(name){
            case 'username':
                if (!value) {
                    const errors = {};
                    errors.username = 'Username is required'
                    dispatch(validationErrors(errors))
                }
                else if(value.length<4){
                    const errors = {};
                    errors.username = 'Username must have greater than 4 characters'
                    dispatch(validationErrors(errors))
                }
                else{
                    dispatch(validationErrors({}))
                    setFormValues({...formValues, [name]: value})
                }
                break;

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

    const onSubmitHandler =(e)=>{
        e.preventDefault();
        if(Object.keys(formErrors).length === 0){
            var data = JSON.stringify(formValues);

            var config = {
            method: 'POST',
            url: 'http://localhost:8080/signup',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
            };

            axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
            navigate({
                pathname:'/',
              })
           
        }
    }

  return (
    <>
    <pre>{JSON.stringify(userData, undefined, 2)}</pre>
     <div className='loginContainer'>
        <form onSubmit={onSubmitHandler}>

                <div class="mb-3">
                    <label htlmFor="exampleInputEmail1" class="form-label">Username</label>
                    <input type="text" name='username' class="form-control" id="exampleInputUsername1" aria-describedby="emailHelp" value={userData?.username} onChange={handleChange}/>
                {formErrors?.username? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.username} </p> ): null}
                </div>

                <div class="mb-3">
                    <label htlmFor="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" name='email' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={userData?.email} onChange={handleChange}/>                
                {formErrors?.email? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.email} </p> ): null}
                </div>

                <div class="mb-3">
                    <label htlmFor="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" name='password' class="form-control" id="exampleInputPassword1" value={userData?.password} onChange={handleChange}/>
                {formErrors?.password? (<p className='error-para' style={{'color': 'red'}}> {formErrors?.password} </p> ): null}
                </div>

        <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    </>
  )
}
