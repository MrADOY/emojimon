/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

var isPredicting = true;
var isLoaded = false;
var init = false;
var success = false;
var to_find, found;

var response_success = [
  "Oh ! You found a "
];
var response = [
  "Oh ! I see a ",
  "Hum, I think it's a ",
  "I'm pretty sure it's a ",
  "Maybe it's a ",
  "Oh yes, it's a "
];

var labels = [
  "backpack",
  "beer-mug",
  "book",
  "bottle",
  "calculator",
  "chair",
  "coffee-mug",
  "computer-keyboard",
  "computer-monitor",
  "computer-mouse",
  "people",
  "smartphone",
  "table",
  "watch"
];

function game() {
  if (!init || success) {
    to_find = labels[Math.floor(Math.random()*labels.length)];
    $('#search').html('<p>You have to find : '+ to_find + '</p>');
    init = true;
    success = false;
  }
}

// Predict function
async function predict(){
  // Load the model
  let i = 1;
  var interval = setInterval(function () {
    $('.loading .bar').html('<progress class="nes-progress is-primary" value="'+i+'" max="100"></progress>');
    i=i+5;
  }, 500);
  if(!isLoaded){
    var model = await tf.loadLayersModel('https://serveurnicoant.ddns.net/emojimon/training/model.json/model.json');
    model.summary();
    isLoaded = true;
    setTimeout(function () {
      clearInterval(interval);
      $('.loading .bar').html('<progress class="nes-progress is-primary" value="100" max="100"></progress>');
    }, 1000);
    setTimeout(function () {
      $('.loading').hide();
      $('.video').show("fold", 'slow');
      $('#result').show();
    }, 2000);

  }

  while (isPredicting && isLoaded) {
    tf.tidy(() => {
      // Capture the frame from the webcam.
      const img = capture();
      // Predict
      let results = model.predict(img);
      let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
      found = labels[i];
      // console.log(results.dataSync());
      // Display the resutls
      if (found == to_find) {
        $('#result').html('<p class="nes-text is-success">'+ response_success[Math.floor(Math.random()*response_success.length)] + found + '</p>');
        success = true;
      }
      else {
        $('#result').html('<p>'+ response[Math.floor(Math.random()*response.length)] + found + '</p>');
      }
      game();
    });
    await tf.nextFrame();
    await timeout(500);
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
