import { useState } from "react"
import { Link } from "react-router-dom"
import Information from "../Information/Information"
import Login from "../Login/Login"
import "./navbar.css"
function NavBar(props) {
    const { type, handleType, checked, handleLoginChecked, logoutUser } = props

    const [active, setActive] = useState()

    const handleSetType = (type) => {
        handleType(type)
        setActive(type)
    }
    const handleLogout = () => {
        handleLoginChecked(false)
        logoutUser(false)
    }
    return (
        <nav className="navbar">
            <Link to="/">home</Link>
            {
                type.map((item, index) => {
                    return (
                        <Link
                            key={index}
                            to={item}
                            style={active === item ? { color: 'green' } : {}}
                            onClick={() => handleSetType(item)}
                        >{item}</Link>
                    )
                })
            }
            <Link to="/cart">cart</Link>
            {!checked && <Link to="/login" element={<Login />}>
                <button >Login</button>
            </Link>}
            {checked && <button onClick={() => handleLogout()}>Logout</button>}
            {checked && <Link to="/information" element={<Information />}>
                <button >Information</button>
            </Link>}
        </nav>

    )

}

export default NavBar