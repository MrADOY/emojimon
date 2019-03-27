let isPredicting = true;

function getModel() {

// Config
const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;
const IMAGE_CHANNELS = 3;

const model = tf.sequential();

// The first layer in a CNN is always a Convolutional Layer. We have
// to specify the input shape. Then we specify some paramaters for
// the convolution operation that takes place in this layer.
model.add(tf.layers.conv2d({
  inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  kernelSize: 8,
  filters: 8,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
}));

// The MaxPooling layer acts as a sort of downsampling using max values
// in a region instead of averaging.
model.add(tf.layers.maxPooling2d({
    poolSize: 8,
    strides: 1
  }
));

// Repeat another conv2d + maxPooling stack.
// Note that we have more filters in the convolution.
model.add(tf.layers.conv2d({
  kernelSize: 5,
  filters: 16,
  strides: 1,
  activation: 'relu',
  kernelInitializer: 'varianceScaling'
  }));

model.add(tf.layers.maxPooling2d({
      poolSize: 8,
      strides: 1
    }
));

// Now we flatten the output from the 2D filters into a 1D vector to prepare
// it for input into our last layer. This is common practice when feeding
// higher dimensional data to a final classification output layer.
model.add(tf.layers.flatten());

// Our last layer is a dense layer which has 52 output units, one for each
// output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ... 52).
const NUM_OUTPUT_CLASSES = 52;
model.add(tf.layers.dense({
  units: NUM_OUTPUT_CLASSES,
  kernelInitializer: 'varianceScaling',
  activation: 'softmax'
}));

model.compile({
  optimizer: 'sgd',
  loss: 'categoricalCrossentropy'
});

return model;
}

function trainModel(model){
  let config = {
    epochs : 10
  };
  model.fit(xs, ys, config).then(results => {
    console.log(results.history.loss);
  });
}

function xs(){
  // TODO load pictures
  // had to be tensors
  let xs = [];
  return xs;
}
function ys(){
  // output
  // had to be tensors
  let ys = [];
  return ys;
}


// Predict function
async function predict(){
  console.log("Creating the model...");
  getModel();
  console.log("Trainning the model...");
  trainModel();
  while (isPredicting) {
    tf.tidy(() => {
      // Capture the frame from the webcam.
      const img = capture();
      console.log(img);
    });
    await tf.nextFrame();
  }
}
