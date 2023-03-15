import { useEffect, useState } from "react";
import "../ForgotPassword/forgotpassword.css"
import { Link, useLocation } from "react-router-dom";
import "../ForgotPassword/forgotpassword.css"

function Detail({ type, onClickDetail }) {
    const location = useLocation();
    const [list, setList] = useState([{}])
    const [searchValue, setSearchValue] = useState('')
    const [money, setMoney] = useState(20000000)
    useEffect(() => {
        const getIdType = () => {
            fetch(`http://localhost:5000${location.pathname}`)
                .then((res) => res.json())
                .then((data) => {
                    const searchList = data.category.filter((item) => {
                        return (item.name.includes(searchValue) && (item.price > 0 && item.price < money))
                    })
                    setList(searchList)
                })
        }
        getIdType()
    }, [searchValue, money, location.pathname])
    const detailClick = (item) => {
        onClickDetail(item)
    }
    return (
        <div>
            <div className="main">
                <label>Search:</label>
                <input type="text"
                    placeholder="search"
                    style={{ padding: 10, marginRight: 100 }}
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value)
                    }}
                />
                <div className="range">
                    {(type === 'dogs' || type === 'cats') && (
                        <>0 < input type="range"
                            min="0"
                            max="20000000"
                            step="1000000"
                            value={money}
                            onChange={(e) => {
                                setMoney(e.target.value)
                            }}
                        /> 20.000.000
                            <span className="money">{money}</span>

                        </>
                    )}
                    {(type === 'food' || type === 'supplies') && (
                        <>0 < input type="range"
                            min="0"
                            max="1000000"
                            step="50000"
                            value={money}
                            onChange={(e) => {
                                setMoney(e.target.value)
                            }}
                        /> 1.000.000
                            <span className="money">{money}</span>

                        </>
                    )}
                </div>
                <div className="cards">
                    {
                        list.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cards_item"
                                    style={{ textDecoration: "none" }}
                                >

                                    <div className="card">
                                        <div className="card_image"><img src={item.image} alt="" /></div>
                                        <div className="card_content">
                                            <h2 className="card_title">{item.name}</h2>
                                            <p className="card_text_detail">Price: {item.price}$</p>
                                            <p className="card_text">{item.dob ? "Dob: " : "Quantity: "} {item.dob || item.quantity}</p>
                                            <Link
                                                to={`/${type}/${item.id}/${item.code}`}
                                                style={{ textDecoration: "none" }}
                                            >
                                                <button
                                                    className="btn card_btn"
                                                    onClick={() => detailClick(item)}
                                                >Detail</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Detail