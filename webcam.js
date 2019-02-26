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
    video: {
      width: {
        exact: 640
      },
      height: {
        exact: 480
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
  }

  // When error
  function handleError(error) {
    $('.video .error').prepend('<div class="alert alert-danger" role="alert"><strong>Erreur</strong> La caméra est obligatoire. </div>');
    $('.video .error').show('slow');
  }
});
