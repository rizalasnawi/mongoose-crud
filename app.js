const express = require('express');
const app = express();
const port = 4000;

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/libMongoose', {useNewUrlParser: true});
let db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('oper', function(){
  res.send('we are connected')
})


const routerBook = require('./routes/book');
const routeMember = require('./routes/member');
const routeTransaction = require('./routes/transaction');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/', routerBook);
app.use('/', routeMember);
app.use('/', routeTransaction);


app.listen(port, () => {
    console.log(`Listen to port ${port}`);
})



