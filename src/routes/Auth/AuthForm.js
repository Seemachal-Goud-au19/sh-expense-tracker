import { useState, useRef, useContext } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import CartContext from '../../store/cart-context';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";


import './AuthForm.css';


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('password');
const [icon, setIcon] = useState('eyeOff');
  const navigate = useNavigate();

  const cartCtx = useContext(CartContext)

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleViewPassword = () => {
    if (type==='password'){
       setIcon('eye');
       setType('text')
    } else {
       setIcon('eyeOff')
       setType('password')
    }
 }

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef?.current?.value;

    if (!isLogin && (enteredPassword !== enteredConfirmPassword)) {
      return alert("confirm password mismatch")
    }
    setIsLoading(true)

    if (isLogin) {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
          return res.json().then((data) => {
            cartCtx.login(data.idToken, data.email)
            navigate('/')

          })
        }
        else {
          return res.json().then((data) => {
            let errorMessage = "Authantication failed"
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage)
          })
        }
      })
    } else {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        setIsLoading(false)
        if (res.ok) {
          //'''
        }
        else {
          return res.json().then((data) => {
            let errorMessage = "Authantication failed"
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage)
          })
        }
      })
    }

   

  }
  return (
    <section className='auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className='control'>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className='control'>
          <label htmlFor='password'>Password</label>
          <input
            type={type}
            id='password'
            required
            ref={passwordInputRef}
          />
          <span onClick={handleViewPassword }>{icon==='eye'?<IoMdEye />:<IoMdEyeOff />}</span>
        </div>
        {!isLogin && <div className='control'>
          <label htmlFor='confirm-password'>Confirm Password</label>
          <input
            type='password'
            id='confirm-password'
            required
            ref={confirmPasswordInputRef}
          />
        </div>
        }
        {isLoading ? <p className='loading'>Sending request....</p> : <div className=''>
          <button
            type='submit'
            className='toggle'
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
          {isLogin && <h6><Link to='/forget-pass'>Forgot Password </Link></h6>}
        </div>}

        <div className='actions'>
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Have an account? Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
