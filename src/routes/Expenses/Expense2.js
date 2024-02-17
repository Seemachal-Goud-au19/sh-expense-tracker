import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addExpense } from '../../redux-store/expenseSlice';
import { toggleTheme } from '../../redux-store/themeSlice';
import './Expense.css'

const Expense2 = () => {
    const dispatch = useDispatch();
    const expenseList = useSelector((state) => state.expenseList.expenseListData)
    const darkMode = useSelector((state) => state.theme.darkMode)
   const [editId, setEditId] = useState(null)

    const [expense, setExpense] = useState({
        amount: 0,
        description: '',
        category: ''
    })

    const [editExpense, setEditExpense] = useState({
        amount: 0,
        description: '',
        category: ''
    })

    const [updateDeleteState, setUpdateDeleteState] = useState(true)

    const TotalExpenseAmount = expenseList.reduce((initialAmount, expenseItem) => initialAmount + expenseItem.amount, 0,)

    const addPremiumHandler = () => {
        if (TotalExpenseAmount > 10000) {
            dispatch(toggleTheme())
        }
    }

    const downloadCSV = () => {
        const csvContent = 'data:text/csv;charset=utf-8,';
        const rows = expenseList.map(expense => `${expense.amount},${expense.description},${expense.category}`);
        const csvData = rows.join('\n');
        const encodedUri = encodeURI(csvContent + csvData);

        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'expenses.csv');
        document.body.appendChild(link); // Required for Firefox
        link.click();
    };





    const expenseInput = (e) => {
        setExpense((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const editExpenseInput = (e) => {
        setEditExpense((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const submiExpenseHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://sh-expense-tracker-default-rtdb.firebaseio.com/expenses.json', {
                method: 'POST',
                body: JSON.stringify(expense),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

        } catch (err) {
            console.log(err)
        }
        setExpense({
            amount: 0,
            description: '',
            category: ''
        })

    }


    const fetchExpenses = async () => {
        try {
            const response = await fetch('https://sh-expense-tracker-default-rtdb.firebaseio.com/expenses.json');

            if (!response.ok) {
                throw new Error('Something went wrong')
            }
            const data = await response.json();

            const fetchedExpenseList = [];
            for (const expenseID in data) {

                fetchedExpenseList.push({
                    id: expenseID,
                    amount: +data[expenseID].amount,
                    description: data[expenseID].description,
                    category: data[expenseID].category
                })
            }

            dispatch(addExpense(fetchedExpenseList))
        } catch (error) {
            console.log(error.message)
        }
    }

    const editExpenseHandler = async (id) => {
    console.log("id",id, typeof(id))
   setEditId(id)
        const FilteredExpense = expenseList.find((expense) => expense.id === id)

        // const updatedAmount = prompt("updated amount", FilteredExpense.amount)
        // const updatedDescription = prompt("updated description", FilteredExpense.description)
        // const updatedCategory = prompt("updated category", FilteredExpense.category)
        const {amount,description,category} = FilteredExpense
        setEditExpense({
            amount,
            description,
            category
        })

       
    }


    const submitEditExpenseHandler = async (e)=>{
        e.preventDefault()

        console.log("Edit expense",expense)
        console.log("editId",editId, typeof(editId))

        try {
            const response = await fetch(`https://sh-expense-tracker-default-rtdb.firebaseio.com/expenses/${editId}.json`, {
                method: 'PUT',
                body: JSON.stringify({...editExpense}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

        } catch (err) {
            console.log(err)
        }
       setEditExpense({
        amount: 0,
        description: '',
        category: ''
       })
        setUpdateDeleteState(!updateDeleteState)
    }

    const deleteExpenseHandler = async (id) => {

        try {
            const response = await fetch(`https://sh-expense-tracker-default-rtdb.firebaseio.com/expenses/${id}.json`, {
                method: 'DELETE',

            })
            const data = await response.json()

        } catch (err) {
            console.log(err)
        }
        setUpdateDeleteState(!updateDeleteState)
    }

    useEffect(() => {
        fetchExpenses()
    }, [expense, updateDeleteState])





    return (
        <>
<div className={darkMode ? 'dark-theme' : 'slight-theme'}>

    {/* lkjjka */}
    <form id="expForm" onSubmit={submitEditExpenseHandler}>
                        <div class="control">
                            <label htmlFor="category-select">Choose a Category:</label>

                            <select name="category" id="category-select" value={editExpense.category} onChange={editExpenseInput} >
                                <option value="">--Please choose an option--</option>
                                <option value="food">Food</option>
                                <option value="movie">Movie</option>
                                <option value="holiday">Holiday</option>

                            </select>
                        </div>



                        <div class="control">
                            <label for="amount">Amount:</label>
                            <input type="number" id="amount" name='amount' value={editExpense.amount} required onChange={editExpenseInput}/>
                        </div>

                        <div className='control'>
                            <label htmlFor='description'>Description</label>
                            <input type='text' id='description' name='description' value={editExpense.description} required onChange={editExpenseInput} />
                        </div>
                        <button type="submit" class="buttonSave">Edit expense</button>
                    </form>
    {/* kjsk */}

            <section className='expense'>
                <div className='outer-btn'>
                {/* Toggle button for theme */}
                <button onClick={() => dispatch(toggleTheme())}>Toggle Theme</button>

                {/* Download CSV button */}
                <button onClick={downloadCSV}>Download Expenses as CSV</button>

                </div>
                <div class="form content">
                <h3 class="secondTitle">Add a new item: </h3>
                    <form id="expForm" onSubmit={submiExpenseHandler}>
                        <div class="control">
                            <label htmlFor="category-select">Choose a Category:</label>

                            <select name="category" id="category-select" value={expense.category} onChange={expenseInput} >
                                <option value="">--Please choose an option--</option>
                                <option value="food">Food</option>
                                <option value="movie">Movie</option>
                                <option value="holiday">Holiday</option>

                            </select>
                        </div>



                        <div class="control">
                            <label for="amount">Amount:</label>
                            <input type="number" id="amount" name='amount' value={expense.amount} required onChange={expenseInput}/>
                        </div>

                        <div className='control'>
                            <label htmlFor='description'>Description</label>
                            <input type='text' id='description' name='description' value={expense.description} required onChange={expenseInput} />
                        </div>
                        <button type="submit" class="buttonSave">Add a new expense</button>
                    </form>
                </div>
            </section>

           
            <section class="content">
            <h3 class="secondTitle">Expense Lists</h3>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th colspan="2">Options</th>

                        </tr>
                    </thead>
                    <tbody id="expenseTable">
                        {expenseList.length > 0 && expenseList.map((expense) => (
                            <tr>
                                <td>{expense.category}</td>
                                <td>{expense.description}</td>
                                <td>{expense.amount} </td>
                                <td className ='expense-optin-btn' style={{cursor:"pointer",color:'blue'}} onClick={() => editExpenseHandler(expense.id)}>Edit</td>
                                <td className ='expense-optin-btn' style={{cursor:"pointer",color:'red'}} onClick={() => deleteExpenseHandler(expense.id)}>Delete</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            </div>
        </>

    )
}

export default Expense2
