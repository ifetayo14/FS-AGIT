import React, {SyntheticEvent, useState} from "react";
import {Navigate} from "react-router-dom";

const EmployeeCreate = (props: { token: string}) => {
    const [name, setName] = useState('')
    const [nip, setNip] = useState('')
    const [pob, setPob] = useState('')
    const [dob, setDob] = useState('')
    const [age, setAge] = useState(0)
    const [address, setAddress] = useState('')
    const [religion, setReligion] = useState('')
    const [gender, setGender] = useState('')
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [email, setEmail] = useState('')
    const [redirect, setRedirect] = useState(false)

    if (props.token === '') {
        return <Navigate to="/login" />
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        await fetch('http://localhost:8001/employee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ props.token
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
                'phoneNumber': phoneNumber.toString(),
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
                <h1 className="h3 mb-3 fw-normal">Create Employee</h1>
                <input type="input" className="form-control" placeholder="Name" value={name} required
                       onChange={event => setName(event.target.value)}
                />
                <br/>

                <input type="input" className="form-control" placeholder="NIP" value={nip} required
                       onChange={event => setNip(event.target.value)}
                />
                <br/>

                <input type="input" className="form-control" placeholder="POB" value={pob} required
                       onChange={event => setPob(event.target.value)}
                />
                <br/>

                <input type="date" className="form-control" placeholder="DOB" value={dob} required
                       onChange={event => setDob(event.target.value)}
                />
                <br/>

                <input type="number" className="form-control" placeholder="Age"value={age} required
                       onChange={event => setAge(event.target.valueAsNumber)}
                />
                <br/>

                <input type="input" className="form-control" placeholder="Address" value={address} required
                       onChange={event => setAddress(event.target.value)}
                />
                <br/>

                <input type="input" className="form-control" placeholder="Religion" value={religion} required
                       onChange={event => setReligion(event.target.value)}
                />
                <br/>

                <input type="input" className="form-control" placeholder="Gender" value={gender} required
                       onChange={event => setGender(event.target.value)}
                />
                <br/>

                <input type="number" className="form-control" placeholder="Phone Number" value={phoneNumber} required
                       onChange={event => setPhoneNumber(event.target.valueAsNumber)}
                />
                <br/>

                <input type="email" className="form-control" placeholder="Email" value={email} required
                       onChange={event => setEmail(event.target.value)}
                />
                <br/>

                <br/><br/>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>

        </div>
    )
}

export default EmployeeCreate
