import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import ShopLayout from '@/components/layouts/ShopLayout';
import ManagementLayout from '@/components/layouts/ManagementLayout';
import Home from '@/components/home/Home';
import Shop from '@/components/shop/Shop';
import CartProducts from '@/components/cart/products/CartProducts';
import RegisterForm from '@/components/user/auth/register/RegisterForm';
import LoginForm from '@/components/user/auth/login/LoginForm';
import PasswordResetForm from '@/components/user/auth/PasswordResetForm';
import UserProfile from '@/components/manage/common/profile/UserProfile';
import AdminOrdersList from '@/components/manage/admin/orders/AdminOrdersList';
import ManageCategory from '@/components/manage/admin/categories/ManageCategory';
import ManageSubcategory from '@/components/manage/admin/subcategories/ManageSubcategory';
import ManageCoupon from '@/components/manage/admin/coupons/ManageCoupon';
import SellerOrdersList from '@/components/manage/seller/orders/SellerOrdersList';
import ManageShop from '@/components/manage/seller/shop/ManageShop';
import ManageProduct from '@/components/manage/seller/products/ManageProduct';
import ManageProducts from '@/components/manage/seller/products/ManageProducts';
import BuyerOrdersList from '@/components/manage/buyer/orders/BuyerOrdersList';
import ManageWishList from '@/components/manage/buyer/wishlist/ManageWishList';
import ProductDetailed from '@/components/product/detailed/ProductDetailed';
import CategoryProducts from '@/components/category/CategoryProducts';
import SubcategoryProducts from '@/components/subcategory/SubcategoryProducts';
import Checkout from '@/components/checkout/Checkout';
import NonUserRoute from './auth/NonUserRoute';
import ProtectedRoute from './auth/ProtectedRoute';
import ShopStatus from './auth/ShopStatus';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '',
        element: <ShopLayout />,
        children: [{ path: '', element: <Home /> }],
      },
      {
        path: 'shop',
        element: <ShopLayout />,
        children: [{ path: '', element: <Shop /> }],
      },
      {
        path: 'cart',
        element: <ShopLayout />,
        children: [{ path: '', element: <CartProducts /> }],
      },
      {
        path: 'auth',
        element: (
          <NonUserRoute>
            <ShopLayout />
          </NonUserRoute>
        ),
        children: [
          {
            path: '',
            element: <Navigate to='login' replace={true} />, // Default redirect to /auth/login
          },
          {
            path: 'register',
            element: <RegisterForm />,
          },
          {
            path: 'login',
            element: <LoginForm />,
          },
          {
            path: 'reset-password/:token',
            element: <PasswordResetForm />,
          },
        ],
      },
      {
        path: 'admin',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['admin']}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'orders',
            element: <AdminOrdersList />,
          },
          {
            path: 'category',
            element: <ManageCategory />,
          },
          {
            path: 'subcategory',
            element: <ManageSubcategory />,
          },
          {
            path: 'coupon',
            element: <ManageCoupon />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
        ],
      },
      {
        path: 'seller',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['seller']}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'orders',
            element: <SellerOrdersList />,
          },
          {
            path: 'shop',
            element: <ManageShop />,
          },
          {
            path: 'product',
            element: (
              <ShopStatus
                statusRedirectTo='/seller/shop'
                activityStatuses={['active']}
                paymentStatuses={['paid']}
              >
                <ManageProduct />
              </ShopStatus>
            ),
          },
          {
            path: 'product/:productId',
            element: (
              <ShopStatus
                statusRedirectTo='/seller/shop'
                activityStatuses={['active']}
                paymentStatuses={['paid']}
              >
                <ManageProduct />
              </ShopStatus>
            ),
          },
          {
            path: 'products',
            element: <ManageProducts />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
        ],
      },
      {
        path: 'buyer',
        element: (
          <ProtectedRoute
            authRedirectTo='/auth/login'
            roleRedirectTo='/'
            roles={['buyer']}
          >
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'orders',
            element: <BuyerOrdersList />,
          },
          {
            path: 'wishlist',
            element: <ManageWishList />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
        ],
      },
      {
        path: 'product/:productId',
        element: <ShopLayout />,
        children: [{ path: '', element: <ProductDetailed /> }],
      },
      {
        path: 'category/:categoryId',
        element: <ShopLayout />,
        children: [{ path: '', element: <CategoryProducts /> }],
      },
      {
        path: 'subcategory/:subcategoryId',
        element: <ShopLayout />,
        children: [{ path: '', element: <SubcategoryProducts /> }],
      },
      {
        path: 'checkout',
        element: <ShopLayout />,
        children: [
          {
            path: '',
            element: (
              <ProtectedRoute authRedirectTo='/auth/login'>
                <Checkout />
              </ProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
