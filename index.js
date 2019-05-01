/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

window.isPredicting = false;
var isLoaded = false;
var camLoaded = false;
var init = false;
var success = false;
var to_find, found;
var nb_found = 0;
var model;

var soundSuccess = new Howl({ src: ['sounds/success.mp3'] });

var response_success = [
  "Oh ! You found a ",
  "Oh yes, it's a "
];
var response = [
  "Oh ! I see a ",
  "Hum, I think it's a ",
  "I'm pretty sure it's a ",
  "Maybe it's a "
];

var response_success_fr = [
  "Oh ! Tu as trouvé ",
  "Oui ! C'est bien "
];
var response_fr = [
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

var labels_fr = [
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

function game(img) {
  if (found == to_find) {
    $('#result').html('<p class="nes-text is-success">'+ response_success_fr[Math.floor(Math.random()*response_success_fr.length)] + found + '</p>');
    soundSuccess.play();
    success = true;
    screenshot();
  }
  else {
    if (!success) {
      $('#result').html('<p>'+ response_fr[Math.floor(Math.random()*response_fr.length)] + found + '</p>');
    }
  }
  if (!init) {
    // to_find = labels_fr[Math.floor(Math.random()*labels_fr.length)];
    to_find = labels_fr[11];
    $('#search').html('<p>Tu dois trouver : '+ to_find + '</p>');
    init = true;
  }
  if (success) {
    window.isPredicting = false;
    var successTimeout = setTimeout(() => {
      nb_found++;
      to_find = labels_fr[Math.floor(Math.random()*labels_fr.length)];
      $('#search').html('<p>Tu dois trouver : '+ to_find + '</p>');
      success = false;
      window.isPredicting = true;
      predict();
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
  }

  while (window.isPredicting && isLoaded && window.camLoaded) {
    // Capture the frame from the webcam.
    const img = capture();
    // Predict
    let results = model.predict(img);
    let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
    found = labels_fr[i];
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
