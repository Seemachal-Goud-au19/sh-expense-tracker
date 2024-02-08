import React, { useState } from 'react'

const Expense = () => {
    const [expense, setExpense] = useState({
        amount: 0,
        description: '',
        category: ''
    })
    const [expenseList, setExpenseList] = useState([]);

    const expenseInput = (e) => {
        setExpense((prevValue) => {
            return {
                ...prevValue,
                [e.target.name]: e.target.value
            }
        })
    }

    const expenseHandler = (e) => {
        e.preventDefault();
        setExpenseList([...expenseList, expense])
        setExpense({
            amount: 0,
            description: '',
            category: ''
        })
    }

    console.log(expense)
    console.log(expenseList)
    return (
        <><h6>Expense Lists</h6>
            <div className='expense-list'>
                <ul>
                    {expenseList.length > 0 && expenseList.map((expense) => (<li>Category--{expense.category}-Description--{expense.description}-Amount--{expense.amount}</li>))}
                </ul>
            </div>
            <section className='auth'>

                <form onSubmit={expenseHandler}>
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
