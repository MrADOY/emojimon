import os
from google_images_download import google_images_download

requests = {
    'keyboard': ('keyboard', 'gaming keyboard', 'computer keyboard')
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
