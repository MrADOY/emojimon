/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

// Load the model
var isPredicting = true;
async function loadModel(){
    const model = await tf.loadLayersModel('http://serveurnicoant.ddns.net/emojimon/training/model.json/model.json');
    model.summary();
}

// Predict function
async function predict(){
    while (isPredicting) {
      tf.tidy(() => {
        console.log('predict');
        // Capture the frame from the webcam.
        const img = capture();
      });
      await tf.nextFrame();
    }
  }