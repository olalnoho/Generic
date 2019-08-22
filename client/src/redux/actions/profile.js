import axios from 'axios'
import {
   LOAD_PROFILE_SUCCESS,
   LOAD_PROFILE_FAIL,
   SET_LOADING,
   POST_PROFILE_SUCCESS,
   POST_PROFILE_FAIL,
   LOAD_POST_SUCCESS,
   LOAD_POST_FAIL,
   COMMENT_POST_SUCCESS,
   COMMENT_POST_FAIL,
   REMOVE_COMMENT_FAIL,
   REMOVE_COMMENT_SUCCESS
} from '../types'

const defaultheaders = {
   headers: { 'Content-Type': 'application/json' }
}

export const getProfile = () =>
   async dispatch => {
      try {
         const res = await axios.get('/api/profile')
         dispatch({ type: LOAD_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }

export const getProfileById = (id) =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.get('/api/profile/' + id)
         dispatch({ type: LOAD_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         console.log(err)
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }

export const postProfile = (id, text) =>
   async dispatch => {
      try {
         const res = await axios.post(`/api/profile/${id}/comment`, { text }, defaultheaders)
         dispatch({ type: POST_PROFILE_SUCCESS, payload: res.data })
      } catch (error) {
         dispatch({ type: POST_PROFILE_FAIL })
      }
   }

export const deletePost = (profileId, postId) =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.delete(`/api/profile/${profileId}/${postId}`)
         dispatch({ type: POST_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }

export const likePost = (profileId, postId) =>
   async dispatch => {
      try {
         const res = await axios.put(`/api/profile/like/${profileId}/${postId}`)
         dispatch({ type: POST_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }

export const unlikePost = (profileId, postId) =>
   async dispatch => {
      try {
         const res = await axios.put(`/api/profile/unlike/${profileId}/${postId}`)
         dispatch({ type: POST_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }

export const getPost = (profileId, postId) =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.get(`/api/profile/${profileId}/${postId}`)
         dispatch({ type: LOAD_POST_SUCCESS, payload: res.data })
      } catch (error) {
         dispatch({ type: LOAD_POST_FAIL })
      }
   }

export const postComment = (profileId, postId, text) =>
   async dispatch => {
      try {
         const res = await axios.post(`/api/profile/${profileId}/${postId}`, { text }, defaultheaders)
         dispatch({ type: COMMENT_POST_SUCCESS, payload: res.data })
      } catch (error) {
         dispatch({ type: COMMENT_POST_FAIL })
      }
   }

export const removeComment = (profileId, postId, commentId) =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.delete(`/api/profile/${profileId}/${postId}/${commentId}`)
         dispatch({ type: REMOVE_COMMENT_SUCCESS, payload: res.data })
      } catch (err) {
         console.log(err)
         dispatch({ type: REMOVE_COMMENT_FAIL })
      }
   }

export const createProfile = (formData) =>
   async dispatch => {
      dispatch({ type: SET_LOADING })
      try {
         const res = await axios.post('/api/profile', formData, defaultheaders)
         dispatch({ type: LOAD_PROFILE_SUCCESS, payload: res.data })
      } catch (err) {
         dispatch({ type: LOAD_PROFILE_FAIL })
      }
   }