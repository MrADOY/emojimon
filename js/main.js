/*

>> kasperkamperman.com - 2018-04-18
>> https://www.kasperkamperman.com/blog/camera-template/

*/

var takeSnapshotUI = createClickFeedbackUI();

var video;
var takePhotoButton;
var toggleFullScreenButton;
var switchCameraButton;
var amountOfCameras = 0;
var currentFacingMode = 'environment';

document.addEventListener("DOMContentLoaded", function(event) {

    // do some WebRTC checks before creating the interface
    DetectRTC.load(function() {

        // do some checks
        if (DetectRTC.isWebRTCSupported == false) {
            alert('Merci d\'utiliser Chrome, Firefox, iOS 11, Android 5+, Safari 11+');
        }
        else {
            if (DetectRTC.hasWebcam == false) {
                alert('Veuillez installer une webcam ou une caméra.');
            }
            else {

                amountOfCameras = DetectRTC.videoInputDevices.length;

                initCameraUI();
                initCameraStream();
            }
        }

        console.log("RTC Debug info: " +
        "\n OS:                   " + DetectRTC.osName + " " + DetectRTC.osVersion +
        "\n browser:              " + DetectRTC.browser.fullVersion + " " + DetectRTC.browser.name +
        "\n Webcam:           " + DetectRTC.hasWebcam +
        "\n Permission:       " + DetectRTC.isWebsiteHasWebcamPermission +
        "\n getUserMedia Support: " + DetectRTC.isGetUserMediaSupported +
        "\n isWebRTC Supported:   " + DetectRTC.isWebRTCSupported +
        "\n WebAudio Supported:   " + DetectRTC.isAudioContextSupported +
        "\n Mobile Device:     " + DetectRTC.isMobileDevice
    );

});

});

function initCameraUI() {

    video = document.getElementById('video');

    takePhotoButton = document.getElementById('takePhotoButton');
    toggleFullScreenButton = document.getElementById('toggleFullScreenButton');
    switchCameraButton = document.getElementById('switchCameraButton');

    // https://developer.mozilla.org/nl/docs/Web/HTML/Element/button
    // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role

    takePhotoButton.addEventListener("click", function() {
        takeSnapshotUI();
        takeSnapshot();
    });

    // -- fullscreen part

    function fullScreenChange() {
        if(screenfull.isFullscreen) {
            toggleFullScreenButton.setAttribute("aria-pressed", true);
        }
        else {
            toggleFullScreenButton.setAttribute("aria-pressed", false);
        }
    }

    if (screenfull.enabled) {
        screenfull.on('change', fullScreenChange);

        toggleFullScreenButton.style.display = 'block';

        // set init values
        fullScreenChange();

        toggleFullScreenButton.addEventListener("click", function() {
            screenfull.toggle(document.getElementById('container'));
        });
    }
    else {
        console.log("iOS doesn't support fullscreen (yet)");
    }

    // -- switch camera part
    if(amountOfCameras > 1) {

        switchCameraButton.style.display = 'block';

        switchCameraButton.addEventListener("click", function() {

            if(currentFacingMode === 'environment') currentFacingMode = 'user';
            else                                    currentFacingMode = 'environment';

            initCameraStream();

        });
    }

    // Listen for orientation changes to make sure buttons stay at the side of the
    // physical (and virtual) buttons (opposite of camera) most of the layout change is done by CSS media queries
    // https://www.sitepoint.com/introducing-screen-orientation-api/
    // https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation
    window.addEventListener("orientationchange", function() {

        // iOS doesn't have screen.orientation, so fallback to window.orientation.
        // screen.orientation will
        if(screen.orientation) angle = screen.orientation.angle;
        else                   angle = window.orientation;

        var guiControls = document.getElementById("gui_controls").classList;
        var vidContainer = document.getElementById("vid_container").classList;

        if(angle == 270 || angle == -90) {
            guiControls.add('left');
            vidContainer.add('left');
        }
        else {
            if ( guiControls.contains('left') ) guiControls.remove('left');
            if ( vidContainer.contains('left') ) vidContainer.remove('left');
        }

        //0   portrait-primary
        //180 portrait-secondary device is down under
        //90  landscape-primary  buttons at the right
        //270 landscape-secondary buttons at the left
    }, false);

}

// https://github.com/webrtc/samples/blob/gh-pages/src/content/devices/input-output/js/main.js
function initCameraStream() {

    // stop any active streams in the window
    if (window.stream) {
        window.stream.getTracks().forEach(function(track) {
            track.stop();
        });
    }

    var constraints = {
        audio: false,
        video: {
            //width: { min: 1024, ideal: window.innerWidth, max: 1920 },
            //height: { min: 776, ideal: window.innerHeight, max: 1080 },
            facingMode: currentFacingMode
        }
    };

    navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);

    function handleSuccess(stream) {

        window.stream = stream; // make stream available to browser console
        video.srcObject = stream;

        if(constraints.video.facingMode) {

            if(constraints.video.facingMode === 'environment') {
                switchCameraButton.setAttribute("aria-pressed", true);
            }
            else {
                switchCameraButton.setAttribute("aria-pressed", false);
            }
        }

        window.camLoaded = true;
        if (!window.isPredicting) {
            predict();
        }
        return navigator.mediaDevices.enumerateDevices();
    }

    function handleError(error) {
        //https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
          //log to console first
          console.log(error); /* handle the error */
          if (error.name == "NotFoundError" || error.name == "DevicesNotFoundError") {
              //required track is missing
              alert("Aucune caméra n'a été trouvée.");
          } else if (error.name == "NotReadableError" || error.name == "TrackStartError") {
              //webcam or mic are already in use
              alert("Votre caméra est déjà en cours d'utilisation par un autre programme.");
          } else if (error.name == "OverconstrainedError" || error.name == "ConstraintNotSatisfiedError") {
              //constraints can not be satisfied by avb. devices
              alert("Les contraintes demandées par l'application ne peuvent être satisfaites par votre caméra.");
          } else if (error.name == "NotAllowedError" || error.name == "PermissionDeniedError") {
            //permission denied in browser
            alert("Permission non accordée. Merci de rafraichir la page et de donner les permissions nécessaires.");
        } else if (error.name == "TypeError" || error.name == "AbortError") {
              //empty constraints object
              alert("Les contraintes demandées par l'application ne peuvent être satisfaites par votre caméra.");
          } else {
              //other errors
          }

    }
}

function takeSnapshot() {

    // if you'd like to show the canvas add it to the DOM
    var canvas = document.getElementById("video_overlay");

    var width = video.videoWidth;
    var height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, width, height);
    $('#video_overlay').show();

    // polyfil if needed https://github.com/blueimp/JavaScript-Canvas-to-Blob

    // https://developers.google.com/web/fundamentals/primers/promises
    // https://stackoverflow.com/questions/42458849/access-blob-value-outside-of-canvas-toblob-async-function
    function getCanvasBlob(canvas) {
        return new Promise(function(resolve, reject) {
            canvas.toBlob(function(blob) { resolve(blob) }, 'image/jpeg');
        })
    }

    // some API's (like Azure Custom Vision) need a blob with image data
    getCanvasBlob(canvas).then(function(blob) {

        // do something with the image blob

    });

}

// https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b
// closure; store this in a variable and call the variable as function
// eg. var takeSnapshotUI = createClickFeedbackUI();
// takeSnapshotUI();

function createClickFeedbackUI() {

    // in order to give feedback that we actually pressed a button.
    // we trigger a almost black overlay
    var overlay = document.getElementById("video_overlay");//.style.display;

    // sound feedback
    // var sndClick = new Howl({ src: ['snd/click.mp3'] });

    var overlayVisibility = false;
    var timeOut = 1000;

    function setFalseAgain() {
        if (!overlay) {
            var overlay = document.getElementById("video_overlay");//.style.display;
        }
        overlayVisibility = false;
        overlay.style.display = 'none';
    }

    return function() {
        takepicture();
        if (!overlay) {
            var overlay = document.getElementById("video_overlay");//.style.display;
        }
        if(overlayVisibility == false) {
            // sndClick.play();
            overlayVisibility = true;
            overlay.style.display = 'block';
            setTimeout(setFalseAgain, timeOut);
        }
    }
}

function takepicture() {
    var canvas = document.querySelector('#video_overlay');
    var photo = document.querySelector('#photo');
    canvas.width = 320;
    canvas.height = 320;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}
