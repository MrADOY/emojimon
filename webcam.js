/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
@doc: https://www.html5rocks.com/en/tutorials/getusermedia/intro/
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
    setTimeout(function () {
      var image = tf.browser.fromPixels($('video')[0]);
      image.print();
      console.log($('canvas')[0]);
      tf.browser.toPixels(image, $('canvas')[0]);
    }, 1500);
  }

  // When error
  function handleError(error) {
    console.error(error);
    $('.video .error').prepend('<div class="alert alert-danger" role="alert"><strong>Erreur</strong> La caméra est obligatoire. </div>');
    $('.video .error').show('slow');
  }
});
