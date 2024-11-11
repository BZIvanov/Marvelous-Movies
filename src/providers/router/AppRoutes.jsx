import { createBrowserRouter, Navigate } from 'react-router-dom';

import App from '@/App';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import ProtectedRoute from '@/components/user/route/ProtectedRoute';
import ShopLayout from '@/components/layouts/ShopLayout';
import ManagementLayout from '@/components/layouts/ManagementLayout';
import Home from '@/components/home/Home';
import Shop from '@/components/shop/Shop';
import CartProducts from '@/components/cart/products/CartProducts';
import NonUserRoute from '@/components/user/route/NonUserRoute';
import RegisterForm from '@/components/user/auth/register/RegisterForm';
import LoginForm from '@/components/user/auth/login/LoginForm';
import PasswordResetForm from '@/components/user/auth/PasswordResetForm';
import OrdersList from '@/components/order/OrdersList';
import WishList from '@/components/wishlist/WishList';
import UserProfile from '@/components/manage/common/profile/UserProfile';
import ManageCategory from '@/components/manage/admin/categories/ManageCategory';
import ManageSubcategory from '@/components/manage/admin/subcategories/ManageSubcategory';
import ManageProduct from '@/components/product/ManageProduct';
import ManageProducts from '@/components/product/ManageProducts';
import ManageCoupon from '@/components/manage/admin/coupons/ManageCoupon';
import ProductDetailed from '@/components/product/detailed/ProductDetailed';
import CategoryProducts from '@/components/category/CategoryProducts';
import SubcategoryProducts from '@/components/subcategory/SubcategoryProducts';
import Checkout from '@/components/checkout/Checkout';

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
        path: 'user',
        element: (
          <ProtectedRoute authRedirectTo='/auth/login'>
            <ManagementLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: 'orders',
            element: <OrdersList />,
          },
          {
            path: 'wishlist',
            element: <WishList />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
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
            element: <OrdersList />,
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
            path: 'product',
            element: <ManageProduct />,
          },
          {
            path: 'product/:productId',
            element: <ManageProduct />,
          },
          {
            path: 'products',
            element: <ManageProducts />,
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
