import { useRef, useState } from "react"


function Information({ user, logoutInfo, editInfo, editAccount }) {
    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [age, setAge] = useState(user.age)
    const [gender, setGender] = useState(user.gender)
    const [address, setAddress] = useState(user.address)
    const [password, setPassword] = useState(user.password)
    const [rePassword, setRePassword] = useState()
    const [toggleBtn, setToggleBtn] = useState(false)
    const [togglePassword, setTogglePassword] = useState(false)
    const firstRef = useRef()
    const lastRef = useRef()
    const ageRef = useRef()
    const genderRef = useRef()
    const addressRef = useRef()
    const handleEdit = () => {
        firstRef.current.disabled = false
        firstRef.current.focus()
        lastRef.current.disabled = false
        ageRef.current.disabled = false
        addressRef.current.disabled = false
        setToggleBtn(true)

    }
    const resetEdit = () => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setAge(user.age)
    }
    const saveEditInfo = () => {
        const newUser = {
            id: user.id,
            firstName,
            lastName,
            age,
            gender,
            address,
        }
        editInfo(newUser)
        alert("thong tin da duoc cap nhat")
        firstRef.current.disabled = true
        lastRef.current.disabled = true
        ageRef.current.disabled = true
        addressRef.current.disabled = true
        setToggleBtn(false)
    }
    const toggleChangPass = () => {
        setTogglePassword(true)

    }
    const handleChangePass = () => {
        if (rePassword !== password) {
            alert("Passwords do not match")
        } else {
            setTogglePassword(false)
            const account = {
                id: user.id,
                username: user.username,
                password: password
            }
            console.log("acc", account);
            editAccount(account)
            alert("Mk da dc cap nhap")
        }
    }
    return (
        <div>
            {logoutInfo ? (<div>
                <h1>Information </h1>
                Firstname: <input
                    type="text"
                    value={firstName}
                    disabled
                    ref={firstRef}
                    onChange={(e) => setFirstName(e.target.value)}

                /><br />
                Lastname: <input
                    type="text"
                    value={lastName}
                    disabled
                    ref={lastRef}
                    onChange={(e) => setLastName(e.target.value)}
                /><br />
                Age: <input
                    type="number"
                    value={age}
                    disabled
                    ref={ageRef}
                    onChange={(e) => setAge(e.target.value)}
                /><br />
                Gender: <input
                    type="radio"
                    value={gender}
                    name="gender"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value)}
                /> Male
                <input
                    type="radio"
                    value={gender}
                    name="gender"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value)}
                /> Female<br />
                Address: <input
                    type="text"
                    value={address}
                    ref={addressRef}
                    disabled
                    onChange={(e) => setAddress(e.target.value)}
                /><br />
                <button onClick={() => handleEdit()}>Edit</button>
                {toggleBtn && <button onClick={() => saveEditInfo()}>Save</button>}
                {toggleBtn && <button onClick={() => resetEdit()}>Reset</button>}
                <h1>Account</h1>
                Username: <input type="text" value={user.username} disabled /><br />
                Password: <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <br />
                {togglePassword && (
                    <div>
                        rePassword : <input
                            type="password"
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                    </div>
                )}
                <button onClick={() => toggleChangPass()}>Change Password</button>
                {togglePassword && <button onClick={() => handleChangePass()}>Save Password</button>}
            </div>) : (
                <div>
                    <p>Bạn chưa đăng nhập</p>
                </div>
            )}
        </div>
    )
}

export default Information