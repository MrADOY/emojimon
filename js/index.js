/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

window.isPredicting = false;
var isLoaded = false;
var camLoaded = false;
var init = fail = success = false;
var toFind, found;
var model;
var maxTime = 20;
var gameTimer, domUpdate, secondStarted;

var soundSuccess = new Howl({ src: ['sounds/mariachi.mp3'] });
var soundFail = new Howl({ src: ['sounds/player_down.wav'] });


var responseSuccess = [
  "Oh ! You found a ",
  "Oh yes, it's a "
];
var response = [
  "Oh ! I see a ",
  "Hum, I think it's a ",
  "I'm pretty sure it's a ",
  "Maybe it's a "
];

var responseSuccessFr = [
  "Oh ! Tu as trouvé ",
  "Oui ! C'est bien "
];
var responseFr = [
  "Oh ! Je vois ",
  "Hum, je pense que c'est ",
  "Je suis presque sur que c'est ",
  "C'est peut-être "
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

var labelsFr = [
  "un sac à dos",
  "un verre de bière",
  "un livre",
  "une bouteille",
  "une calculatrice",
  "une chaise",
  "une tasse",
  "un clavier",
  "un écran",
  "une souris",
  "une personne",
  "un smartphone",
  "une table",
  "une montre"
];

function say(message) {
  var msg = new SpeechSynthesisUtterance(); //Create the vocal message object
  var voices = window.speechSynthesis.getVoices();  //Get the available voices (depends of the navigator)
  console.log(voices);
  msg.voice = voices[8]; //Choose a voice (10 = firefox/8 = chrome)
  msg.voiceURI = "native";
  msg.volume = 1; 
  msg.rate = 1; //speed of reading
  msg.pitch = 0.8;
  msg.text = 'Tu dois trouver ' + message; //Message(text) to read
  msg.lang = 'fr-FR';
  speechSynthesis.speak(msg);
}

function launchTimer() {
  secondStarted = $.now();
  gameTimer = setInterval(function () {
    secondStarted = $.now();
    fail = true;
  }, maxTime*1000);
  domUpdate = setInterval(function () {
    updateDOM();
  }, 1000);
}

function stopTimer() {
  clearInterval(gameTimer);
  clearInterval(domUpdate);
}

function updateDOM() {
  $('#nbPoints').html(window.nbPoints);
  if (window.isPredicting) {    
    $("#timeLeft").html(Math.trunc(maxTime - (($.now()/1000) - (secondStarted/1000))));
  }
}

function restartGame() {
  setToFind();
  window.isPredicting = true;
  predict();
  launchTimer();
}

function setToFind(id=null) {
  if (id) {
    toFind = labelsFr[id];
  }
  else {
    toFind = labelsFr[Math.floor(Math.random()*labelsFr.length)];
  }
  say(toFind);
  $('#search').html('<p>Tu dois trouver : '+ toFind + '</p>');
}

function game(img) {
  if (found == toFind) {
    success = true;
  }
  else {
    if (!success) {
      $('#result').html('<p>'+ responseFr[Math.floor(Math.random()*responseFr.length)] + found + '</p>');
    }
  }
  if (!init) {
    // toFind = labelsFr[Math.floor(Math.random()*labelsFr.length)];
    setToFind(11);
    init = true;
  }
  if (success) {
    stopTimer();
    window.isPredicting = false;
    window.nbPoints++;
    $('#result').html('<p class="nes-text is-success">'+ responseSuccessFr[Math.floor(Math.random()*responseSuccessFr.length)] + found + '</p>');
    soundSuccess.play();
    screenshot();
    updateDOM();
    var successTimeout = setTimeout(() => {
      success = false;
      restartGame();
    }, 5000);
  }
  if (fail) {
    soundFail.play();
    stopTimer();
    window.isPredicting = false;
    var failTimeout = setTimeout(() => {
      fail = false;
      restartGame();
    }, 5000);
  }
}

// Predict function
async function predict(){
  window.isPredicting = true;
  // Load the model
  if (!init) {
    let i = 1;
    var interval = setInterval(function () {
      $('.loading .bar').html('<progress class="nes-progress is-primary" value="'+i+'" max="100"></progress>');
      i=i+1;
      if (i>=100) {
        i=1;
      }
    }, 100);
  }
  if(!isLoaded){
    model = await tf.loadLayersModel('https://raw.githubusercontent.com/MrADOY/emojimon/master/training/model.json/model.json');
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
    launchTimer();
  }

  while (window.isPredicting && isLoaded && window.camLoaded) {
    // Capture the frame from the webcam.
    const img = capture();
    // Predict
    let results = model.predict(img);
    let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
    found = labelsFr[i];
    // console.log(results.dataSync());
    // Display the resutls
    if (!success) {
      game(img);
    }
    img.dispose();
    results.dispose();
    await tf.nextFrame();
    await timeout(100);
  }
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
