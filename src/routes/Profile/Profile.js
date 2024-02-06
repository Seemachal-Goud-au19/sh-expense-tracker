import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import './Profile.css'


const Profile = () => {
    const [userData, setUserData] = useState({
        profile_name: '',
        profile_photo: ''
    })

    const navigate = useNavigate();

    //

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
    //

    const InputChangeHandler = (e, type) => {
        setUserData((prevData) => {
            return {
                ...prevData,
                [type]: e.target.value
            }
        })
    }

    const profileSubmithandler = (e) => {
        e.preventDefault();
        const enteredName = userData.profile_name;
        const enteredProfileUrl = userData.profile_photo;
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
            method: 'POST',
            body: JSON.stringify({
                idToken: localStorage.getItem('token'),
                displayName: enteredName,
                photoUrl: enteredProfileUrl,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            response.json().then((data) => {
                console.log("profile update response data", data)
            })

        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <section className='profile-section'>
            <div>
                <h1>Contact Details</h1>
                <Button variant="outline-danger" onClick={() => navigate('/')}>Cancel</Button>
            </div>

            <form onSubmit={profileSubmithandler}>
                <div className='form-field-container'>
                    <div className=''>
                        <label htmlFor='profile-name'><FaGithub />Full Name</label>
                        <input type='text' id='profile-name' value={userData.profile_name} onChange={(e) => InputChangeHandler(e, 'profile_name')} />
                    </div>
                    <div className=''>
                        <label htmlFor='profile-url'><TbWorld />Profile Photo URL</label>
                        <input
                            type="text"
                            id='profile-url'
                            value={userData.profile_photo}
                            required
                            onChange={(e) => InputChangeHandler(e, 'profile_photo')}
                        />

                    </div>
                </div>
                <div>
                    <Button type='submit' variant="danger">Update</Button>
                </div>
            </form>
        </section>
    )
}

export default Profile
