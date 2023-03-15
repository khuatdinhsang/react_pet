import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Category/category.css"
import "./verydetail.css"
function VeryDetail({ cartList, item, type, idCate, onClickDetail, onAddToCart, isLogin }) {
    const [listId, setListId] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        fetch(`http://localhost:3000/${type}/${idCate}`)
            .then((res) => res.json())
            .then((data) => {
                setListId(data.category)
            })
    }, [])

    const detailClick = (item) => {
        onClickDetail(item)
    }
    const handleAddToCart = () => {
        if (isLogin) {
            const newItem = { ...item, quantityOrder: 1 }
            const newCartList = [...cartList, newItem]
            localStorage.setItem('listCart', JSON.stringify(newCartList));
            onAddToCart(newCartList)
            alert("da them vao gio hang thanh cong")
        } else {
            alert("ban chua dang nhap")
            navigate("/login")
        }

    }

    return (
        <div>
            <div className="detail">
                <div className="right">
                    <img src={item.image} alt="" ></img>
                </div>
                <div className="left">
                    <div className="content_left">
                        <h3>Code: {item.code}</h3>
                        <h3>Name: {item.name}</h3>
                        <h3>{item.color ? 'Color: ' : ''} {item.color} </h3>
                        <h3>{item.dob ? 'DOB: ' : ''} {item.dob}</h3>
                        <h3>{item.health ? 'Health: ' : ''} {item.health}</h3>
                        <h3>{(item.gender === 0 || item.gender === 1) ? 'Gender: ' : ''} {item.gender !== null ? (item.gender === 0 ? 'Đực' : 'Cái') : ''}</h3>
                        <h3>Price: {item.price}</h3>
                        <h3>Quantity: {item.quantity}</h3>
                    </div>
                    <div className="btn_detail">
                        <button className="btn card_btn" onClick={() => handleAddToCart()}
                        >ADD TO CART
                        </button>
                        <button className="btn card_btn">Mua ngay</button>
                    </div>
                </div>
            </div>
            <h1 className="title_related">Sản phẩm liên quan</h1>
            <div className="main verydetailmain">
                <div className="cards">
                    {
                        listId.map((item, index) => {
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
                                                    onClick={() => detailClick(item, item.id)}
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
export default VeryDetail;