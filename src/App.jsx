import { useState, useEffect, useRef } from 'react'
import './App.css'
import Transaction from './component/transaction'
import Demo from './component/demo'

function App() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [balance, setBalance] = useState(0);
  const [type, setType] = useState('expense');
  const [state, setState] = useState('');
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      const parsedTransactions = JSON.parse(savedTransactions);
      setTransactions(parsedTransactions);


      const initialIncome = parsedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const initialExpense = parsedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      setIncome(initialIncome);
      setExpense(initialExpense);
      setBalance(initialIncome - initialExpense);
      setState(initialIncome - initialExpense > 0 ? 'Profit😎' : initialIncome - initialExpense === 0 ? 'Neutral😑 ' : 'Loss🤦‍♂️');
    }
  }, []);

  useEffect(() => {
    const newBalance = income - expense;
    setBalance(newBalance);
    setState(newBalance > 0 ? 'Profit😎' : newBalance === 0 ? 'Neutral😑 ' : 'Loss🤦‍♂️');
  }, [income, expense]);

  const addTransaction = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      amount: +amount,
      description,
      type,
    };

    setTransactions(prevTransactions => {
      const updatedTransactions = [...prevTransactions, newTransaction];
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      if (type === 'expense') {
        setExpense(prevExpense => prevExpense + +amount);
      } else {
        setIncome(prevIncome => prevIncome + +amount);
      }

      return updatedTransactions;
    });

    setAmount('');
    setDescription('');
  };

  const handleDelete = (id) => {
    setTransactions(prevTransactions => {
      const updatedTransactions = prevTransactions.filter(t => t.id !== id);
      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

      const updatedIncome = updatedTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const updatedExpense = updatedTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      setIncome(updatedIncome);
      setExpense(updatedExpense);
      setBalance(updatedIncome - updatedExpense);

      return updatedTransactions;
    });
  };

  return (
    <>
      <div>
        <h1>Expense Tracker</h1>
        <div>
          <div>
            <h4>Your Balance</h4>
            <span>{state}: {balance}</span>
          </div>
          <div>
            <h4>Income</h4>
            <span>{income}</span>
          </div>
          <div>
            <h4>Expense</h4>
            <span>{expense}</span>
          </div>
        </div>

        <form style={{ margin: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onSubmit={addTransaction}>
          <div style={{ display: 'flex', gap: '30px' }}>
            <input type="number" placeholder="Amount" value={amount} required onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder="Description" value={description} required onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div style={{ margin: '30px', display: 'flex', gap: '20px' }}>
            <div>
              <label htmlFor="expense">Expense</label>
              <input type="radio" id="expense" value="expense" checked={type === 'expense'} onChange={(e) => setType(e.target.value)} />
            </div>
            <div>
              <label htmlFor="income">Income</label>
              <input type="radio" id="income" value="income" checked={type === 'income'} onChange={(e) => setType(e.target.value)} />
            </div>
          </div>

          <div>
            <button type="submit">Add Transaction</button>
          </div>
        </form>

        <div style={{ width: '100%', height: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {transactions.length > 0 ?
            transactions.map((t) => (
              <Transaction key={t.id} id={t.id} description={t.description} amount={t.amount} type={t.type} onDelete={handleDelete} />
            )) :
            <Demo />
          }
        </div>
      </div>
    </>
  );
}

export default App;