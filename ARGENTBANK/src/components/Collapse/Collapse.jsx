import "./Collapse.css";
import PropTypes from 'prop-types';
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function Collapse({ title, amount, subtitle, transactions }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };


  const transactionsData = [
   { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
   { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
   { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
   { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
   { date: '27/02/20', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
 ];

  return (
    <div className="collapse">
      <div className="collapse-header" onClick={toggleCollapse}>
        <div className="collapse-content">
          <div className="collapse-content-title">{title}</div>
          <div className="collapse-content-amount">{amount}</div>
          <div className="collapse-content-subtitle">{subtitle}</div>
        </div>
        <div className="collapse-chevron">
          <i className={`fa-solid fa-chevron-${isOpen ? 'down' : 'right'}`}></i>
        </div>
      </div>
      {isOpen && (
        <div className="collapse-content">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction) => (
                <tr key={uuidv4}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

Collapse.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Collapse;