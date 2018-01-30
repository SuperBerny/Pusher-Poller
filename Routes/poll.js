const express = require('express');
const Pusher = require('pusher');

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
  res.send('POLL');
});

router.post('/', function(req, res) {
  pusher.trigger('os-poll', 'os-vote', {
    points: 1,
    os: req.body.os
  });

  return res.json({success: true, message: "Thank you for voting"})
})

module.exports = router;
