import React, {SyntheticEvent, useEffect, useState} from "react";
import {IEmployee} from "../Types";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const EmployeeDetail = (props: { token: string }) => {
    const [data, setData] = useState<IEmployee>();
    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(false)

    const params = useParams()

    if (props.token === '') {
        return <Navigate to="/login" />
    }

    const deleteEmployee = async (e: SyntheticEvent) => {
        e.preventDefault()

         await fetch('http://localhost:8001/employee/'+ params.id, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/" />
    }

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8001/employee/`+params.id, {
            headers: {
                Authorization: 'Bearer ' + props.token
            }
        })
        setData(response.data)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData()
    },[]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h3>
                                <div className="action-menu">
                                    <button type="button" className="btn btn-warning float-end" onClick={deleteEmployee}>Delete
                                    </button>
                                    <button type="button" className="btn btn-primary float-end" onClick={() => {
                                        navigate('/employee/update/' + data?.id)
                                    }}>Update
                                    </button>
                                </div>
                            </h3>
                        </div>
                        <div className="card-body">
                            <table>
                                <div>
                                    <tr>
                                    <td>Name</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.name}</td>
                                    </tr>
                                    <tr>
                                        <td>NIP</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.nip}</td>
                                    </tr>
                                    <tr>
                                        <td>Place of Birth</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.pob}</td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.dob}</td>
                                    </tr>
                                    <tr>
                                        <td>Age</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.age}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Religion</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.religion}</td>
                                    </tr>
                                    <tr>
                                        <td>Gender</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.gender}</td>
                                    </tr>
                                    <tr>
                                        <td>PhoneNumber</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.phoneNumber}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>&nbsp;:&nbsp;</td>
                                        <td>{data?.email}</td>
                                    </tr>
                                </div>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetail