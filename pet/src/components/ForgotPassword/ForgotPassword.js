import { useEffect, useState } from "react"
import "./forgotpassword.css"
import { useNavigate } from "react-router-dom"
function ForgotPassword({ onChangePassword }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repassword, setRepassword] = useState('')
    const [listUser, setListUser] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:3000/users`)
            .then((res) => res.json())
            .then((data) => {
                setListUser(data)
            })
    }, [])


    const changePassword = () => {
        const user = listUser.find((user) => {
            return user.username === username
        })
        if (!user) {
            alert("deo tim thay thang nao co ten la: " + username)
        } else {
            if (password !== repassword) {
                alert("Mk deo trung nhau")
            } else {
                alert("mk cua m da duoc cap nhap thanh cong")
                onChangePassword({ id: user.id, password: password })
                navigate('/login')
            }

        }

    }
    return (
        <div className="login">
            <h1>Change password</h1>
            username: <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            /> <br />
            password: <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            /><br />
            newPassword: <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
            /><br />
            <button onClick={() => changePassword()}>Save</button>
        </div >
    )
}
export default ForgotPassword