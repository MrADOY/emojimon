/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;
const IMAGE_CHANNELS = 3;
const outShape = [1, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS];

var video,
stopped = false;

$(() => {
  $('.video .cam_hidden').hide();
  $('.video .error').hide();
  video = $('.video .cam #video')[0];

});

function startLoop(){
  window.video.play()
}

function stopLoop(){
  stopped = true;
  window.video.pause();
  setTimeout(() => {stopped = false; }, 5000);
  setTimeout(() => {startLoop();}, 4000);
}

function screenshot() {
  stopLoop();
}

// Captures a frame from the webcam and convert it to tensor.
function capture() {
  return tf.tidy(() => {
    //Crop the image to have a 100x100 square which is the center of the camera
    let tensor3d = tf.browser.fromPixels(video);
    let center_height = tensor3d.shape[0]/2;
    let begin_height = center_height - (IMAGE_HEIGHT/2);
    let center_width = tensor3d.shape[1]/2;
    let begin_width = center_width - (IMAGE_WIDTH/2);
    let tensor3d_cropped = tensor3d.slice([begin_height, begin_width, 0], [IMAGE_HEIGHT, IMAGE_WIDTH, 3]);

    return tf.tensor4d(tensor3d_cropped.dataSync(), outShape, "int32");
  });
}
