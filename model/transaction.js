const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;



const transactionSchema = new Schema({
    member : {type: Schema.Types.ObjectId, ref: 'Customer'},
    in_date : {type : Date, default : Date.now} ,
    out_date : {type : Date, default : Date.now},
    due_date : {type : Date, default : Date.now},
    fine : Number,
    booklist : [{type: Schema.Types.ObjectId, ref: 'Book'}]
})


transactionSchema.pre('save', (next) => {
    this.out_date = new Date()
    next()
})

transactionSchema.post('findOneAndUpdate', (transaction) => {
    let day = Math.ceil(new Date(transaction.in_date).getTime() - new Date(transaction.due_date).getTime());

    if(transaction.in_date > transaction.due_date){
        transaction.fine = day * 1000;
        transaction.save()
    }
})


const transaction = mongoose.model('Transaction', transactionSchema);



module.exports = transaction