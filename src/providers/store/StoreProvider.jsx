import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { createStore } from './store';

const StoreProvider = ({ children, preloadedState }) => {
  const store = createStore(preloadedState);

  return <Provider store={store}>{children}</Provider>;
};

StoreProvider.propTypes = {
  children: PropTypes.node,
  preloadedState: PropTypes.object,
};

export default StoreProvider;
