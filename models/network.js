var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    Contact = require('./contact');

// NETWORK
var Network = new Schema({
  created_at: { type: Date, default: Date.now() },
  title: { type: String, required: true, trim: true },
  contacts: [ {type: Schema.Types.ObjectId, ref: "Contact"} ]
});

var Network = mongoose.model('Network', Network);

module.exports = Network;