import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import "./TransactionTable.css"

function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('/transactionsData.json');
      const data = await response.json();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th className='align-left'>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transactions) => (
          <tr key={uuidv4()}>
            <td className='left-radius'>{transactions.date}</td>
            <td className='align-left'>{transactions.description}</td>
            <td>{transactions.amount}</td>
            <td>{transactions.balance}</td>
            <td className='right-radius'><i className="fa-solid fa-chevron-down"></i></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;