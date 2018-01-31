const express = require('express');
const Pusher = require('pusher');
const mongoose = require('mongoose');

const Vote = require('../models/Vote');

var pusher = new Pusher({
  appId: '465469',
  key: '19e7b3a70de586210316',
  secret: '8ac918d20e521f65f1bd',
  cluster: 'us2',
  encrypted: true
});

//Create Router
const router = express.Router();

// the '/' will mean /poll because in app.js anything using /poll is happening in poll.js --> app.use('/poll', poll);
router.get('/', function(req, res) {
  Vote.find().then(votes => res.json({ success: true, votes: votes}));
});

router.post('/', function(req, res) {
  const newVote = {
    os: req.body.os,
    points: 1
  };

  new Vote(newVote).save().then(function(vote) {
    pusher.trigger('os-poll', 'os-vote', {
      points: parseInt(vote.points),
      os: vote.os
    });

    return res.json({success: true, message: "Thank you for voting"})
  });
});

module.exports = router;
