import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import './Home.css'

const Home = ({ verified, setVerified}) => {
  const [userData, setUserData] = useState({
    profile_name: '',
    profile_photo: ''
  })

  const verifyHandler = () => {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'VERIFY_EMAIL',
        idToken: localStorage.getItem('token'),

      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (!response.ok) {
        return alert("not verified")
      }
      response.json().then((data) => {
        setVerified(true)
      })

    }).catch((err) => {
      console.log(err)
    })
  }


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
      })

    }).catch((err) => {
      console.log(err)
    })

  }
  useEffect(() => {
    getUser()
  }, [])



  return (
    <>
      {!verified && <Button variant="outline-danger" className="verify-btn" onClick={verifyHandler}>Verify Email Id</Button>}
      {verified && <div className='welcome'>

        <p>Welcome to Expense Tracker!!!</p>
        {(userData.profile_name && userData.profile_photo) ? <Link to='/expense'>Expense</Link> : <p>Your profile is Incomplete.<Link to='/profile'>Complete now</Link></p>}
      </div>}
    </>
  )
}

export default Home
