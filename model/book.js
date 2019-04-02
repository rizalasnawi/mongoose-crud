const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const bookSchema = new Schema({
    isbn : {type :  String },
    title : String,
    author : String,
    category : String,
    stock : {
        type : Number,
        min : 1
    } 
})


const book = mongoose.model('Book', bookSchema);


module.exports = book
