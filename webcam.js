/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

// When it's load.

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 100;
const IMAGE_CHANNELS = 3;
const outShape = [1, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS];

$(() => {
  $('.video .cam').hide();
  $('.video .error').hide();
  const video = $('.video .cam video')[0];

  const constraints = {
    audio: false,
    video: {
      width: {
        exact: 256
      },
      height: {
        exact: 256
      }
    }
  };

  // Get access to webcam
  navigator.mediaDevices.getUserMedia(constraints)
  .then(handleSuccess)
  .catch(handleError);

  // Stream the video.
  function handleSuccess(stream) {
    video.srcObject = stream;
    setTimeout(function () {
      $('.video .cam').show('slow');
    }, 500);
    return tf.browser.fromPixels($('video')[0]);
  }

  // When error
  function handleError(error) {
    console.error(error);
    $('.video .error').prepend('<div class="alert alert-danger" role="alert"><strong>Erreur</strong> La caméra est obligatoire. </div>');
    $('.video .error').show('slow');
  }
});

  // Captures a frame from the webcam and convert it to tensor.
  function capture() {
    return tf.tidy(() => {
      //Crop the image to have a 100x100 square which is the center of the camera
      let tensor3d = tf.browser.fromPixels($('.video .cam video')[0]);
      let center_height = tensor3d.shape[0]/2;
      let begin_height = center_height - (IMAGE_HEIGHT/2);
      let center_width = tensor3d.shape[1]/2;
      let begin_width = center_width - (IMAGE_WIDTH/2);
      let tensor3d_cropped = tensor3d.slice([begin_height, begin_width, 0], [IMAGE_HEIGHT, IMAGE_WIDTH, 3]);

      return tf.tensor4d(tensor3d_cropped.dataSync(), outShape, "int32");
    });
  }