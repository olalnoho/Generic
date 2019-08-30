const users = []
const ids = {}

/*
   --- DEBUG NOTES ---
      Get rooms: console.log(Object.keys(io.sockets.adapter.sids[socket.id]))
*/

module.exports = (io) => function (socket) {
   socket.on('join', ({ name, email }) => {
      ids[email] = socket.id
      socket.name = name
      socket.email = email
      if (!users.includes(name)) {
         socket.join(email)
         users.push({ name, email })
      }
      io.emit('updated_users', users)
   })

   socket.on('send-message', function (msg) {
      console.log(socket.name)
      io.emit('get-message', { name: socket.name, msg });
   });

   socket.on('room', function (room) {
      socket.join(room)
   })

   socket.on('leave-room', function (room) {
      socket.leave(room)
   })

   socket.on('open-chat', obj => {
      // Seems very hacky, try to fix.
      // Also first message doens't show up sometimes. :/
      socket.to(ids[obj.email]).emit('chat-open')
   })

   socket.on('send-private-message', function (info) {
      io.to(info.room).emit('get-private-message', { name: socket.name, msg: info.msg })
   })

   socket.on('whisper', function (info) {
      io.to(ids[info.user]).emit('get-message', { name: socket.name, msg: info.msg })
   })

   socket.on('leave', () => {
      socket.name && users.splice(users.findIndex(({ name }) => socket.name == name), 1)
      io.emit('updated_users', users)
   })

   socket.on('disconnect', () => {
      socket.name && users.splice(users.findIndex(({ name }) => socket.name == name), 1)
      io.emit('updated_users', users)
   })

}