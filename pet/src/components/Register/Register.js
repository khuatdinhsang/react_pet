import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import "./register.css"
function Register() {

    const url = "http://localhost:5000/users"
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState()
    const [gender, setGender] = useState('male')
    const [address, setAddress] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRepassword] = useState('')
    const [checked, setCheck] = useState('')
    const [test, setTest] = useState('')



    const SubmitRegister = async () => {
        if (firstName === '' || lastName === '' || age === '' || address === '' ||
            username === '' || password === '' || rePassword === '') {
            alert('Điền đầy đủ đi em để a còn biết em là ai chứ')
        } else {
            if (password !== rePassword) {
                alert('Mk deo trung nhau')
            } else {
                await axios.post(url, {
                    id: uuidv4(),
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    gender: gender,
                    address: address,
                    username: username,
                    password: password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(() => {
                        ClearSubmitRegister()
                        alert("Thông tin của em đã được lưu")
                        navigate("/")
                    })
            }
        }

    }
    const ClearSubmitRegister = () => {
        setFirstName('')
        setLastName('')
        setAge('')
        setGender('')
        setAddress('')
        setUsername('')
        setPassword('')
        setRepassword('')

    }
    return (
        <div className="login">
            <h1>Information </h1>
            FirstName: <input
                type="text"
                placeholder="Firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            /> <br />
            LastName:<input
                type="text"
                placeholder="Lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)} />
            <br />
            Age: <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
            /> <br />
            Gender : <input
                type="radio"
                name="gender"
                value="male"
                checked
                onChange={(e) => setGender(e.target.value)}
            /> Male
            <input
                type="radio"
                name="gender"
                value="female"
                onChange={(e) => setGender(e.target.value)}
            /> Female <br />
            Address: <input
                type="text"
                placeholder="address"
                onChange={(e) => setAddress(e.target.value)} />
            <br />
            <h1> Account</h1>
            Username: <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br />
            Password:<input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /> <br />
            Re-Password:<input
                type="password"
                value={rePassword}
                placeholder="re-password"
                onChange={(e) => setRepassword(e.target.value)}
            /> <br />
            <div className="btn_register">
                <button onClick={() => SubmitRegister()} >Save</button>
                <button onClick={() => ClearSubmitRegister()}>Clear All</button>
            </div>

        </div>
    )

}
export default Register