import { User_Types } from "./user_type";

const {Set_Current_User, Set_Validate_Error} = User_Types;

export const setUser = (user)=>{
    return{
        type: Set_Current_User,
        payload: user
    }
}
export const passwordError = (error)=>{
    return{
        type: 'Password_error',
        payload: error
    }
}
export const emailError = (error)=>{
    return{
        type: 'Email_error',
        payload: error
    }
}

export const validationErrors = (validationErrors)=>{
    return{
        type: Set_Validate_Error,
        payload: validationErrors
    }
}



