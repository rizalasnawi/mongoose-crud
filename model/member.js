const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const memberSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    address : String,
    zipcode : {
        type : String,
        min : [3, `Minimum zip code are 3 characters`]
    },
    email : {
        type : String,
        trim : true,
        lowercase :true,
        unique : true,
        required : `Email address is required`,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone : {
        type : String,
        min : [11, `Phone number must be between 11 and 13`],
        max : 13
    } 
})

const member = mongoose.model('Member', memberSchema);


module.exports = member