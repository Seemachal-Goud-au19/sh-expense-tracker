import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, selectCount } from '../../redux-store/counterSlice'

import classes from './Counter.module.css';

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const toggleCounterHandler = () => { };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <div className={classes.value}>{count}</div>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;


