require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const apiKey = require('./../.env').apiKey;

$(document).ready(function(){
  let timer = setTimeout(function(){
    alert("test");
  }, 3000);


  const r = new Snoowrap({
    userAgent: 'bee-facts-bot',
    clientId: apiKey.CLIENT_ID,
    clientSecret: apiKey.CLIENT_SECRET,
    username: apiKey.REDDIT_USER,
    password: apiKey.REDDIT_PASS
  });

  const client = new Snoostorm(r);

  const streamOpts = {
    subreddit: 'all',
    results: 25
  };
  const comments = client.CommentStream(streamOpts);


  comments.on('comment', (comment) => {

      console.log(comment);



      let noPunBody = comment.body.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
      $('#posts').append(`<div class='card bg-light mb-3'><div class='card-body'><p>Comment: ${noPunBody}<br>${comment.link_permalink}</p></div></div>`);
  });
});
