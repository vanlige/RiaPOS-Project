/**
 * Created by Jason on 15/6/29.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// user schema
var ClientSchema   = new Schema({
    name: { type: String, required: true, index: { unique: true }},
    phone:	  Number,
    type:   String,
    birthday:String,
    sex:String,
    money:Number,
    point:Number,
    rlevel:String,
    wlevel:String,
    company:String,
    contact:String,
    address:String,
    comment:String
});


module.exports = mongoose.model('Client', ClientSchema);