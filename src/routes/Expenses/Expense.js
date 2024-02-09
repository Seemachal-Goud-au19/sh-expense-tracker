import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Expense = () => {
    const [expense, setExpense] = useState({
        amount: 0,
        description: '',
        category: ''
    })
    const [expenseList, setExpenseList] = useState([]);
    const [updateDeleteState, setUpdateDeleteState] = useState(true)

    const expenseInput = (e) => {
        setExpense((prevValue) => {
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
                    amount: data[expenseID].amount,
                    description: data[expenseID].description,
                    category: data[expenseID].category
                })
            }
            setExpenseList(fetchedExpenseList);


        } catch (error) {
            console.log(error.message)
        }
    }

    const editExpenseHandler = async (id) => {


        const FilteredExpense = expenseList.find((expense) => expense.id === id)

        const updatedAmount = prompt("updated amount", FilteredExpense.amount)
        const updatedDescription = prompt("updated description", FilteredExpense.description)
        const updatedCategory = prompt("updated category", FilteredExpense.category)

        try {
            const response = await fetch(`https://sh-expense-tracker-default-rtdb.firebaseio.com/expenses/${id}.json`, {
                method: 'PUT',
                body: JSON.stringify({
                    amount: updatedAmount,
                    description: updatedDescription,
                    category: updatedCategory
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()

        } catch (err) {
            console.log(err)
        }

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
        <><h6>Expense Lists</h6>
            <div className='expense-list'>
                <ul>
                    {expenseList.length > 0 && expenseList.map((expense) => (
                        <li>
                            <h6>Category--{expense.category}-Description--{expense.description}-Amount--{expense.amount} </h6>
                            <button onClick={() => editExpenseHandler(expense.id)}>Edit</button>
                            <button onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
                        </li>))}
                </ul>
            </div>
            <section className='auth'>

                <form onSubmit={submiExpenseHandler}>
                    <div className='control'>
                        <label htmlFor='amount'>Amount</label>
                        <input type='number' id='amount' name='amount' value={expense.amount} required onChange={expenseInput} />
                    </div>
                    <div className='control'>
                        <label htmlFor='description'>Description</label>
                        <input type='text' id='description' name='description' value={expense.description} required onChange={expenseInput} />
                    </div>
                    <div className='control'>
                        <label htmlFor="category-select">Choose a Category:</label>

                        <select name="category" id="category-select" value={expense.category} onChange={expenseInput} >
                            <option value="">--Please choose an option--</option>
                            <option value="food">Food</option>
                            <option value="movie">Movie</option>
                            <option value="holiday">Holiday</option>

                        </select>
                    </div>
                    <div className=''>
                        <button
                            type='submit'
                            className='toggle'
                        >
                            Add Expense
                        </button>

                    </div>
                </form>

            </section>
        </>

    )
}

export default Expense