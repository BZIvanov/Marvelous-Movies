import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import SelectDropdownAdapter from '@/providers/form/formFields/SelectDropdownAdapter';
import SelectDropdownMultichipAdapter from '@/providers/form/formFields/SelectDropdownMultichipAdapter';
import ImagesFieldAdapter from '@/providers/form/formFields/ImagesFieldAdapter';
import PreviewNewImageAvatar from '@/components/common/imagePreview/PreviewNewImageAvatar';
import PreviewExistingImageAvatar from '@/components/common/imagePreview/PreviewExistingImageAvatar';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';

const ProductForm = ({
  form,
  productId,
  createProduct,
  categories = [],
  categorySubcategories = [],
  newImages,
  setNewImages,
  existingImages,
  setExistingImages,
}) => {
  const selectedFormImages = form.watch('images');
  useEffect(() => {
    setNewImages(selectedFormImages);
  }, [selectedFormImages, setNewImages]);

  const isLoading = useIsApiRequestPending();

  const handleProductSubmit = async (values) => {
    createProduct(values);
  };

  const removeNewImage = (imageName) => {
    form.setValue(
      'images',
      newImages.filter((previewImage) => previewImage.name !== imageName)
    );
  };

  const removeExistingImage = (imageId) => {
    const filteredImages = existingImages.filter((existingImage) => {
      return existingImage.publicId !== imageId;
    });
    setExistingImages(filteredImages);
  };

  return (
    <Box sx={{ width: '99%' }}>
      <FormProvider onSubmit={handleProductSubmit} methods={form}>
        <TextFieldAdapter name='title' label='Title' />
        <TextFieldAdapter name='description' label='Description' />
        <TextFieldAdapter name='price' label='Price' type='number' />
        <SelectDropdownAdapter
          name='shipping'
          label='Shipping'
          options={['Yes', 'No']}
        />
        <TextFieldAdapter name='quantity' label='Quantity' type='number' />
        <TextFieldAdapter name='color' label='Color' />
        <TextFieldAdapter name='brand' label='Brand' />
        <SelectDropdownAdapter
          name='category'
          label='Category'
          options={categories}
          extendedOnChange={() => {
            // reset subcategories whenever category is changed
            form.setValue('subcategories', []);
          }}
        />
        <SelectDropdownMultichipAdapter
          name='subcategories'
          label='Subcategory'
          options={categorySubcategories}
        />

        <Divider sx={{ margin: '8px 0' }} />

        <ImagesFieldAdapter name='images' />

        <Stack sx={{ marginTop: 3 }} spacing={2} direction='row'>
          {/* Newly uploaded images */}
          {newImages.map((previewImage) => {
            return (
              <PreviewNewImageAvatar
                key={previewImage.path}
                image={previewImage}
                handleRemoveImage={removeNewImage}
              />
            );
          })}
          {/* Previosuly uploaded images, when editing a product */}
          {existingImages.map((previewImage) => {
            return (
              <PreviewExistingImageAvatar
                key={previewImage.publicId}
                image={previewImage}
                handleRemoveImage={removeExistingImage}
              />
            );
          })}
        </Stack>

        <Box mt={2} ml={1}>
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={() => {
              form.reset();
            }}
            disabled={isLoading}
          >
            Reset Form
          </Button>
          <Button
            sx={{ marginLeft: '5px' }}
            variant='contained'
            type='submit'
            disabled={isLoading}
          >
            {productId ? 'Update Product' : 'Create Product'}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

ProductForm.propTypes = {
  form: PropTypes.object,
  productId: PropTypes.string,
  createProduct: PropTypes.func,
  categories: PropTypes.array,
  categorySubcategories: PropTypes.array,
  newImages: PropTypes.array,
  setNewImages: PropTypes.func,
  existingImages: PropTypes.array,
  setExistingImages: PropTypes.func,
};

export default ProductForm;
