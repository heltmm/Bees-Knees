require('dotenv').config();

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');
const apiKey = require('./../.env').apiKey;

const BEEFACTS = ['The queen may lay 600-800 or even 1,500 eggs each day during her 3 or 4 year lifetime. This daily egg production may equal her own weight. She is constantly fed and groomed by attendant worker bees.', 'Honey bees fly at 15 miles per hour.', 'Honeybees have five eyes, 3 small ones on top of the head and two big ones in front.  They also have hair on their eyes!', 'Honeybees will usually travel approximately 3 miles from their hive.', 'A populous colony may contain 40,000 to 60,000 bees during the late spring or early summer.', "Honey bees' wings stroke 11,400 times per minute, thus making their distinctive buzz.", 'Honeybees are responsible for pollinating approx 80% of all fruit, vegetable and seed crops in the U.S', 'Honeybees never sleep!', 'A typical beehive can make up to 400 pounds of honey per year.', 'Out of 20,000 species of bees, only 4 make honey.', "Bees maintain a temperature of 92-93 degrees Fahrenheit in their central brood nest regardless of whether the outside temperature is 110 or -40 degrees", 'The average bee will make only 1/12th of a teaspoon of honey in its lifetime.'];

// returns a number >= 0 and < num
let random = function(num){
  return Math.floor(Math.random() * num);
};

let count = random(BEEFACTS.length);

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

    let noPunBody = comment.body.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");

    if(noPunBody.includes(' bee ')){
      comment.reply(`${BEEFACTS[count]}`);
      count ++;
      if(count === BEEFACTS.length){
        count = 0;
      }
      $('#posts').append(`<div class='card bg-light mb-3'><div class='card-body'><p>Comment: ${comment.body}<br><br>${comment.link_permalink}<br><br>replied with: ${BEEFACTS[count]}</p></div></div>`);
    }
  });
});
