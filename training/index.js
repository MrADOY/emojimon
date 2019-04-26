/*
@authors: Adrien Jablonski, Bryton Lacquement, Nicolas Jourdain
Marceau Hollertt, Aurelien Pietrzak.
*/

const fs = require('fs');
const path = require('path');
const tf = require('@tensorflow/tfjs-node');
const sharp = require("sharp");
const lab = require('./label.json');
const labelsList = lab.labels;
// Size of pictures
const IMAGE_WIDTH = 256;
const IMAGE_HEIGHT = 256;
// Corresponding to RGB values.
const IMAGE_CHANNELS = 3;
// Size of the batch
const BATCH_SIZE = 50;
// Number of epochs.
const EPOCHS = 30;
// Our last layer is a dense layer which has 14 output units, one for each
// output class (i.e. 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ... 14).
const NUM_OUTPUT_CLASSES = 14;
// Folder of the dataset.
const rootFolder = './dataset'
// Pictures of the dataset
var files = [];
// Corresponding of the inputs of the CNN.
var xs;
// Corresponding of the outpus of the CNN.
var labels = [];
// When we process images, we convert them to buffer.
let buffer = [];

// loop each dir to read all pictures in dataset.
fs.readdirSync(rootFolder).forEach(dirName => {
  // if it's a directory, procede.
  if(fs.lstatSync(path.join(rootFolder, dirName)).isDirectory()){
    fs.readdirSync(path.join(rootFolder, dirName)).forEach(picture => {
      if(fs.lstatSync(path.join(rootFolder, dirName, picture)).isFile()){
	// If lstatsync says it's a file and if it starts with "norm"
        if(picture.startsWith("norm")){
          labels.push(labelsList.indexOf(dirName));
          // Push a new promise to the array.
          files.push(new Promise((resolve, reject) => {
            readFile(path.join(rootFolder, dirName, picture)).then((img) => {
              buffer.push(img.data);
              resolve();
            }).catch((error) => {
              console.log(error); reject(error);
            });
          }));
	}
      }
    });
  }
});

// Resolve all promises.
Promise.all(files).then(() => {
  const outShape = [buffer.length, IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS];
  xs = tf.tidy(() => {
    // Tensor4D corresponding to an array of tensor3d. 
    var tensor = tf.tensor4d(Buffer.concat(buffer), outShape, "int32");
    // Normalize the tensor with values between 0 and 1.
    return tensor.div(tf.scalar(255));
  });

  // Create sequential model
  const model = tf.sequential();

  // In the first layer of out convolutional neural network we have
  // to specify the input shape. Then we specify some paramaters for
  // the convolution operation that takes place in this layer.
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));

  // The MaxPooling layer acts as a sort of downsampling using max values
  // in a region instead of averaging.
  model.add(tf.layers.maxPooling2d({strides: [2, 2]}));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 4,
    filters: 32,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({strides: [2, 2]}));

  // Repeat another conv2d + maxPooling stack.
  // Note that we have more filters in the convolution.
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 64,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({strides: [2, 2]}));

  // Now we flatten the output from the 2D filters into a 1D vector to prepare
  // it for input into our last layer. This is common practice when feeding
  // higher dimensional data to a final classification output layer.
  model.add(tf.layers.flatten());

  model.add(tf.layers.dense({
    units: NUM_OUTPUT_CLASSES,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  // Choose an optimizer, loss function and accuracy metric,
  // then compile and return the model
  const optimizer = tf.train.adam();
  model.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy'
  });

  // Display the current model.
  model.summary();

  let labelsTensor = tf.tensor1d(labels , 'int32');
  let ys = tf.oneHot(labelsTensor, NUM_OUTPUT_CLASSES);

  // Train the model with and the xs and ys.
  // xs are associate with the ys.
  model.fit(xs, ys, {
    batchSize: BATCH_SIZE,
    epochs: EPOCHS,
    shuffle: true,
  }).then((data) => {
    // Save the model when training is done.
    model.save('file://./model.json');
  });
}).catch((errors) => {
  console.log('one ore more errors occurred', errors);
});

// Read file and convert it to a buffer.
async function readFile(path) {
  return await sharp(path)
  .removeAlpha()
  .raw()
  .toBuffer({
    resolveWithObject: true
  });
}
