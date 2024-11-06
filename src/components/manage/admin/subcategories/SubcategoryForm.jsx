import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
} from '@/providers/store/services/subcategories';
import { useDispatch } from '@/providers/store/store';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import SelectDropdownAdapter from '@/providers/form/formFields/SelectDropdownAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';
import { formConfig } from './subcategoryForm.schema';

const SubcategoryForm = ({
  form,
  categories = [],
  selectedSubcategory,
  handleSelectSubcategory,
}) => {
  const dispatch = useDispatch();

  const [createSubcategory] = useCreateSubcategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();

  useEffect(() => {
    if (selectedSubcategory) {
      form.reset({
        categoryId: selectedSubcategory.categoryId,
        subcategoryName: selectedSubcategory.name,
      });
    }
  }, [form, selectedSubcategory]);

  const isLoading = useIsApiRequestPending();

  const handleSubcategorySubmit = async ({ categoryId, subcategoryName }) => {
    let result;
    if (selectedSubcategory) {
      result = await updateSubcategory({
        id: selectedSubcategory._id,
        name: subcategoryName,
        categoryId,
      });
    } else {
      result = await createSubcategory({ name: subcategoryName, categoryId });
    }

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Subcategory ${
            selectedSubcategory ? 'updated' : 'created'
          } successfully`,
        })
      );

      handleSelectSubcategory(null);

      form.reset(formConfig.defaultValues);
    }
  };

  return (
    <Box>
      <FormProvider onSubmit={handleSubcategorySubmit} methods={form}>
        <Box my={1}>
          <SelectDropdownAdapter
            name='categoryId'
            label='Category'
            options={categories}
          />
        </Box>

        <Box my={1}>
          <TextFieldAdapter name='subcategoryName' label='Subcategory name' />
        </Box>

        <Box mt={2} ml={1}>
          <Button
            variant='contained'
            color='secondary'
            type='button'
            onClick={() => {
              handleSelectSubcategory(null);
              form.reset(formConfig.defaultValues);
            }}
            disabled={form.formState.isSubmitting || isLoading}
          >
            Reset form
          </Button>
          <Button
            sx={{ marginLeft: '5px' }}
            variant='contained'
            type='submit'
            disabled={form.formState.isSubmitting || isLoading}
          >
            {selectedSubcategory ? 'Update subcategory' : 'Create subcategory'}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

SubcategoryForm.propTypes = {
  form: PropTypes.object,
  categories: PropTypes.array,
  selectedSubcategory: PropTypes.object,
  handleSelectSubcategory: PropTypes.func,
};

export default SubcategoryForm;
