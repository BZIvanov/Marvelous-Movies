import { useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

import { useSelector } from '@/providers/store/store';
import { selectUser } from '@/providers/store/features/user/userSlice';
import {
  useGetProductQuery,
  useGetSimilarProductsQuery,
} from '@/providers/store/services/products';
import {
  useGetMyProductReviewQuery,
  useReviewProductMutation,
} from '@/providers/store/services/reviews';
import { useDispatch } from '@/providers/store/store';
import {
  addToCart,
  setDrawerOpen,
} from '@/providers/store/features/cart/cartSlice';
import { useAddToWishlistMutation } from '@/providers/store/services/wishlists';
import { showNotification } from '@/providers/store/features/notification/notificationSlice';
import { currencyFormatter, percentFormatter } from '@/utils/formatting';
import ProductRating from '../ProductRating';
import ProductsList from '../ProductsList';
import ImagesCarousel from '@/components/common/imagePreview/carousel/ImagesCarousel';
import InfoTextListItem from './InfoTextListItem';
import InfoChipsListItem from './InfoChipsListItem';
import InfoTabs from './InfoTabs';
import AddToCart from '../actions/AddToCart';
import AddToWishlist from '../actions/AddToWishlist';
import RateProduct from '../actions/RateProduct';
import ChatWithSeller from '../actions/ChatWithSeller';

const ProductDetailed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const { productId } = useParams();

  const { data: productData } = useGetProductQuery(productId);
  const product = productData?.product;
  const { data: similarProductsData } = useGetSimilarProductsQuery(productId);
  const { data: myReviewData } = useGetMyProductReviewQuery(productId, {
    skip: !user || user.role !== 'buyer',
  });

  const [reviewProduct] = useReviewProductMutation();
  const [addToWishlist] = useAddToWishlistMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, count: 1 }));
    dispatch(setDrawerOpen(true));
  };

  const handleAddToWishlist = async () => {
    const result = await addToWishlist(product._id);

    if ('error' in result) {
      navigate('/buyer/wishlist');
    } else {
      dispatch(
        showNotification({ type: 'success', message: 'Added to the wishlist' })
      );
    }
  };

  const handleRateProduct = async (rating) => {
    const result = await reviewProduct({ id: product._id, rating });

    if (!('error' in result)) {
      dispatch(
        showNotification({
          type: 'success',
          message: `Successfully rated with rating of ${rating} stars`,
        })
      );
    }
  };

  const discountedPrice =
    product?.price - (product?.price * product?.discount) / 100;

  return (
    <>
      {product && (
        <Grid container={true} sx={{ padding: 2 }}>
          <Grid
            item={true}
            sm={12}
            md={6}
            sx={{ '& .slide img': { maxHeight: '390px', objectFit: 'cover' } }}
          >
            <ImagesCarousel images={product.images} />
          </Grid>

          <Grid item={true} xs={12} sm={12} md={6} sx={{ paddingLeft: 1 }}>
            <Typography
              gutterBottom={true}
              variant='h5'
              sx={{
                color: (theme) => theme.palette.common.white,
                backgroundColor: (theme) => theme.palette.primary.main,
                padding: 1,
              }}
            >
              {product.title}
            </Typography>

            <ProductRating
              rating={product.averageRating}
              reviews={product.reviewCount}
            />

            <Card sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <CardContent>
                <InfoTextListItem itemKey='Price'>
                  <Box display='flex' gap={3} alignItems='center'>
                    {product?.discount !== 0 ? (
                      <Typography variant='h6' color='error' fontWeight='bold'>
                        <Typography
                          component='span'
                          sx={{
                            textDecoration: 'line-through',
                            marginRight: 1,
                          }}
                        >
                          {currencyFormatter(product?.price)}
                        </Typography>
                        {currencyFormatter(discountedPrice)} (-
                        {percentFormatter(product.discount / 100)})
                      </Typography>
                    ) : (
                      <Typography variant='h6' color='error' fontWeight='bold'>
                        {currencyFormatter(product?.price)}
                      </Typography>
                    )}
                  </Box>
                </InfoTextListItem>
                <InfoChipsListItem
                  linkType='category'
                  itemKey='Category'
                  itemValues={product.category}
                />
                <InfoChipsListItem
                  linkType='subcategory'
                  itemKey='Subcategories'
                  itemValues={product.subcategories}
                />
                <InfoTextListItem itemKey='Shipping'>
                  <Typography variant='body1'>{product.shipping}</Typography>
                </InfoTextListItem>
                <InfoTextListItem itemKey='Color'>
                  <Typography variant='body1'>{product.color}</Typography>
                </InfoTextListItem>
                <InfoTextListItem itemKey='Brand'>
                  <Typography variant='body1'>{product.brand}</Typography>
                </InfoTextListItem>
                <InfoTextListItem itemKey='Quantity'>
                  <Typography variant='body1'>{product.quantity}</Typography>
                </InfoTextListItem>
                <InfoTextListItem itemKey='Sold' itemValue={product.sold}>
                  <Typography variant='body1'>{product.sold}</Typography>
                </InfoTextListItem>
                <InfoTextListItem itemKey='Shop'>
                  <Typography variant='body1'>
                    {product.shop.shopInfo?.name || ''}
                  </Typography>
                </InfoTextListItem>
              </CardContent>

              {user && user.role === 'buyer' && (
                <CardActions>
                  <AddToCart
                    productId={product._id}
                    productQuantity={product.quantity}
                    onAddToCart={handleAddToCart}
                  />
                  <AddToWishlist
                    productId={product._id}
                    onAddToWishlist={handleAddToWishlist}
                  />
                  <RateProduct
                    productId={product._id}
                    onRateProduct={handleRateProduct}
                    review={myReviewData?.review}
                  />
                  <ChatWithSeller
                    productId={product._id}
                    shopSellerId={product?.shop?.user}
                  />
                </CardActions>
              )}
            </Card>
          </Grid>

          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <Divider />
          </Box>

          <Grid item={true} xs={12}>
            <InfoTabs
              productId={product._id}
              description={product.description}
            />
          </Grid>

          <Box sx={{ width: '100%', marginBlock: 3 }}>
            <Divider />
          </Box>

          <Grid item={true} xs={12}>
            <ProductsList
              header='Similar Products'
              products={similarProductsData?.products}
              showPagination={false}
              totalCount={similarProductsData?.totalCount}
            />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ProductDetailed;
