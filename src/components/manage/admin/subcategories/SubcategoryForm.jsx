import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import FormProvider from '@/providers/form/FormProvider';
import TextFieldAdapter from '@/providers/form/formFields/TextFieldAdapter';
import SelectDropdownAdapter from '@/providers/form/formFields/SelectDropdownAdapter';
import { useIsApiRequestPending } from '@/hooks/useIsApiRequestPending';

const SubcategoryForm = ({
  form,
  categories = [],
  createSubcategory,
  resetForm,
  buttonLabel,
}) => {
  const isLoading = useIsApiRequestPending();

  const handleSubcategorySubmit = (values) => {
    createSubcategory(values);
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
            onClick={resetForm}
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
            {buttonLabel}
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

SubcategoryForm.propTypes = {
  form: PropTypes.object,
  categories: PropTypes.array,
  createSubcategory: PropTypes.func,
  resetForm: PropTypes.func,
  buttonLabel: PropTypes.string,
};

export default SubcategoryForm;
