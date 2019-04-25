/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

var isPredicting = true;
var isLoaded = false;
var labels = [
  "backpack",
  "beer-mug",
  "bonsai",
  "butterfly",
  "cake",
  "calculator",
  "cd",
  "coffee-mug",
  "coin",
  "computer-keyboard",
  "computer-monitor",
  "computer-mouse",
  "diamond-ring",
  "dice",
  "dog",
  "duck",
  "dumb-bell",
  "eiffel-tower",
  "electric-guitar",
  "elephant",
  "eyeglasses",
  "faces",
  "fire-extinguisher",
  "flower",
  "fried-egg",
  "frying-pan",
  "goat",
  "grand-piano",
  "guitar-pick",
  "hamburger",
  "homer-simpson",
  "knife",
  "laptop",
  "lightbulb",
  "microwave",
  "mountain-bike",
  "paperclip",
  "penguin",
  "people",
  "playing-card",
  "rainbow",
  "revolver",
  "sheet-music",
  "sneaker",
  "soccer-ball",
  "spaghetti",
  "spider",
  "spoon",
  "t-shirt",
  "tomato",
  "video-projector",
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
        let i = results.dataSync().indexOf(Math.max(...results.dataSync()));
        // Display the resutls
        $('#result').html('<p>' + labels[i] + '</p>');
      });
      await tf.nextFrame();
    }
  }