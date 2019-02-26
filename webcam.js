/*
 @authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
           Marceau Hollertt, Aurelien Pietrzak.
 @doc: https://www.html5rocks.com/en/tutorials/getusermedia/intro/
*/

// When it's load.
$(() => {
    const video = $('video')[0];

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
    }

    // When error
    function handleError(error) {
      $('body').prepend('<div class="alert alert-danger" role="alert"><strong>Erreur</strong> La caméra est obligatoire. </div>');
    }
  }
)
