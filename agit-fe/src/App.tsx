import React, {useState} from 'react';
import './App.css';
import Nav from "./components/Nav";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Employee from "./pages/Employee";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeDetail from "./pages/EmployeeDetail";
import EmployeeUpdate from "./pages/EmployeeUpdate";
import {CookiesProvider} from "react-cookie";

function App() {
    const [token, setToken] = useState('')

    return (
        <div className="App">

            <BrowserRouter>
                <Nav/>
                    <main>
                        <Routes>
                            <Route path="/" Component={() => <Employee /> } />
                            <Route path="/register" Component={Register} />
                            <Route path="/login" Component={() => <Login />}/>
                            <Route path="/employee/create" Component={() => <EmployeeCreate /> }/>
                            <Route path="/employee/:id" Component={() => <EmployeeDetail /> }/>
                            <Route path="/employee/update/:id" Component={() => <EmployeeUpdate /> }/>
                        </Routes>
                    </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
