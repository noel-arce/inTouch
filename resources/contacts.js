var express = require('express');
var contactRouter = express.Router();
var Contact = require('../models/contact.js');
var User = require('../models/user.js');
// var Network = require('../models/network.js');

contactRouter.route('/')  // translates to '/api/contacts/'
  
  // GET ALL USER CONTACTS
  .get(function (req, res){
  console.log("this is the request from client for contacts: ", req);
      Contact.find().sort('-created_at').exec(function(err, contacts) {
      if (err) { return res.status(404).send(err); }
      res.send(contacts); 
    });    
  })

  // .get(function (req, res){
  //   console.log("this is the request from client for contacts: ", req);
  //     Contact.find().sort('-created_at').exec(function (err, contacts) {
  //     if (err) { return res.status(404).send(err); }
  //     // console.log("this users contacts are: ", contacts[0].creator);
  //     for (var i = 0; i < contacts.length; i++) {
  //       if (contacts[i].creator === currentUser) { res.send(contacts); }
  //     }
  //   });    
  // })

  // CREATE CONTACT
  .post(function (req, res) {  
    // console.log("This is the client request", req.body);
    Contact.create({ name: req.body.name, days: req.body.days, deadline: req.body.deadline, creator: req.body.creator }, function(err, contact){
      if (err) { return res.send(err); }
    //   Network.findById(req.body.network_id, function(err, network) {
    //     network.contacts.push(contact._id);
    //     network.save(function(err){
    //       console.log(err);
    //     });
        console.log(contact);
        res.status(201).send(contact);
    //   });
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

    // Contact.findById(req.body._id, function(err, contact) {
    //   if (err) { return res.status(404).send(err); }
    //   console.log("new contact info is: ", contact);
    // });
  })

  // DELETE CONTACT
  .delete(function (req,res) {
    Contact.findByIdAndRemove(req.params.contact_id, function (err, post) {
      if (err) { return res.send(err); }
      res.status(200).send('Successful Delete');
    });
  });

  // send one post by id
  // .get(function(req,res){   
  //   console.log("This is the req:", req);
  //     Contact.findById(req.params.contact_id, function(err, contact) {
  //     if (err) { return res.status(404).send(err); }
  //     res.send(contact); 
  //   });
  // })

module.exports = contactRouter;















