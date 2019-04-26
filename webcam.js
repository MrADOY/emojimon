/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;
const IMAGE_CHANNELS = 3;
const outShape = [1, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS];

var rotation = 0,
loopFrame,
centerX,
centerY;

$(() => {
  $('.video .cam_hidden').hide();
  $('.video .error').hide();

  var canvas = $('#canvas')[0];
  var ctx = $('#canvas')[0].getContext('2d');
  const video = $('.video .cam video')[0];
  const video_hidden = $('.video .cam_hidden video')[0];

  const constraints = {
    audio: false,
    video: {
      width: 256,
      height: 256,
      facingMode: "environment"
    }
  };

  video_hidden.addEventListener('loadedmetadata',function(){
    width = canvas.width = video_hidden.videoWidth;
    height = canvas.height = video_hidden.videoHeight;
    centerX = width / 2;
    centerY = height / 2;
    startLoop();
  });

  // Get access to webcam
  navigator.getUserMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
      navigator.getUserMedia(constraints,handleSuccess,handleError);
    }

    // Stream the video.
    function handleSuccess(stream) {
      video.srcObject = stream;
      video_hidden.srcObject = stream;
    }

    // When error
    function handleError(error) {
      console.error(error);
      $('.video .error').prepend('<div class="alert alert-danger" role="alert"><strong>Erreur</strong> La caméra est obligatoire. </div>');
      $('.video .error').show('slow');
    }

    function loop(){
      loopFrame = requestAnimationFrame(loop);
      ctx.save();
      draw(video_hidden, canvas, ctx, 30);
      ctx.restore();
    }

    function draw(video, canvas, context, frameRate) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setTimeout(draw, 1/frameRate, video, canvas, context, frameRate);
    }

    function startLoop(){
      loopFrame = loopFrame || requestAnimationFrame(loop);
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
