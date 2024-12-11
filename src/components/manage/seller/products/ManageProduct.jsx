import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/providers/store/services/products";
import {
  useGetCategoriesQuery,
  useGetCategorySubcategoriesQuery,
} from "@/providers/store/services/categories";
import { useDispatch } from "@/providers/store/store";
import { showNotification } from "@/providers/store/features/notification/notificationSlice";
import { useForm } from "@/providers/form/hooks/useForm";
import { formConfig } from "./manageProductForm.schema";
import ProductForm from "./ProductForm";

const ManageProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if product id is found in the url, we are editing a product
  const { productId } = useParams();

  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const form = useForm(formConfig);

  const selectedCategoryId = form.watch("category");

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
      form.reset({
        title: product.title,
        description: product.description,
        price: product.price,
        discount: product.discount,
        shipping: product.shipping,
        quantity: product.quantity,
        color: product.color,
        brand: product.brand,
        category: product.category._id,
        subcategories: product.subcategories.map(
          (subcategory) => subcategory._id
        ),
        images: product.images,
      });
    }
  }, [form, productId, productData]);

  const handleCreateProduct = async (formData) => {
    let result;
    if (productId) {
      result = await updateProduct({ id: productId, formData });
    } else {
      result = await createProduct(formData);
    }

    if (!("error" in result)) {
      dispatch(
        showNotification({
          type: "success",
          message: `Product ${productId ? "updated" : "created"} successfully`,
        })
      );

      form.reset();
      navigate("/seller/products");
    }
  };

  return (
    <Box sx={{ padding: (theme) => theme.spacing(1) }}>
      <Typography variant="h5">Manage Product</Typography>

      <ProductForm
        form={form}
        createProduct={handleCreateProduct}
        categories={categoriesData?.categories}
        categorySubcategories={categorySubcategoriesData?.subcategories}
        buttonLabel={productId ? "Update Product" : "Create Product"}
      />
    </Box>
  );
};

export default ManageProduct;
