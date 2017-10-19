require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  let timer = setTimeout(function(){
    alert("test");
  }, 3000);
  console.log("run")
  const r = new Snoowrap({
    userAgent: 'bee-facts-bot',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
  });

  const client = new Snoostorm(r);

  const streamOpts = {
    subreddit: 'all',
    results: 25
  };
  const comments = client.CommentStream(streamOpts);


  comments.on('comment', (comment) => {
      $('#posts').append(`<p>${comment.body}</p>`);
      console.log(comment.body);
  });
});
