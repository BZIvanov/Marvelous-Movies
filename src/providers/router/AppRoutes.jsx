import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import ErrorBoundary from './ErrorBoundary';
import NotFound from './NotFound';
import ProtectedRoute from '@/components/user/route/ProtectedRoute';
import NavigationLayout from '@/components/user/navigation/NavigationLayout';
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
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: <CartProducts />,
      },
      {
        path: 'register',
        element: (
          <NonUserRoute>
            <RegisterForm />
          </NonUserRoute>
        ),
      },
      {
        path: 'login',
        element: (
          <NonUserRoute>
            <LoginForm />
          </NonUserRoute>
        ),
      },
      {
        path: 'reset-password/:token',
        element: (
          <NonUserRoute>
            <PasswordResetForm />
          </NonUserRoute>
        ),
      },
      {
        path: 'user',
        element: (
          <ProtectedRoute authRedirectTo='/login'>
            <NavigationLayout />
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
            authRedirectTo='/login'
            roleRedirectTo='/'
            roles={['admin']}
          >
            <NavigationLayout />
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
        element: <ProductDetailed />,
      },
      {
        path: 'category/:categoryId',
        element: <CategoryProducts />,
      },
      {
        path: 'subcategory/:subcategoryId',
        element: <SubcategoryProducts />,
      },
      {
        path: 'checkout',
        element: (
          <ProtectedRoute authRedirectTo='/login'>
            <Checkout />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;
