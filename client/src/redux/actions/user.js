import axios from 'axios'

import {
   GET_ALL_USERS_SUCCESS,
   GET_ALL_USERS_FAIL
} from '../types'


export const getUsers = () =>
   async dispatch => {
      try {
         const users = await axios.get('/api/users')
         dispatch({ type: GET_ALL_USERS_SUCCESS, payload: users.data })
      } catch (err) {
         dispatch({ type: GET_ALL_USERS_FAIL, payload: err.message })
      }
   }