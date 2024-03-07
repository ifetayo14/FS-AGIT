import React, {useState} from 'react';
import './App.css';
import Nav from "./components/Nav";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Employee from "./pages/Employee";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmployeeCreate from "./pages/EmployeeCreate";
import EmployeeDetail from "./pages/EmployeeDetail";
import {IEmployee} from "./Types";
import EmployeeUpdate from "./pages/EmployeeUpdate";

function App() {
    const [token, setToken] = useState('')

    return (
        <div className="App">
            <BrowserRouter>
                <Nav token={token} setToken={setToken}/>
                    <main>
                        <Routes>
                            <Route path="/" Component={() => <Employee token={token} /> } />
                            <Route path="/register" Component={Register} />
                            <Route path="/login" Component={() => <Login token={token} setToken={setToken} />}/>
                            <Route path="/employee/create" Component={() => <EmployeeCreate token={token} /> }/>
                            <Route path="/employee/:id" Component={() => <EmployeeDetail token={token} /> }/>
                            <Route path="/employee/update/:id" Component={() => <EmployeeUpdate token={token} /> }/>
                        </Routes>
                    </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
