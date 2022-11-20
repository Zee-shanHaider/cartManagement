import { User_Types } from "./user_type";

const {Set_Current_User, Set_Validate_Error} = User_Types;

const Initial_State = {
    userData: {},
    validationErrors: null,
    isUserLoggedIn: false
}

export const userReducer = (state= Initial_State, action)=>{
    const {type, payload} = action;
    switch(type){
        case Set_Current_User:
            return{
                ...state,
                userData: payload,
                isUserLoggedIn: true
            }

            case 'Password_error':
                return{
                    ...state,
                    validationErrors:  payload
                }
    

            case 'Email_error':
                return{
                    ...state,
                    validationErrors:  payload
                }
    
        case Set_Validate_Error:
            return{
                ...state,
                validationErrors: payload,
            }
                default: return state
        }
}