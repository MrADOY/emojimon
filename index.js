/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

// TODO Load the model.

var isPredicting = true;

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