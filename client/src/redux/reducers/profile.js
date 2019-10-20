import {
   LOAD_PROFILE_SUCCESS,
   LOAD_PROFILE_FAIL,
   SET_LOADING,
   POST_PROFILE_SUCCESS,
   POST_PROFILE_FAIL,
   LOAD_POST_SUCCESS,
   LOAD_POST_FAIL,
   COMMENT_POST_FAIL,
   COMMENT_POST_SUCCESS,
   REMOVE_COMMENT_FAIL,
   REMOVE_COMMENT_SUCCESS,
   CLEAR_PROFILE,
   SET_PROFILE_LOADING
} from '../types'

const initialState = {
   profile: null,
   posts: [],
   profiles: [],
   post: null,
   loading: true,
   postLoading: true
}

export default function (state = initialState, action) {
   const { type, payload } = action
   switch (type) {
      case SET_PROFILE_LOADING:
         return {
            ...state,
            loading: true
         }

      case SET_LOADING:
            return {
               ...state,
               postLoading: true
            }
      case LOAD_PROFILE_SUCCESS:
         return {
            ...state,
            profile: payload,
            posts: payload.posts,
            loading: false
         }

      case REMOVE_COMMENT_FAIL:
      case COMMENT_POST_FAIL:
      case POST_PROFILE_FAIL:
      case LOAD_PROFILE_FAIL:
         return {
            ...state,
            profile: null,
            loading: false
         }
      case REMOVE_COMMENT_SUCCESS:
      case COMMENT_POST_SUCCESS:
      case LOAD_POST_SUCCESS:
         return {
            ...state,
            post: payload,
            loading: false,
            postLoading: false
         }

      case LOAD_POST_FAIL:
         return {
            ...state,
            post: null,
            loading: false,
            postLoading: false
         }

      case POST_PROFILE_SUCCESS:
         return {
            ...state,
            posts: payload,
            loading: false,
         }

      case CLEAR_PROFILE:
         return {
            profile: null,
            posts: [],
            profiles: [],
            post: null,
            loading: false,
         }
      default:
         return state;
   }
}