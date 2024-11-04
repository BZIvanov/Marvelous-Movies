import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';

import { CloseOutlinedIcon } from '../../mui/Icons';

const PreviewImageAvatar = ({ image, handleRemoveImage }) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    let filePreviewUrl;

    if (image.imageUrl) {
      // for exisiting images, we will have string url
      setPreview(image.imageUrl);
    } else {
      // for newly uploaded file images we will create preview url
      filePreviewUrl = URL.createObjectURL(image);
      setPreview(filePreviewUrl);
    }

    return () => {
      if (filePreviewUrl) {
        URL.revokeObjectURL(filePreviewUrl);
      }
    };
  }, [image]);

  return (
    <Badge
      badgeContent={
        <CloseOutlinedIcon
          sx={{ cursor: 'pointer' }}
          htmlColor={'red'}
          onClick={() => {
            handleRemoveImage(image);
          }}
        />
      }
    >
      <Avatar
        alt='Product preview'
        src={preview}
        sx={{ width: 90, height: 90 }}
      />
    </Badge>
  );
};

PreviewImageAvatar.propTypes = {
  image: PropTypes.object,
  handleRemoveImage: PropTypes.func,
};

export default PreviewImageAvatar;
