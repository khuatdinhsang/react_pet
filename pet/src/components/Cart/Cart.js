import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./cart.scss"
function Cart({ isLogin, cartList, OnRemoveCart, onAddToCart, onTotalMoney }) {
    const negative = useNavigate()

    const IncreaseQuantity = (item) => {
        const newCartList = cartList.map((i) => i.id === item.id ? { ...i, quantityOrder: i.quantityOrder + 1 } : i)
        onAddToCart(newCartList)
    }
    const DecreaseQuantity = (item) => {

        const newCartList = cartList.map((i) => i.id === item.id ? { ...i, quantityOrder: i.quantityOrder - 1 } : i)
        onAddToCart(newCartList)
    }
    const handleRemoveCart = (id) => {
        OnRemoveCart(id)
    }
    const totalMoney = cartList.reduce((result, product) => {
        return result + product.quantityOrder * product.price
    }, 0)
    useEffect(() => {
        onTotalMoney(totalMoney * 1.05 + 20000)
    })
    const handleCheckout = () => {
        console.log(isLogin);
        if (isLogin) {
            negative('/checkout')
        } else {
            alert("may phai login da")
            negative('/login')
        }
    }
    return (
        <div>
            {
                cartList.length > 0 ? (<div>
                    <header id="site-header">
                        <div className="container">
                            <h1>Shopping cart</h1>
                        </div>
                    </header>
                    <div className="container">
                        <section id="cart">
                            {cartList.map((item, index) => {
                                return (
                                    <article className="product" key={index}>
                                        <header>
                                            <a className="remove">
                                                <img src={item.image} alt="" />
                                                <h3><button onClick={() => handleRemoveCart(index)}>Remove product</button></h3>
                                            </a>
                                        </header>
                                        <div className="content">
                                            <h1>{item.name}</h1>
                                            <h1>Code :{item.code}</h1>
                                        </div>
                                        <footer className="content">
                                            <span className="qt-minus" onClick={() => {
                                                if (item.quantityOrder > 1) {
                                                    DecreaseQuantity(item)
                                                } else {
                                                    handleRemoveCart(index)
                                                }
                                            }}>-</span>
                                            <span className="qt">{item.quantityOrder}</span>
                                            <span className="qt-plus" onClick={() => {
                                                if (item.quantityOrder < item.quantity) {
                                                    IncreaseQuantity(item)
                                                }
                                            }}>+</span>
                                            <h2 className="full-price">
                                                {item.price * item.quantityOrder} VND
                                            </h2>
                                            <h2 className="price">
                                                {item.price} VND
                                            </h2>
                                        </footer>
                                    </article>
                                )
                            })}
                        </section>
                    </div>
                    <footer id="site-footer">
                        <div className="container clearfix">
                            <div className="left">
                                <h2 className="subtotal">Subtotal: <span>{totalMoney}</span>VND</h2>
                                <h3 className="tax">Taxes (5%): <span>{totalMoney * 1.05}</span>VND</h3>
                                <h3 className="shipping">Shipping: <span>20000</span>VND</h3>
                            </div>
                            <div className="right">
                                <h1 className="total">Total: <span>{totalMoney * 1.05 + 20000}</span>VND</h1>
                                <button style={{ padding: 10, backgroundColor: '#53b5aa', color: 'white' }} onClick={() => handleCheckout()}>Checkout</button>
                            </div>
                        </div>
                    </footer>
                </div>) : 'Khong co san pham'
            }
        </div >
    )
}
export default Cart