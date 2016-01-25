var express = require('express');
var contactRouter = express.Router();
var Contact = require('../models/contact.js');
var User = require('../models/user.js');
var auth = require('./auth');

contactRouter.route('/')  // translates to '/api/contacts/'
  
  // GET ALL USER CONTACTS
  .get(auth.ensureAuthenticated, function (req, res){
      Contact.find({ creator:req.userId }).exec(function (err, contacts) {
      if (err) { return res.status(404).send(err); }
      res.send(contacts);
    });    
  })

  // CREATE CONTACT
  .post(function (req, res) {  
    Contact.create({ name: req.body.name, days: req.body.days, deadline: req.body.deadline, creator: req.body.creator }, function(err, contact){
      if (err) { return res.send(err); }
        console.log(contact);
        res.status(201).send(contact);
    });
  });

contactRouter.route('/:contact_id')   // translates to '/api/contacts/:contact_id

  // EDIT CONTACT
  .put(function (req,res) {
    var newContact = req.body;
    Contact.findByIdAndUpdate(req.body._id, { $set : newContact }, function (err, contact) {
      if (err) { return res.status(404).send(err); }
      res.send(contact);
    });
  })

  // DELETE CONTACT
  .delete(function (req,res) {
    Contact.findByIdAndRemove(req.params.contact_id, function (err, post) {
      if (err) { return res.send(err); }
      res.status(200).send('Successful Delete');
    });
  });

module.exports = contactRouter;














