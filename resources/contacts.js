var express = require('express');
var contactRouter = express.Router();
var Contact = require('../models/contact.js');
var Network = require('../models/network.js');

contactRouter.route('/')  // translates to '/api/contacts/'
  // send all contacts
  .get(function(request, response){
      Contact.find().sort('-created_at').exec(function(err, contacts) {
      if (err) { return response.status(404).send(err); }
      response.send(contacts); 
    });    
  })

  // create new contact
  .post(function(req,res){  
    console.log("This is the server request", req.body);
    Contact.create({ name: req.body.name, deadline: req.body.deadline, days: req.body.days}, function(err, contact){
      if (err) { return res.send(err); }
      Network.findById(req.body.network_id, function(err, network) {
        network.contacts.push(contact._id);
        network.save(function(err){
          console.log(err);
        });
        console.log(network);
        res.status(201).send(contact);
      });
    });
  });

contactRouter.route('/:contact_id')   // translates to '/api/contacts/:contact_id'
  // send one post by id
  .get(function(req,res){   
    console.log("This is the req:", req);
      Contact.findById(req.params.contact_id, function(err, contact) {
      if (err) { return res.status(404).send(err); }
      res.send(contact); 
    });
  })

  // full update of one contact by id
  .put(function(req,res){ 
    var contactEdit = req.body;
    Contact.findByIdAndUpdate(req.body._id, { $set : contactEdit }, function (err, contact) {
      if (err) { return res.send(err); }
      console.log('the new post', contact);
    });    

    Contact.findById(req.body._id, function(err, contact) {
      if (err) { return res.status(404).send(err); }
      res.send(contact); 
    });
  })

  // delete one post by id
  .delete(function(req,res){   
    Contact.findByIdAndRemove(req.params.contact_id, function (err, post) {
      if (err) { return res.send(err); }
      res.status(200).send('Success');
    });
  });

module.exports = contactRouter;