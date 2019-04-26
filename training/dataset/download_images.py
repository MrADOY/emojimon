import os
import json
from google_images_download import google_images_download

requests = {
    'computer-keyboard': ('keyboard', 'gaming keyboard', 'computer keyboard'),
    'computer-mouse': ('computer mouse', 'gaming mouse', 'mouse laptop'),
    'computer-monitor': ('monitor', 'computer monitor', 'computer monitor reviews'),
}

for dir, keywords in requests.items():
    # Download images
    for kw in keywords:
        response = google_images_download.googleimagesdownload()
        args = {
            'keywords': kw,
            'format': 'jpg',
            'output_directory': '.',
            'image_directory': dir,
            #'limit': 1,  # for debugging
        }
        response.download(args)

    # Rename files
    path = os.path.join('.', dir)
    for i, file in enumerate(os.listdir(path)):
        os.rename(os.path.join(path, file),
                  os.path.join(path, str(i) + '.jpg'))

# Save labels to json format
with open(os.path.join('..', 'label.json'), 'w') as f:
    d = {'labels': list(requests.keys())}
    f.write(json.dumps(d, indent=2, separators=(',', ': ')))
