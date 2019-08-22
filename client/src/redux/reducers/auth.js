import { AUTH_SUCCESS, AUTH_FAIL, LOAD_USER } from '../types'

const initialState = {
   isAuth: false,
   token: '',
   loading: true,
   user: null
}

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {

      case LOAD_USER:
         return {
            ...state,
            user: payload,
            loading: false,
            isAuth: true
         }
      case AUTH_SUCCESS:
         localStorage.setItem('isAuth', true)
         return {
            ...state,
            token: payload,
            isAuth: true,
            loading: false,
         }

      case AUTH_FAIL:
         return {
            ...state,
            isAuth: false,
            loading: false,
            token: null,
            user: null
         }
      default:
         return state
   }
}