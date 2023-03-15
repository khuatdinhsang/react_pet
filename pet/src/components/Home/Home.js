import { useEffect, useState } from "react"
import axios from "axios"
import "./home.css"
import { Link } from "react-router-dom"
import Login from "../Login/Login"

function Home({ getIdType }) {
    const [listDog, setListDog] = useState([{}])
    const [listCat, setListCat] = useState([{}])

    const getIdCategory = (id) => {
        getIdType(id)
    }
    useEffect(() => {
        fetch(`http://localhost:5000/dogs`)
            .then((res) => res.json())
            .then((data) => {
                setListDog(data)
            })
        fetch(`http://localhost:5000/cats`)
            .then((res) => res.json())
            .then((data) => {
                setListCat(data)
            })
    }, [])

    return (
        <>
            <div style={{ marginTop: 20 }}>
                <div className="container">
                    {/* Showcase */}
                    <header className="showcase">
                        <h1 style={{ color: 'white', fontSize: 50 }}>Dogs</h1>
                        <p style={{ color: 'white', fontSize: 30 }}>
                            Chó là bạn đéo phải thức ăn
                        </p>

                    </header>
                    {/* Home cards 1 */}
                    <section className="home-cards">
                        {
                            listDog.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <img src={item.image} alt="" />
                                        <h3>{item.name}</h3>
                                        <p>
                                            {item.description}
                                        </p>
                                        <Link
                                            to={`/dogs/${item.id}`}
                                            style={{ textDecoration: "none" }}
                                        ><button
                                            className="btn card_btn"
                                            onClick={() => getIdCategory(item.id)}
                                        >Xem Chi Tiết</button></Link>
                                    </div>
                                )
                            })
                        }

                    </section>
                    {/* Xbox */}
                    <section className="xbox">
                        <div className="content">
                            <h2 style={{ color: '#3c0c62', fontSize: 30 }}>Thịt mèo rất ngon, nấu cao thì tuyệt vời</h2>
                            <p style={{ color: '#3c0c62', fontSize: 20 }}>Tránh thịt mèo bởi vì người ta quan niệm rằng nếu ai thịt mèo thì sẽ rất là đen đủi.Mà bọn m cũng có biết thịt đâu :v
                            </p>
                        </div>
                    </section>
                    {/* Home cards 2 */}
                    <section className="home-cards">
                        {listCat.map((item) => {
                            return (
                                <div key={item.id}>
                                    <img src={item.image} alt="" />
                                    <h3>{item.name}</h3>
                                    <p>
                                        {item.description}
                                    </p>
                                    <Link
                                        to={`/dogs/${item.id}`}
                                        style={{ textDecoration: "none" }}
                                    ><button
                                        className="btn card_btn"
                                        onClick={() => getIdCategory(item.id)}
                                    >Xem Chi Tiết</button></Link>
                                </div>
                            )
                        })}
                    </section>
                    {/* Carbon */}
                    <section className="carbon dark">
                        <div className="content">
                            <h2>Thị Chuối</h2>
                            <p>Xin giới thiệu với cm đây là thị chuối, sinh năm 2021, đã có 10 con</p>
                        </div>
                    </section>
                    {/* Follow */}
                    <footer>
                        <div className="footer">
                            Kết bạn với tao fb : Khuất Đình Sáng
                        </div>
                    </footer>
                </div >
            </div >
        </>
    )
}

export default Home