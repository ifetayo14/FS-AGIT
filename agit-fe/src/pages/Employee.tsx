import React, {useEffect, useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import axios from "axios";
import {IEmployee} from "../Types";

const Employee = (props: { token: string}) => {
    const [data, setData] = useState<IEmployee[]>([]);
    const navigate = useNavigate()

    if (props.token === '') {
        return <Navigate to="/login" />
    }

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8001/employee`, {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        setData(response.data)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData()
    }, []);

    const employeeDetails = data.map((item, index) => {
        return (
            <tr key={item.id} onClick={() => {
                navigate('/employee/'+item.id.toString())
            }}>
                <td>{item.name}</td>
                <td>{item.nip}</td>
                <td>{item.pob}</td>
                <td>{item.dob}</td>
                <td>{item.age}</td>
                <td>{item.address}</td>
                <td>{item.religion}</td>
                <td>{item.gender}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
            </tr>
        )
    })

    return (
        <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3>
                                    Employee
                                    <button type="button" className="btn btn-primary float-end" onClick={() => {
                                        navigate('/employee/create')
                                    }}>Add Employee</button>
                                </h3>
                            </div>
                            <div className="card-body">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>NIP</th>
                                            <th>Place of Birth</th>
                                            <th>Date of Birth</th>
                                            <th>Age</th>
                                            <th>Address</th>
                                            <th>Religion</th>
                                            <th>Gender</th>
                                            <th>PhoneNumber</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {employeeDetails}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

}

export default Employee;
