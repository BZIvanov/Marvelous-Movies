import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const MenuItemNavLink = forwardRef((props, ref) => {
  const { to, ...rest } = props;

  const theme = useTheme();

  return (
    <NavLink
      {...rest}
      ref={ref}
      to={to}
      style={({ isActive }) => ({
        textDecoration: 'none',
        color: isActive ? theme.palette.primary.main : 'inherit',
      })}
    />
  );
});

MenuItemNavLink.displayName = 'MenuItemNavLink';

MenuItemNavLink.propTypes = {
  to: PropTypes.string,
};

export default MenuItemNavLink;
