/**
 * Created by Jason on 15/7/2.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// good schema
var GoodSchema   = new Schema({
    number: { type: String, required: true, index: { unique: true }},
    name:	  String,
    type:   String,
    category:String,
    brand:String,
    /*priceType:String,*/
    price1:Number,
    price2:Number,
    price3:Number,
    price4:Number,
    price5:Number,
    cost:Number,
    warehouse:String,
    quantity:Number,
    applier:String,
    barcode:String,
    comment:String
});


module.exports = mongoose.model('Good', GoodSchema);