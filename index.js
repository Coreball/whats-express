var express = require('express');
var app = express();
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
db.collection('cities').doc('New York').set({
  "name": "New York City",
});

// Express
app.use(function(req, res, next){
  console.log("Request received at: " + Date.now());
  next();
});

app.get('/hello', function(req, res){
  res.send("Hello " + req.query.planet);
});

app.listen(3000);

