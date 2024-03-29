import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [cookies, setCookies] = useCookies(['token']);

    const submit = async(e: SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password
            })
        });

        const content = await response.json()

        localStorage.setItem("token",content.token)

        console.log(localStorage.getItem("token"))
    }

    if (cookies != null) {
        return <Navigate to="/"/>;
    } else {
        return (
            <div className="container">
                <form onSubmit={submit} className="form-signin">
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                    <input type="input" className="form-control" placeholder="Username" required
                           onChange={event => setUsername(event.target.value)}
                    />

                    <br/>

                    <input type="password" className="form-control" placeholder="Password" required
                           onChange={event => setPassword(event.target.value)}
                    />
                    {/*<div className="register-here-label">*/}
                    {/*    Don't have an account? &nbsp;*/}
                    {/*     <a href="/register">Register here.</a>*/}
                    {/*</div>*/}

                    <br/><br/>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                </form>
            </div>
        )
    }


}

export default Login;