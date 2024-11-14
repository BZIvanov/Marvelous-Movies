import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from '@/providers/store/store';
import { selectShop } from '@/providers/store/features/shop/shopSlice';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { useUpdateSellerShopInfoMutation } from '@/providers/store/services/shops';
import { useForm } from '@/providers/form/hooks/useForm';
import { formConfig } from './shopForm.schema';
import ShopInfoForm from './ShopInfoForm';

const ShopInfo = () => {
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [updateShopInfo] = useUpdateSellerShopInfoMutation();

  const shop = useSelector(selectShop);

  const form = useForm(formConfig);

  const resetForm = () => {
    form.reset();
    setIsEditing(false);
  };

  const handleUpdateShop = async (values) => {
    const result = await updateShopInfo(values);

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: 'Shop info updated',
        })
      );

      resetForm();
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Card>
        <CardContent>
          <Typography variant='h5' gutterBottom>
            Seller Shop Information
          </Typography>

          {shop?.shopInfo && !isEditing ? (
            <Box sx={{ mt: 2 }}>
              <Typography variant='subtitle1'>
                Shop Name: {shop.shopInfo.name}
              </Typography>
              <Typography variant='subtitle1'>
                Country: {shop.shopInfo.country || 'N/A'}
              </Typography>
              <Typography variant='subtitle1'>
                City: {shop.shopInfo.city || 'N/A'}
              </Typography>
              <Button
                sx={{ mt: 2 }}
                variant='contained'
                onClick={() => {
                  setIsEditing(true);

                  form.reset({
                    shopName: shop.shopInfo.name,
                    country: shop.shopInfo.country || '',
                    city: shop.shopInfo.city || '',
                  });
                }}
              >
                Edit Shop Info
              </Button>
            </Box>
          ) : (
            <ShopInfoForm
              form={form}
              resetForm={resetForm}
              updateShopInfo={handleUpdateShop}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ShopInfo;
