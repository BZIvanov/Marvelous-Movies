import PropTypes from 'prop-types';
import TablePagination from '@mui/material/TablePagination';

const CouponsPagination = ({
  rowsPerPageOptions,
  totalCount = 0,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
}) => {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component='div'
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={(event, newPage) => setPage(newPage)}
      onRowsPerPageChange={(event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      }}
    />
  );
};

CouponsPagination.propTypes = {
  rowsPerPageOptions: PropTypes.array,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
};

export default CouponsPagination;
