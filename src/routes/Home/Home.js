import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css'
import CartContext from '../../store/cart-context';


const Home = ({ verified, setVerified }) => {
  const [userData, setUserData] = useState({
    profile_name: '',
    profile_photo: ''
  })

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()
  const cartCtx = useContext(CartContext)

  // const verifyEmail = async () => {
  //   console.log("vrify token",localStorage.getItem('token'))
  //   fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       requestType: 'VERIFY_EMAIL',
  //       idToken: localStorage.getItem('token'),

  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((response) => {
  //     if (!response.ok) {
  //       return alert("not verified")
  //     }
  //     else {

  //       cartCtx.verifyHandler()
  //     }
  //     // response.json().then((data) => {
  //     //   setVerified(true)
  //     // })

  //   }).catch((err) => {
  //     console.log(err)
  //   })

  // }


  const getUser = () => {

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
      method: 'POST',
      body: JSON.stringify({
        idToken: localStorage.getItem('token'),

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {

      if (!response.ok) {
        return
      }
      response.json().then((data) => {
        console.log(">>>>>>>>>>>>>>>", data)
        setUserData({
          profile_name: data?.users[0].displayName,
          profile_photo: data?.users[0].photoUrl
        })
        setLoading(false)
      })

    }).catch((err) => {
      console.log(err)
    })

  }
  useEffect(() => {
    getUser()
    console.log("renrender Home")
  }, [])

  console.log("HOME VERI", cartCtx.isVerified)
  
  if (loading) {
      return <div>Loading...</div>;
    }
  

  return (
    <>
   {/* {!cartCtx.isVerified <Button variant="outline-danger" className="verify-btn" onClick={verifyEmail}>Verify Email Id</Button>} */}
       <div className='welcome'>
        <p>Welcome to Expense Tracker!!!</p>
        {(!userData.profile_name && !userData.profile_photo) && <p>Your profile is Incomplete.<Link to='/profile'>Complete now</Link></p>}
      </div>
    </>
  )
}

export default Home
