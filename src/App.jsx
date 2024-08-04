import { useState, useEffect, useRef } from 'react'
import './App.css'
import Transaction from './componet/transaction'
import Demo from './componet/demo'

function App() {

  const [amount, setAmount] = useState('');
  const [description, setdescription] = useState("")
  const [income, setincome] = useState(0);
  const [expence, setexpence] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [type, settype] = useState("expence");
  const [state, setstate] = useState('');
  // const [count, setcount] = useState(0)
  const [array, setarray] = useState(() =>{

    const savedArray = localStorage.getItem('transactions');
    return savedArray ? JSON.parse(savedArray): [];

  });

  // useState(() => {
  //   // Retrieve the array from localStorage when the component mounts
  //   const savedArray = localStorage.getItem('transactions');
  //   return savedArray ? JSON.parse(savedArray) : [];
  // }, []);


  const idCounter = useRef(array.length);

  const addTransaction = (e) => {
    e.preventDefault();

    idCounter.current += 1;

    const newTransaction = {
      id: idCounter.current,
      amount: +amount,
      description: description,
      type: type,
    };

    if (type === "expence") {
      setexpence(expence + +amount);
    } else {
      setincome(income + +amount);
      setBalance(income - expence);
    }

    const updatedArray = [...array, newTransaction];
    setarray(updatedArray);

    localStorage.setItem('transactions', JSON.stringify(updatedArray));

    setAmount(0);
    setdescription("");

    // setcount((e) => e + 1);
    // console.log("New Transaction Added:", newTransaction);
    // console.log("Updated Array:", array);
  }

  useEffect(() => {
    const newBalance = income - expence;
    setBalance(newBalance);
    Balance > 0 ? setstate("Profit😎") : Balance === 0 ? setstate("Neutral") : setstate("Loss🤦‍♂️");
  }, [income, expence]);


  const handledelete = (id) => {
    const updatedArray = array.filter(item => item.id !== id);
    setarray(updatedArray);
    localStorage.setItem('transactions', JSON.stringify(updatedArray)); 
  }

  const handleDelete = (id) => {
    {
      setarray(array.filter((e) => e.id !== id))
    }  
  };





  return (
    <>
      <div >
        <h1>Expence Tracker</h1>
        <div>
          <div>
            <h4>Your Balance</h4>
            <span>{state}: {Balance}</span>
          </div>
          <div>
            <h4>Income</h4>
            <span>{income}</span>
          </div>
          <div>
            <h4>Expence</h4>
            <span>{expence}</span>
          </div>
        </div>

        <form style={{ margin: "30px", flex: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }} onSubmit={addTransaction}>
          <div style={{ display: 'flex', gap: '30px' }}>
            <input type="number" placeholder='Amount' value={amount} required onChange={(e) => setAmount(e.target.value)} />
            <input type="text" placeholder='description' value={description} required onChange={(e) => setdescription(e.target.value)} />
          </div>

          <div style={{ margin: "30px", display: 'flex', gap: '20px' }}>
            <div>
              <label htmlFor="expence">Expence</label>
              <input type="radio" id='expence' value="expence" checked={type === "expence"} onChange={(e) => settype(e.target.value)} />
            </div>
            <div>
              <label htmlFor="income" >Income</label>
              <input type="radio" id='income' value="income" checked={type === "income"} onChange={(e) => settype(e.target.value)} />
            </div>
          </div>

          <div>
            <button type='submit'>Add Transaction</button>
          </div>

        </form>
        <div style={{ width: '100%', height: "200px", overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {
            array.length > 0 ?
              array.map((e) => {
                return (<Transaction key={Date.now().toString(36) + Math.random().toString(36)} id={e.id} description={e.description} amount={e.amount} type={e.type} onDelete={handledelete} />
                )
              }) :
              <Demo />
          }
        </div>

      </div>
    </>
  )
}

export default App



// import { useState, useEffect, useId } from 'react';
// import './App.css';
// import Transaction from './componet/transaction';
// import Demo from './componet/demo';

// function App() {

//   const [count, setCount] = useState(0)
//   const [amount, setAmount] = useState();
//   const [description, setDescription] = useState("");

//   const [income, setIncome] = useState(0);
//   const [expense, setExpense] = useState(0);
//   const [balance, setBalance] = useState(0);

//   const [type, setType] = useState("expense");
//   const [state, setState] = useState('');

//   const [array, setArray] = useState([]);
//   // const id = useId();

//   const addTransaction = (e) => {
//     e.preventDefault();
//     const newTransaction = {
//       amount: +amount,
//       description: description,
//       type: type
//     };

//     if (type === "expense") {
//       setExpense(expense + +amount);
//     } else {
//       setIncome(income + +amount);
//     }

//     setArray([...array, newTransaction]);
//     setAmount(0);
//     setDescription("");
//     console.log("New Transaction Added:", newTransaction);
//     console.log("Updated Array:", array);
//     setCount((e) => e + 1)
//   };

//   useEffect(() => {
//     const newBalance = income - expense;
//     setBalance(newBalance);
//     balance > 0 ? setState("Profit😎") : balance === 0 ? setState("Neutral") : setState("Loss🤦‍♂️");
//   }, [income, expense]);

//   return (
//     <>
//       <div>
//         <h1>Expense Tracker</h1>
//         <div>
//           <div>
//             <h4>Your Balance</h4>
//             <span>{state}: {balance}</span>
//           </div>
//           <div>
//             <h4>Income</h4>
//             <span>{income}</span>
//           </div>
//           <div>
//             <h4>Expense</h4>
//             <span>{expense}</span>
//           </div>
//         </div>

//         <form style={{ margin: "30px" }} onSubmit={addTransaction}>
//           <div style={{ display: 'flex', gap: '30px' }}>
//             <input type="number" placeholder='Amount' value={amount} required onChange={(e) => setAmount(e.target.value)} />
//             <input type="text" placeholder='Description' value={description} required onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div style={{ margin: "30px", display: 'flex', gap: '20px' }}>
//             <div>
//               <label htmlFor="expense">Expense</label>
//               <input type="radio" id='expense' value="expense" checked={type === "expense"} onChange={(e) => setType(e.target.value)} />
//             </div>

//             <div>
//               <label htmlFor="income">Income</label>
//               <input type="radio" id='income' value="income" checked={type === "income"} onChange={(e) => setType(e.target.value)} />
//             </div>
//           </div>
//           <div>
//             <button type='submit'>Add Transaction</button>
//           </div>
//         </form>
//         <div style={{ width: '100%', height: "200px", overflowY: 'auto' }}>
//           {
//             array.length > 0 ?
//               array.map((e) => {
//                 return (
//                   <>
//                     <Transaction key={count} description={e.description} amount={e.amount} type={e.type} />

//                   </>
//                 )
//               }) :
//               <Demo />
//           }
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;
