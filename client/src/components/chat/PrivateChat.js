import React, { useState, useEffect } from 'react'
import Modal from '../layout/Modal/Modal';

const PrivateChat = ({ user, socket }) => {
   
   const [messages, setMessages] = useState([])
   const [text, setText] = useState('')

   useEffect(() => {
      const handler1 = (msg) => {
         setMessages(prevState => [...prevState, msg])
      }
      
      socket.on('get-private-message', handler1)
      
      return () => {
         socket.emit('leave-room', user.email)
         socket.off('get-private-message', handler1)
      }
   }, [socket, user])

   return (
      <Modal show={user}>
         <div className="chat__private">
            <h4> {user.name}'s Private Chat. </h4>
            <div className="chat__private--messages">
               {messages && messages.map((msg, i) => <p key={i} className="lead"> {msg.name} : {msg.msg} </p>)}
            </div>
            <form className="chat__form--private form" onSubmit={e => {
               e.preventDefault()
               socket.emit('open-chat', { email: user.email, msg: text })
               socket.emit('send-private-message', { room: user.email, msg: text })
               setText('')
            }}>
               <input
                  onChange={e => setText(e.target.value)}
                  value={text}
                  type="text" placeholder="Enter your message" />
               <input
                  className="btn btn-primary"
                  type="submit"
                  value="Send Message"
               />
            </form>
         </div>
      </Modal>
   )
}

export default PrivateChat
