const Twit = require("twit");
const fs = require("fs");
const parseJson = require("parse-json");

const T = new Twit({
  consumer_key: "1vRvgTAHwp6acG0J2hxkVAVEZ",
  consumer_secret: "Tiqp3WC0Q2kwjfPhVZiJ8kyMSS5otiuzHlWeqqW8L74RfpSaHr",
  access_token: "855167353709109251-3aR9w4lKr2eox5Ydil5P48ETiLaayWt",
  access_token_secret: "BpuYAd9aWI2kO43xcM7s9aECGumhNACOAcX4xkzHim861",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

const TWEETS_DIR = "./data/";

// promisify fs.readFile()
fs.readFileAsync = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, buffer) => {
      if (err) reject(err);
      else resolve(buffer);
    });
  });
};

// utility function
function getTweetByFilename(filename) {
  return fs.readFileAsync(TWEETS_DIR + filename);
}

function getTodayDate() {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth() + 1; //January is 0!
  const yyyy = today.getFullYear();
  return `${yyyy}-${new String(mm).length == 2 ? mm : "0" + mm}-${
    new String(dd).length == 2 ? dd : "0" + dd
  }`;
}

function getListOfTweets() {
  const files = fs.readdirSync(TWEETS_DIR);
  const tweets = files.filter(file =>
    file.match(/\d{4}-\d{2}-\d{2}_\d{1,}\.json/)
  );
  return tweets;
}

function getListOfTweetsToSchedule() {
  return getListOfTweets().filter(
    tweet =>
      tweet > getTodayDate() + "_99999" /* Hack for excluding todays tweets */
  );
}

function convertBuffersToJSONs(tweetBuffers) {
  return tweetBuffers.map(buffer => parseJson(buffer.toString()));
}

async function readTweetsToSchedule() {
  const tweets = getListOfTweetsToSchedule().map(getTweetByFilename);

  return Promise.all(tweets)
    .then(tweetBuffers => {
      // all tweets have loaded
      return convertBuffersToJSONs(tweetBuffers);
    })
    .catch(err => {
      console.error(err);
    });
}

function postTweet(tweet) {
  T.post("statuses/update", tweet, function(err, data, response) {
    console.log(data);
  });
}

async function main() {
  const tweetsToSchedule = await readTweetsToSchedule();
  tweetsToSchedule.forEach(tweet => postTweet(tweet));
}

main();
