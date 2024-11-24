import { lazy } from 'react';

// use separate file for lazy imports to avoid lint warning 'eslint(react-refresh/only-export-components)'

// admin routes
export const AdminDashboard = lazy(() =>
  import('@/components/manage/admin/dashboard/AdminDashboard')
);
export const AdminOrdersList = lazy(() =>
  import('@/components/manage/admin/orders/AdminOrdersList')
);
export const ManageShops = lazy(() =>
  import('@/components/manage/admin/shops/ManageShops')
);
export const ShopDetails = lazy(() =>
  import('@/components/manage/admin/shops/ShopDetails')
);
export const ManageCategory = lazy(() =>
  import('@/components/manage/admin/categories/ManageCategory')
);
export const ManageSubcategory = lazy(() =>
  import('@/components/manage/admin/subcategories/ManageSubcategory')
);
export const ManageCoupon = lazy(() =>
  import('@/components/manage/admin/coupons/ManageCoupon')
);
export const AdminSellerChat = lazy(() =>
  import('@/components/manage/admin/chat/AdminSellerChat')
);

// seller routes
export const SellerDashboard = lazy(() =>
  import('@/components/manage/seller/dashboard/SellerDashboard')
);
export const SellerOrdersList = lazy(() =>
  import('@/components/manage/seller/orders/SellerOrdersList')
);
export const ManageShop = lazy(() =>
  import('@/components/manage/seller/shop/ManageShop')
);
export const ManageProduct = lazy(() =>
  import('@/components/manage/seller/products/ManageProduct')
);
export const ManageProducts = lazy(() =>
  import('@/components/manage/seller/products/ManageProducts')
);
export const SellerAdminChat = lazy(() =>
  import('@/components/manage/seller/chat/SellerAdminChat')
);

// buyer routes
export const BuyerDashboard = lazy(() =>
  import('@/components/manage/buyer/dashboard/BuyerDashboard')
);
export const BuyerOrdersList = lazy(() =>
  import('@/components/manage/buyer/orders/BuyerOrdersList')
);
export const ManageWishList = lazy(() =>
  import('@/components/manage/buyer/wishlist/ManageWishList')
);

// common routes
export const UserProfile = lazy(() =>
  import('@/components/manage/common/profile/UserProfile')
);
