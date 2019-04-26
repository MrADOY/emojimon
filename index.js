/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

var isPredicting = true;
var isLoaded = false;
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
        // Find the best probability
        let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
        // console.log(results.dataSync());
        // Display the resutls
        $('#result').html('<p>' + labels[i] + ' n°' + i + '</p>');
      });
      await timeout(500);
      await tf.nextFrame();
    }
  }

  function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
  }
