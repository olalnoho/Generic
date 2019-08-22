import axios from 'axios'
import {
   GET_POSTS_SUCCESS,
   GET_POSTS_FAIL,
   //POST_POST_SUCCESS,
   POST_POST_FAIL,
   GET_POST_SUCCESS,
   GET_POST_FAIL,
   SET_LOADING,
} from '../types'

const defaultheaders = {
   headers: { 'Content-Type': 'application/json' }
}

export const getPosts = () =>
   async dispatch => {
      try {
         const res = await axios.get('/api/post')
         dispatch({ type: GET_POSTS_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POSTS_FAIL, payload: err })
      }
   }

export const postPosts = (text) =>
   async dispatch => {
      try {
         await axios.post('/api/post', { text }, defaultheaders)
         dispatch(getPosts())
      } catch (err) {
         dispatch({ type: POST_POST_FAIL, payload: err })
      }
   }

export const removePost = (id) =>
   async dispatch => {
      try {
         await axios.delete(`/api/post/${id}`)
         dispatch(getPosts())
      } catch (err) {
         dispatch({ type: POST_POST_FAIL, payload: err })
      }
   }


export const getPost = id =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.get(`/api/post/${id}`)
         dispatch({ type: GET_POST_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POST_FAIL, payload: err })
      }
   }

export const likePost = id =>
   async dispatch => {
      try {
         const res = await axios.put(`/api/post/like/${id}`)
         dispatch({ type: GET_POST_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POST_FAIL, payload: err })
      }
   }

export const unlikePost = id =>
   async dispatch => {
      try {
         const res = await axios.put(`/api/post/unlike/${id}`)
         dispatch({ type: GET_POST_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POST_FAIL, payload: err })
      }
   }

export const commentPost = (id, text) =>
   async dispatch => {
      try {
         const res = await axios.post(`/api/post/comment/${id}`, { text }, defaultheaders)
         dispatch({ type: GET_POST_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POST_FAIL, payload: err })
      }
   }

export const removeCommentPost = (id, postId) =>
   async dispatch => {
      try {
         const res = await axios.delete(`/api/post/comment/${id}/${postId}`)
         dispatch({ type: GET_POST_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: GET_POST_FAIL, payload: err })
      }
   }