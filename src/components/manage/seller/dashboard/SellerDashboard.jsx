import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { useSelector } from '@/providers/store/store';
import { selectShop } from '@/providers/store/features/shop/shopSlice';
import { useGetSellerOrdersStatsQuery } from '@/providers/store/services/orders';
import { useGetProductsQuery } from '@/providers/store/services/products';
import { currencyFormatter } from '@/utils/formatting';
import DashboardCard from '@/components/manage/common/cards/DashboardCard';

const SellerDashboard = () => {
  const shop = useSelector(selectShop);

  const { data: ordersStatsData } = useGetSellerOrdersStatsQuery();
  const { data: productsData } = useGetProductsQuery(
    {
      page: 1,
      perPage: 1,
      shop: shop?._id,
    },
    { skip: !shop?._id }
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 4,
        margin: 2,
        borderRadius: 2,
        background: 'linear-gradient(to right, #ece9e6, #ffffff)',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          textAlign: 'center',
          marginBottom: 4,
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Dashboard Overview
      </Typography>
      <Grid container={true} spacing={3} columns={{ xs: 1, md: 6, lg: 12 }}>
        <DashboardCard
          label='Total Sales'
          value={currencyFormatter(ordersStatsData?.totalPrice)}
          valueColor='#1976d2'
          size={{ xs: 1, md: 3, lg: 3 }}
        />

        <DashboardCard
          label='All Products'
          value={productsData?.totalCount}
          valueColor='#43a047'
          size={{ xs: 1, md: 3, lg: 3 }}
        />

        <DashboardCard
          label='All Orders'
          value={ordersStatsData?.totalOrders}
          valueColor='#f57c00'
          size={{ xs: 1, md: 3, lg: 3 }}
        />

        <DashboardCard
          label='Pending Orders'
          value={ordersStatsData?.pendingOrders}
          valueColor='#59213c'
          size={{ xs: 1, md: 3, lg: 3 }}
        />
      </Grid>
    </Paper>
  );
};

export default SellerDashboard;
