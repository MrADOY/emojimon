/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

// When it's load.
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
