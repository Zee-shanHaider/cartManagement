import {createSelector} from 'reselect'


const selectUserReducer =  state => state.userReducer


export const userSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.userData;
    })

export const validationErrorsSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.validationErrors;
    })


export const isUserLoggedInSelector = createSelector([selectUserReducer],
    (userReducer)=>{
        return userReducer.isUserLoggedIn;
    })
