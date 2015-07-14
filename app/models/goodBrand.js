/**
 * Created by Jason on 15/7/6.
 */

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

// good schema
var GoodBrandSchema   = new Schema({
    number: { type: String, index: { unique: true }},
    name:	{ type: String, required: true}
});


module.exports = mongoose.model('GoodBrand', GoodBrandSchema);