const path = require('path')
const express = require('express')
require('./db/connect')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SocketManager = require('./sockets/SocketManager')(io)

app.use(express.json())

io.on('connection', SocketManager);

app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/post', require('./routes/post'))

if(process.env.NODE_ENV === 'production') {
   app.use(express.static('client/build'))
   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}

const PORT = process.env.PORT || 5000 

http.listen(PORT, () => console.log('Server started on port 5000'))