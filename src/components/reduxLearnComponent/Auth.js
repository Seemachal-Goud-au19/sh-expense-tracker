import classes from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux-store/authenticationSlice';

const Auth = () => {
  const dispatch = useDispatch()
  const AuthHandler = (e) => {
    e.preventDefault()
    dispatch(login())

  }
  return (
    <main className={classes.auth}>
      <section>
        <form onSubmit={AuthHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
