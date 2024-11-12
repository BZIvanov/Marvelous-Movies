import PropTypes from 'prop-types';

import { useSelector } from '@/providers/store/store';
import {
  selectUser,
  selectUserInitialLoadingCompleted,
} from '@/providers/store/features/user/userSlice';
import CountdownProgress from '@/components/common/feedback/CountdownProgress';

const ProtectedRoute = ({
  children,
  authRedirectTo,
  roleRedirectTo,
  roles,
}) => {
  const user = useSelector(selectUser);
  const userInitialLoadingCompleted = useSelector(
    selectUserInitialLoadingCompleted
  );

  // check if the initial loading of the user completed, because before it is fetched initially it will be null and we don't want to be redirected
  if (!userInitialLoadingCompleted) {
    return <div>Loading</div>;
  }

  if (!user) {
    return <CountdownProgress redirectTo={authRedirectTo} />;
  }

  if (roles && !roles.includes(user.role)) {
    return <CountdownProgress redirectTo={roleRedirectTo} />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
  authRedirectTo: PropTypes.string,
  roleRedirectTo: PropTypes.string,
  roles: PropTypes.array,
};

export default ProtectedRoute;
