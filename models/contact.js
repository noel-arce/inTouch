/*
 * CONTACT MODEL
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


// Contact Schema
var ContactSchema = new Schema({
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date },
    name: { type: String, required: true, trim: true },
    days: { type: Number, required: true },
    deadline: { type: Number, required: true },
    time_left: {type: Boolean, required: true, default: true}
});

// MIDDLEWARE
ContactSchema.pre('save', function(next){
  // set a created_at and update updated_at
  now = new Date();
  this.updated_at = now;
  if ( !this.created_at ) {
    this.created_at = now;
  }
  next();
});


var Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;

