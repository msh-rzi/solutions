import React from 'react';
import TransactionList, { Transaction } from './ui/Transaction';

const Transactions = () => {
  const transactions: Transaction[] = [
    {
      id: '1',
      title: 'Stripe Payout',
      description: 'Monthly revenue payout',
      amount: 12450.0,
      type: 'credit',
      status: 'completed',
      date: '2025-06-01',
      category: 'Revenue',
    },
    {
      id: '2',
      title: 'AWS Infrastructure',
      amount: 3820.5,
      type: 'debit',
      status: 'completed',
      date: '2025-05-28',
      category: 'Cloud',
    },
    {
      id: '3',
      title: 'Internal Transfer',
      amount: 5000.0,
      type: 'transfer',
      status: 'pending',
      date: '2025-05-25',
    },
  ];

  return <TransactionList transactions={transactions} title="Recent Transactions" description="Last 30 days of activity" onTransactionClick={(tx) => console.log(tx)} />;
};

export default Transactions;
