import React from "react";
import {Link} from "react-router-dom";
import {useCookies} from "react-cookie";

const Nav = () => {
    const [cookies, removeCookie] = useCookies(['token']);
    const logout = () => {
        removeCookie('token', {
            path: '/login',
            domain: 'http://localhost:3000/'
        })
    }

    let menu;

    if (!cookies) {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="nav-item active">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>
        )
    } else {
        menu = (
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="nav-link" onClick={logout}>Logout</Link>
                </li>

            </ul>
        )
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand">EmployeeApp</Link>

                <div>
                    {menu}
                </div>
            </div>
        </nav>
    )
}

export default Nav;