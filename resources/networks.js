// var express = require('express');
// var networkRouter = express.Router();
// var Network = require('../models/network.js');
// var Contact = require('../models/contact.js');
// var User = require('../models/user.js');
// var auth = require('./auth');

// networkRouter.route('/')  
//   // create new network
//   .post(auth.ensureAuthenticated, function(req,res){  
//     // console.log(req.body);
//     Network.create({ title: req.body.title }, function(err, network){
//       if (err) { return res.send(err); }
//       User.findById(req.userId, function(err, user) {
//         console.log("user id is: ", req.userId);
//         if (err) { console.log(err); }
//         // console.log("network is: ", network);
//         console.log("user is: ", user);
//         user.networks.push(network._id);
//           console.log("user networks are: ", user.networks);
//         user.save(function(err){
//           console.log(err);
//           console.log("updated user is: ", user);
//         });
//         console.log(user);
//         res.status(201).send(network);
//       });
//     });
//   });

// networkRouter.route('/:network_id')  
//   .delete(function(req,res){
//     Network.findById(req.params.network_id, function (err, network) {
//       if (err) { return res.send(err); }
//       Contact.remove({_id: {$in: network.contacts} }, function(err) {
//         if (err) { return res.send(err); }
//         Network.remove({_id: network._id}, function(err) {
//           if (err) { return res.send(err); }
//           res.status(200).send('Success deleting');
//         });
//       });
//     });
//   })
  
//   .put(function(req, res){
//     console.log(req);
//     Network.findByIdAndUpdate(req.body._id, req.body, function(err, network){
//       if (err) { return res.send(err); }
//         console.log(network);
//         res.status(201).send(network);
//     });
//   });

// module.exports = networkRouter;