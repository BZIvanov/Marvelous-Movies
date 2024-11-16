import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/providers/store/services/products';
import { useUploadImageMutation } from '@/providers/store/services/images';
import {
  useGetCategoriesQuery,
  useGetCategorySubcategoriesQuery,
} from '@/providers/store/services/categories';
import { useDispatch } from '@/providers/store/store';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useForm } from '@/providers/form/hooks/useForm';
import { resizeImage } from '@/utils/resizeImage';
import { formConfig } from './manageProductForm.schema';
import ProductForm from './ProductForm';

const ManageProduct = () => {
  const dispatch = useDispatch();

  // if product id is found in the url, we are editing a product
  const { productId } = useParams();

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // we will have these, when editing a product

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [uploadImage] = useUploadImageMutation();

  const form = useForm(formConfig);

  const selectedCategoryId = form.watch('category');

  const { data: categoriesData } = useGetCategoriesQuery();
  const { data: categorySubcategoriesData } = useGetCategorySubcategoriesQuery(
    selectedCategoryId,
    { skip: !selectedCategoryId }
  );
  const { data: productData } = useGetProductQuery(productId, {
    skip: !productId,
  });

  useEffect(() => {
    const product = productData?.product;

    if (productId && product) {
      form.setValue('title', product.title);
      form.setValue('description', product.description);
      form.setValue('price', product.price);
      form.setValue('shipping', product.shipping);
      form.setValue('quantity', product.quantity);
      form.setValue('color', product.color);
      form.setValue('brand', product.brand);
      form.setValue('category', product.category._id);
      form.setValue(
        'subcategories',
        product.subcategories.map((subcategory) => subcategory._id)
      );
      setExistingImages(product.images);
    }

    return () => {
      form.reset();
    };
  }, [form, productId, productData]);

  const handleCreateProduct = async (values) => {
    const formImages = [...values.images];

    const resizedImageFiles = await Promise.all(
      formImages.map((image) => resizeImage(image))
    );
    const imagePromises = resizedImageFiles.map((image) => {
      return uploadImage({ image });
    });
    const uploadedImagesData = await Promise.allSettled(imagePromises);
    // replace the values images with the response for each uploaded image, which is what will be stored in the database
    const uploadedImages = uploadedImagesData
      .filter((uploadedImage) => {
        return uploadedImage.status === 'fulfilled';
      })
      .map((uploadedImage) => {
        return {
          publicId: uploadedImage.value.data.publicId,
          imageUrl: uploadedImage.value.data.imageUrl,
        };
      });

    let result;
    if (productId) {
      // concat the previous images with the new uploads, because when editing we can upload even more images
      const allImages = uploadedImages.concat(existingImages);

      result = await updateProduct({
        id: productId,
        ...values,
        images: allImages,
      });
    } else {
      result = await createProduct({ ...values, images: uploadedImages });
    }

    if (!('error' in result)) {
      form.reset();
      setNewImages([]);
      setExistingImages([]);

      dispatch(
        showNotification({
          type: 'success',
          message: `Product ${productId ? 'updated' : 'created'} successfully`,
        })
      );
    }
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant='h5'>Manage Product</Typography>

      <ProductForm
        form={form}
        productId={productId}
        createProduct={handleCreateProduct}
        categories={categoriesData?.categories}
        categorySubcategories={categorySubcategoriesData?.subcategories}
        newImages={newImages}
        setNewImages={setNewImages}
        existingImages={existingImages}
        setExistingImages={setExistingImages}
      />
    </Box>
  );
};

export default ManageProduct;
