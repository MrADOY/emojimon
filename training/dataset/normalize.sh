#!/usr/bin/env bash

size="100x100"

for dir in $(ls -d */); do
  echo 'Entering' $dir
  cd $dir

  echo -e "Removing normalized images from previous iteration (if any)... \c"
  rm -f normalized-*.jpg
  echo "Done."

  for file in $(ls *.jpg); do
    echo -e "Normalizing $file... \c"
    convert $file -resize $size\! -gravity center -extent $size "normalized-$file"
    echo "Done."
  done

  cd ..
  echo 'Leaving' $dir
  echo "Success"
done
