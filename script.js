var Twit = require("twit");

var T = new Twit({
  consumer_key: "1vRvgTAHwp6acG0J2hxkVAVEZ",
  consumer_secret: "Tiqp3WC0Q2kwjfPhVZiJ8kyMSS5otiuzHlWeqqW8L74RfpSaHr",
  access_token: "855167353709109251-3aR9w4lKr2eox5Ydil5P48ETiLaayWt",
  access_token_secret: "BpuYAd9aWI2kO43xcM7s9aECGumhNACOAcX4xkzHim861",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true // optional - requires SSL certificates to be valid.
});

//
//  tweet 'hello world!'
//
T.post("statuses/update", { status: "hello world!" }, function(
  err,
  data,
  response
) {
  console.log(data);
});
