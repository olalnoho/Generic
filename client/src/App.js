import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import store from './redux/store'
import { Provider } from 'react-redux'

import Navbar from './components/layout/Navbar/Navbar'
import Posts from './components/posts/Posts'
import Landing from './components/layout/Landing/Landing'
import NotFound from './components/layout/NotFound/NotFound'
import Register from './components/auth/Register/Register';
import Login from './components/auth/Login/Login';
import Profile from './components/profile/Profile';
import ProfileEdit from './components/profile/ProfileEdit';
import OtherProfile from './components/profile/OtherProfile';
import PrivateRoute from './components/routes/PrivateRoute';
import Chat from './components/chat/Chat';
import { setAuthToken } from './utility/setAuthToken'
import { loadUser } from './redux/actions/auth'

// Set auth headers in axios before the App component loads
// Maybe a hacky fix, but it works for now
// If this is not included the auth header is set after the component loads
// and causes a 401 reponse sometimes, which breaks certain routes, like EditProfile

if (localStorage.token) {
   setAuthToken(localStorage.token)
}

const App = () => {
   useEffect(() => {
      store.dispatch(loadUser())
   }, [])
   return (
      <>
         <Provider store={store}>
            <Navbar />
            <Switch>
               <Route path="/" exact component={Landing} />
               <Route path="/register" component={Register} />
               <Route path="/login" component={Login} />
               <PrivateRoute path="/profile" exact component={Profile} />
               <PrivateRoute path="/profile-edit" component={ProfileEdit} />
               <PrivateRoute path="/profile/:id" exact component={OtherProfile} />
               <PrivateRoute path="/posts" exact component={Posts} />
               <PrivateRoute path="/chat" exact component={Chat} />
               <Route component={NotFound} />
            </Switch>
         </Provider>
      </>
   );
}

export default App;