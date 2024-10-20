import { useState } from 'react';
import TableCell from '../TableCell/TableCell'; 
import PropTypes from 'prop-types';
import './TableRow.css';

function TableRow({ transaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  return (
   <>
      <div className='tableRowSpace'></div>
      <tr>
        <TableCell className={"tableRow-transactions-date"}>{transaction.date}</TableCell>
        <TableCell className={"tableRow-transactions-description"}>{transaction.description}</TableCell>
        <TableCell className={"tableRow-transactions"}>{transaction.amount}</TableCell>
        <TableCell className={"tableRow-transactions"}>{transaction.balance}</TableCell>
        <TableCell className={"tableRow-transactions"}>
          <i onClick={toggleCollapse} className="fa-solid fa-chevron-down"></i>
        </TableCell>
      </tr>
      {isOpen && (
            <>
            <tr>
               <TableCell colSpan="1" className={"left-information"}> Transaction Type</TableCell>
               <TableCell colSpan="1" className={"left"}> Electronic</TableCell>
               <TableCell colSpan="3" ></TableCell>
            </tr>
            <tr>
               <TableCell colSpan="1" className={"left-information"}>Category</TableCell>
               <TableCell colSpan="1" className={"left"}>Food <i className="fa-solid fa-pencil"></i></TableCell>
               <TableCell colSpan="3" ></TableCell>
            </tr>
            <tr>
               <TableCell colSpan="1" className={"left-information"}>Note</TableCell>
               <TableCell colSpan="1" className={"left"}>Lorem ipsum <i className="fa-solid fa-pencil"></i></TableCell>
               <TableCell colSpan="3" ></TableCell>
            </tr>
         </>
      )}
   </>
  );
}

TableRow.propTypes = {
  transaction: PropTypes.shape({
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    balance: PropTypes.string.isRequired,
  }).isRequired,
};

export default TableRow;