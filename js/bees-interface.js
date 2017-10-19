require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const apiKey = require('./../.env').apiKey;

let BEEFACTS = ['The queen may lay 600-800 or even 1,500 eggs each day during her 3 or 4 year lifetime. This daily egg production may equal her own weight. She is constantly fed and groomed by attendant worker bees.', 'Honeybees fly at 15 miles per hour.', 'Honeybees have five eyes, 3 small ones on top of the head and two big ones in front.  They also have hair on their eyes!', 'Honeybees will usually travel approximately 3 miles from their hive.', 'A populous colony may contain 40,000 to 60,000 bees during the late spring or early summer.'];

let count = 0;

$(document).ready(function(){

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

    let noPunBody = comment.body.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");

    if(noPunBody.includes(' bee ')){
      comment.reply(`${BEEFACTS[count]}`);
      count ++;
      if(count === 4){
        count = 0;
      }
      $('#posts').append(`<div class='card bg-light mb-3'><div class='card-body'><p>Comment: ${comment.body}<br>${comment.link_permalink}<br>replied with: ${BEEFACTS[count]}</p></div></div>`);
    }
  });
});
