import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TableRow from '../TableRow/TableRow';
import "./TransactionTable.css";

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
          <th className='date'>Date</th>
          <th className='description'>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <TableRow key={uuidv4()} transaction={transaction} />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionTable;