import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { FaGithub } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import './Profile.css'


const Profile = () => {
    const inputName = useRef();
    const inputProfileUrl = useRef();
    const navigate = useNavigate();

    const profileSubmithandler = (e) => {
        e.preventDefault();
        const enteredName = inputName.current.value;
        const enteredProfileUrl = inputProfileUrl.current.value;
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
                        <input type='text' id='profile-name' required ref={inputName} />
                    </div>
                    <div className=''>
                        <label htmlFor='profile-url'><TbWorld />Profile Photo URL</label>
                        <input
                            type="text"
                            id='profile-url'
                            required
                            ref={inputProfileUrl}
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
