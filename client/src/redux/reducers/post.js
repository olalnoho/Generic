import {
   GET_POSTS_SUCCESS,
   GET_POSTS_FAIL,
   POST_POST_SUCCESS,
   POST_POST_FAIL,
   GET_POST_SUCCESS,
   GET_POST_FAIL,
   SET_LOADING
} from '../types'

const initialState = {
   post: null,
   posts: [],
   loading: true,
   error: null
}

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {

      case SET_LOADING:
         return {
            ...state,
            loading: true
         }

      case GET_POSTS_SUCCESS:
         return {
            ...state,
            posts: payload,
            loading: false
         }
         
      case GET_POST_FAIL:
      case GET_POSTS_FAIL:
         return {
            loading: false,
            error: payload
         }

      case GET_POST_SUCCESS:
         return {
            ...state,
            post: payload,
            loading: false
         }

      case POST_POST_SUCCESS:
         return {
            ...state,
            posts: [payload, ...state.posts],
            loading: false
         }
      case POST_POST_FAIL:
         return {
            ...state,
            loading: false,
            error: payload
         }
      default:
         return state
   }
}