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
    if(!isLoaded){
      var model = await tf.loadLayersModel('http://serveurnicoant.ddns.net/emojimon/training/model.json/model.json');
      model.summary();
      isLoaded = true;
    }

    while (isPredicting && isLoaded) {
      tf.tidy(() => {
        // Capture the frame from the webcam.
        const img = capture();
        // Predict
        let results = model.predict(img);
        // Find the best probability
        let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
        // Display the resutls
        $('#result').html('<p>' + labels[i] + '</p>');
      });
      await tf.nextFrame();
    }
  }