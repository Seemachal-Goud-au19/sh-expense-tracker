import React, { useRef, useState } from 'react'

const Forgetpass = () => {

    const [resetMailResponse, setResetMailResponse] = useState(false)
    const forgetPassEmailInputRef = useRef()

    const forgetPassHandler = (e) => {
        e.preventDefault()

        const registeredEmail = forgetPassEmailInputRef.current.value;

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBI0CjaNxfs8gZIR5xd6R8wBKn14aZo2qs', {
            method: 'POST',
            body: JSON.stringify({
                requestType: 'PASSWORD_RESET',
                email: registeredEmail,

            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (!response.ok) {
                return alert("not verified")
            }
            setResetMailResponse(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <>
            <section className='auth'>
                <h6>Enters the Email which you have registered</h6>
                <form onSubmit={forgetPassHandler}>
                    <div className='control'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' required ref={forgetPassEmailInputRef} />
                    </div>
                    <div className=''>
                        <button
                            type='submit'
                            className='toggle'
                        >
                            Send Link
                        </button>

                    </div>
                </form>
                {resetMailResponse && <h6>Please check your email for password change </h6>}
            </section>
        </>
    )
}

export default Forgetpass
