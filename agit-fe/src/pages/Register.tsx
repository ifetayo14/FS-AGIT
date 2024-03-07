import React, {SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:8001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/login"/>
    }

    return (
        <div className="container">
            <form onSubmit={submit} className="form-signin">
                <h1 className="h3 mb-3 fw-normal">Please Register</h1>
                <input type="input" className="form-control" placeholder="Username" required
                    onChange={event => setUsername(event.target.value)}
                />

                <br/>

                <input type="password" className="form-control" placeholder="Password" required
                       onChange={event => setPassword(event.target.value)}
                />

                <br/><br/>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>

        </div>
    )
}

export default Register;