var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require('firebase/app');
require('firebase/firestore');

// Firebase setup
var firebaseConfig = {
  apiKey: "AIzaSyAC2gdX4vgp-rr4fpIxYKrAd8kSQvIoBao",
  authDomain: "oh-whats-express.firebaseapp.com",
  databaseURL: "https://oh-whats-express.firebaseio.com",
  projectId: "oh-whats-express",
  storageBucket: "oh-whats-express.appspot.com",
  messagingSenderId: "552865459965",
  appId: "1:552865459965:web:e80eda0b324eb479651894",
  measurementId: "G-022W49PM85"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Express
app.use(bodyParser.json());

app.use(function(req, res, next){
  console.log("Request received at:", Date.now());
  next();
});

// Add message
app.post('/:collection', function(req, res){
  var body = req.body;
  var now = new Date()
  if (!body.message) {
    res.send("Time: " + now.toString() + '\n' +
             "No message given!");
  } else {
    db.collection(req.params.collection).add({
      "time": now.getTime(),
      "message": body.message
    }).then(ref => {
      console.log("Added message with ID:", ref.id);
      console.log("Message:", body.message);
      res.send("Time: " + now.toString() + '\n' +
               "Received message: " + body.message);
    });
  }
});

// Get all collection messages
app.get('/:collection', function(req, res){
  var message = "";
  db.collection(req.params.collection).orderBy('time', 'desc').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
        message += new Date(doc.data().time).toString().slice(0, 24)
                 + ": " +  doc.data().message + '\n';
      });
      console.log(message);
      if (!message) {
        message = "Nothing here!";
      }
      res.send("Collection: " + req.params.collection + '\n\n' + message);
    })
    .catch((err) => {
      console.log("Error getting documents", err);
    });
});

app.listen(3000);

