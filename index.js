let isPredicting = true;

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
