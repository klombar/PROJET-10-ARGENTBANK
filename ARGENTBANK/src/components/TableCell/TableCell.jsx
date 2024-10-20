import PropTypes from 'prop-types';

const TableCell = ({ className,colSpan, children }) => {
  return <td colSpan={colSpan} className={className}>{children}</td>;
};

TableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  colSpan: PropTypes.string,
};

export default TableCell;