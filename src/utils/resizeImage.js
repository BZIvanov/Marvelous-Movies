import Resizer from 'react-image-file-resizer';

export const resizeImage = (file, config = {}) => {
  const {
    maxWidth = 590,
    maxHeight = 590,
    compressFormat = 'jpeg',
    quality = 100,
    rotation = 0,
    outputType = 'base64',
  } = config;

  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      (uri) => {
        resolve(uri);
      },
      outputType
    );
  });
};
