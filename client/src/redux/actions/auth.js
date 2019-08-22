import axios from 'axios'
import { AUTH_FAIL, AUTH_SUCCESS, LOAD_USER, CLEAR_PROFILE } from '../types'
import { setAuthToken } from '../../utility/setAuthToken'
const defaultheaders = {
   headers: { 'Content-Type': 'application/json' }
}

export const loadUser = () =>
   async dispatch => {
      if (localStorage.token) {
         setAuthToken(localStorage.token)
      }
      try {
         const res = await axios.get('/api/auth')
         dispatch({ type: LOAD_USER, payload: res.data })
      } catch (err) {
         dispatch({ type: AUTH_FAIL })
      }
   }

export const registerUser = formData =>
   async dispatch => {
      try {
         const res = await axios.post('/api/users', formData, defaultheaders)
         localStorage.setItem('token', res.data)
         dispatch({ type: AUTH_SUCCESS, payload: res.data })
         dispatch(loadUser(res.data))
      } catch (err) {
         localStorage.removeItem('token')
         dispatch({ type: AUTH_FAIL })
      }
   }

export const loginUser = formData =>
   async dispatch => {
      try {
         const res = await axios.post('/api/auth', formData, defaultheaders)
         localStorage.setItem('token', res.data)
         dispatch({ type: AUTH_SUCCESS, payload: res.data })
         dispatch(loadUser(res.data))
      } catch (err) {
         localStorage.removeItem('token')
         dispatch({ type: AUTH_FAIL })
      }
   }

export const logout = () =>
   dispatch => {
      localStorage.removeItem('token')
      localStorage.removeItem('isAuth')
      dispatch({ type: CLEAR_PROFILE })
      dispatch({ type: AUTH_FAIL })
   }