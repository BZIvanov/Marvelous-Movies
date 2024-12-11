import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";

import FormProvider from "@/providers/form/FormProvider";
import TextFieldAdapter from "@/providers/form/formFields/TextFieldAdapter";
import SelectDropdownAdapter from "@/providers/form/formFields/SelectDropdownAdapter";
import SelectDropdownMultichipAdapter from "@/providers/form/formFields/SelectDropdownMultichipAdapter";
import ImagesFieldAdapter from "@/providers/form/formFields/ImagesFieldAdapter";
import PreviewImageAvatar from "@/components/common/imagePreview/PreviewImageAvatar";
import { useIsApiRequestPending } from "@/hooks/useIsApiRequestPending";
import { resizeImage } from "@/utils/resizeImage";

const ProductForm = ({
  form,
  createProduct,
  categories = [],
  categorySubcategories = [],
  buttonLabel,
}) => {
  const selectedFormImages = form.watch("images");

  const isLoading = useIsApiRequestPending();

  const removeImage = (imageToRemove) => {
    let filteredImages = [];

    // if the image has publicId, it is previosuly uploaded image, otherwise is newly uploaded file
    if (imageToRemove.publicId) {
      filteredImages = selectedFormImages.filter(
        (formImage) => formImage.publicId !== imageToRemove.publicId
      );
    } else {
      filteredImages = selectedFormImages.filter(
        (formImage) => formImage.name !== imageToRemove.name
      );
    }

    form.setValue("images", filteredImages);
  };

  const handleProductSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("discount", values.discount);
    formData.append("shipping", values.shipping);
    formData.append("quantity", values.quantity);
    formData.append("color", values.color);
    formData.append("brand", values.brand);
    formData.append("category", values.category);

    values.subcategories.forEach((subcategory) =>
      formData.append("subcategories", subcategory)
    );

    for (const image of values.images) {
      if (image instanceof File) {
        const resizedFile = await resizeImage(image, {
          maxWidth: 450,
          maxHeight: 450,
          compressFormat: "png",
          outputType: "file",
        });
        formData.append("newImages", resizedFile);
      } else {
        formData.append("existingImages", image.publicId);
      }
    }

    createProduct(formData);
  };

  return (
    <Box sx={{ width: "99%" }}>
      <FormProvider onSubmit={handleProductSubmit} methods={form}>
        <TextFieldAdapter name="title" label="Title" />
        <TextFieldAdapter name="description" label="Description" />
        <TextFieldAdapter name="price" label="Price" type="number" />
        <TextFieldAdapter name="discount" label="Discount" type="number" />
        <SelectDropdownAdapter
          name="shipping"
          label="Shipping"
          options={["Yes", "No"]}
        />
        <TextFieldAdapter name="quantity" label="Quantity" type="number" />
        <TextFieldAdapter name="color" label="Color" />
        <TextFieldAdapter name="brand" label="Brand" />
        <SelectDropdownAdapter
          name="category"
          label="Category"
          options={categories}
          extendedOnChange={() => {
            // reset subcategories whenever category is changed
            form.setValue("subcategories", []);
          }}
        />
        <SelectDropdownMultichipAdapter
          name="subcategories"
          label="Subcategory"
          options={categorySubcategories}
        />

        <Divider sx={{ margin: "8px 0" }} />

        <ImagesFieldAdapter
          name="images"
          maxFiles={10}
          keepPreviousUploads={true}
        />

        <Stack sx={{ marginTop: 3 }} spacing={2} direction="row">
          {selectedFormImages.map((formImage) => {
            return (
              <PreviewImageAvatar
                // for exisiting images we will have publicId, for newly uploaded files, we will use the path
                key={formImage.publicId || formImage.path}
                image={formImage}
                removeImage={removeImage}
              />
            );
          })}
        </Stack>

        <Box mt={2} ml={1}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => {
              form.reset();
            }}
            disabled={isLoading}
          >
            Reset Form
          </Button>
          <Button
            sx={{ marginLeft: "5px" }}
            variant="contained"
            type="submit"
            disabled={isLoading}
          >
            {buttonLabel}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

ProductForm.propTypes = {
  form: PropTypes.object,
  createProduct: PropTypes.func,
  categories: PropTypes.array,
  categorySubcategories: PropTypes.array,
  buttonLabel: PropTypes.string,
};

export default ProductForm;
