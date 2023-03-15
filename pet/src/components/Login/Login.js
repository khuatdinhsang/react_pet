import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./login.css"
function Login(props) {
    const { OnLoginChecked, infoUser, OnLogin } = props
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [listUser, setListUser] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:5000/users`)
            .then((res) => res.json())
            .then((data) => {
                setListUser(data)
            })
    }, [])
    const handleLogin = () => {
        const user = listUser.find((user, index) => user.username === username &&
            user.password === password)
        if (user) {
            if (user.username === username && user.password === password) {
                OnLoginChecked(true)
                OnLogin(true)
                infoUser(user)
                navigate("/")
            }
        } else {
            alert("wrong username or password")

        }
    }
    return (
        <div className="login">
            username: <input
                type="text"
                placeholder="username"
                onChange={(e) => setUserName(e.target.value)}
                value={username}
            /> <br />
            password:<input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn_login_father">
                <button
                    className="btn_login"
                    onClick={() => handleLogin()}
                >Đăng nhập</button>
                <Link to="/register">
                    <button className="btn_login">Đăng kí</button>
                </Link>
                <Link to="/forgotPassword">
                    <button className="btn_login">Quên mk</button>
                </Link>
            </div>
        </div>
    )

}
export default Login