import {
   GET_ALL_USERS_SUCCESS,
   GET_ALL_USERS_FAIL
} from '../types'

const initialState = {
   users: [],
   loading: true,
   error: null
}

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {
      case GET_ALL_USERS_SUCCESS:
         return {
            ...state,
            users: payload,
            loading: false
         }

      case GET_ALL_USERS_FAIL:
         return {
            ...state,
            err: payload,
            loading: false
         }
      default:
         return state
   }
}