const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/generic', {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
}).then(_ => console.log('Database connected'))