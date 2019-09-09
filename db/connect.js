const mongoose = require('mongoose')
mongoose.connect(process.env.mongo_uri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
}).then(_ => console.log('Database connected'))