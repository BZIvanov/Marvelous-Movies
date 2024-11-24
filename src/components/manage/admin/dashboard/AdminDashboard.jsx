import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import { useGetBuyerOrdersStatsQuery } from '@/providers/store/services/orders';
import { useGetProductsQuery } from '@/providers/store/services/products';
import { useGetShopsQuery } from '@/providers/store/services/shops';
import { currencyFormatter } from '@/utils/formatting';
import DashboardCard from '@/components/manage/common/cards/DashboardCard';

const AdminDashboard = () => {
  const { data: ordersStatsData } = useGetBuyerOrdersStatsQuery();
  const { data: productsData } = useGetProductsQuery({ page: 1, perPage: 1 });
  const { data: shopsData } = useGetShopsQuery({ page: 1, perPage: 1 });

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
          label='Total Products'
          value={productsData?.totalCount}
          valueColor='#43a047'
          size={{ xs: 1, md: 3, lg: 3 }}
        />

        <DashboardCard
          label='Shops'
          value={shopsData?.totalCount}
          valueColor='#f57c00'
          size={{ xs: 1, md: 3, lg: 3 }}
        />

        <DashboardCard
          label='Orders'
          value={ordersStatsData?.totalOrders}
          valueColor='#59213c'
          size={{ xs: 1, md: 3, lg: 3 }}
        />
      </Grid>
    </Paper>
  );
};

export default AdminDashboard;
