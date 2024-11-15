import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import { useSelector } from '@/providers/store/store';
import {
  selectShop,
  selectShopInitialLoadingCompleted,
} from '@/providers/store/features/shop/shopSlice';

const ShopStatus = ({
  children,
  statusRedirectTo,
  activityStatuses,
  paymentStatuses,
}) => {
  const shop = useSelector(selectShop);
  const shopInitialLoadingCompleted = useSelector(
    selectShopInitialLoadingCompleted
  );

  if (!shopInitialLoadingCompleted) {
    return <div>Loading</div>;
  }

  if (
    !activityStatuses.includes(shop.activityStatus) ||
    !paymentStatuses.includes(shop.paymentStatus)
  ) {
    return <Navigate to={statusRedirectTo} replace={true} />;
  }

  return children;
};

ShopStatus.propTypes = {
  children: PropTypes.node,
  statusRedirectTo: PropTypes.string,
  activityStatuses: PropTypes.array,
  paymentStatuses: PropTypes.array,
};

export default ShopStatus;
