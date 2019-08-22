import React, { useState, useEffect } from 'react'
import Private from './PrivateChat'
import { connect } from 'react-redux'
import io from 'socket.io-client'
let socket = io(':5000')

const Chat = ({ user }) => {
   const [message, setMessage] = useState('')
   const [messages, addMessage] = useState([])
   const [users, setUsers] = useState([])
   const [activeUser, setActiveUser] = useState('')
   const [selectedUser, setSelectedUser] = useState('')

   useEffect(() => {
      const handler1 = (msg) => {
         addMessage(prevState => [...prevState, msg])
      }
      socket.on('get-message', handler1)
      return () => socket.off('get-message', handler1)
   }, [])

   useEffect(() => {
      const handler = users => {
         setUsers(users)
      }

      const handler1 = () => {
         setActiveUser(user)
         socket.emit('room', user.email)
      }
      if (user) {
         socket.emit('join', user)
      }
      socket.on('updated_users', handler)
      user && socket.on('chat-open', handler1)

      return () => {
         socket.emit('leave')
         socket.off('updated_users', handler)
         socket.off('chat-open', handler1)
      }
   }, [user])

   const nameClick = (e, usr) => {
      e.stopPropagation()
      if (usr.email === user.email) return
      setMessage(`\\w ${usr.name} `)
      setSelectedUser(usr)
      // socket.emit('room', usr.email)
      // setActiveUser(usr)
   }

   const sendMessage = e => {
      e.preventDefault()
      const isWhisper = message.split(' ')
      if (
         isWhisper[0] === '\\w'
         && selectedUser
         && user.email !== selectedUser
      ) {
         const msg = isWhisper.slice(2).join(' ')

         socket.emit('whisper', { user: selectedUser.email, msg })
         addMessage([
            ...messages,
            { name: user.name, msg: `[to ${selectedUser.name}] - ${msg}` }
         ])

         setSelectedUser(null)
      } else {
         socket.emit('send-message', message)
      }
      setMessage('')
   }

   return (
      <div className="container" onClick={e => setActiveUser(null)}>
         {activeUser && <Private socket={socket} user={activeUser} />}
         <div className="chat">
            <h4 className="chat__online">
               Currently {users.length} {users.length > 1 ? 'users' : 'user'}
               online -- Click on a users name to whisper to them
            </h4>
            <div className="chat__window">
               <div className="chat__window--users">
                  <ul className="chat--list">
                     {users && users.map((usr, i) =>
                        <li key={i} onClick={e => nameClick(e, usr)}>
                           {usr.name}
                        </li>
                     )}
                  </ul>
               </div>
               <div className="chat__window--messages">
                  {messages && messages.map((msg, i) => <p key={i} className="lead"> {msg.name + ': ' + msg.msg} </p>)}
               </div>
            </div>
            <form className="chat__form form" onSubmit={e => sendMessage(e)}>
               <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  type="text"
                  placeholder="Enter your message" />
               <input
                  className="btn btn-primary"
                  type="submit"
                  value="Send Message" />
            </form>
         </div>
      </div>
   )
}

const mapStateToProps = state => ({
   user: state.auth.user
})

export default connect(mapStateToProps)(Chat)
