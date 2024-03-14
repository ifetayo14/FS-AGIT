import React, {SyntheticEvent, useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {IEmployee} from "../Types";
import axios from "axios";
import {replaceBehavior} from "@testing-library/user-event/dist/keyboard/plugins";
import {useCookies} from "react-cookie";

const EmployeeUpdate = () => {
    const [data, setData] = useState<IEmployee>();
    const params = useParams()
    const [cookies] = useCookies(['token']);

    const fetchData = async () => {
        const response = await axios.get(`http://localhost:8001/employee/`+params.id, {
            headers: {
                Authorization: 'Bearer ' + cookies
            }
        })
        setData(response.data)
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        fetchData()
    },[]);

    const [name, setName] = useState(data?.name)
    const [nip, setNip] = useState(data?.nip)
    const [pob, setPob] = useState(data?.pob)
    const [dob, setDob] = useState(data?.dob)
    const [age, setAge] = useState(data?.age)
    const [address, setAddress] = useState(data?.address)
    const [religion, setReligion] = useState(data?.religion)
    const [gender, setGender] = useState(data?.gender)
    const [phoneNumber, setPhoneNumber] = useState(data?.phoneNumber)
    const [email, setEmail] = useState(data?.email)
    const [redirect, setRedirect] = useState(false)

    if (cookies === null) {
        return <Navigate to="/login" />
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()


        await fetch('http://localhost:8001/employee/'+params.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ cookies
            },
            body: JSON.stringify({
                'name': name,
                'nip': nip,
                'pob': pob,
                'dob': dob,
                'age': age,
                'address': address,
                'religion': religion,
                'gender': gender,
                // @ts-ignore
                'phoneNumber': phoneNumber,
                'email': email
            })
        });

        setRedirect(true)
    }

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div className="container">
            <form onSubmit={submit} className="form-employee">
                <h1 className="h3 mb-3 fw-normal">Update Employee</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="input" id="name" className="form-control" placeholder={data?.name}
                           onChange={event => setName(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="nip">NIP</label>
                    <input type="input" id="nip" className="form-control" placeholder={data?.nip}
                           onChange={event => setNip(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="pob">Place of Birth</label>
                    <input type="input" id="pob" className="form-control" placeholder={data?.pob}
                           onChange={event => setPob(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date" id="dob" className="form-control" placeholder={data?.dob}
                           onChange={event => setDob(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" id="age" className="form-control" placeholder={data?.age.toString()}
                           onChange={event => setAge(event.target.valueAsNumber)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="input" id="address" className="form-control" placeholder={data?.address}
                           onChange={event => setAddress(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input type="input" id="religion" className="form-control" placeholder={data?.religion}
                           onChange={event => setReligion(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <input type="input" id="gender" className="form-control" placeholder={data?.gender}
                           onChange={event => setGender(event.target.value)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input type="number" id="phoneNumber" className="form-control"
                           placeholder={data?.phoneNumber.toString()}
                           onChange={event => setPhoneNumber(event.target.valueAsNumber)}
                    />
                </div>
                <br/>

                <div className="form-group">
                    <label htmlFor="email">Gender</label>
                    <input type="email" className="form-control" placeholder={data?.email}
                           onChange={event => setEmail(event.target.value)}
                    />
                </div>
                    <br/>

                    <br/><br/>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>

        </div>
)
}

export default EmployeeUpdate
