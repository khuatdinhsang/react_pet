import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home/Home';
import Cart from './components/Cart/Cart';
import NavBar from './components/NavBar/NavBar';
import { useEffect, useState } from 'react';
import Category from './components/Category/Category';
import Detail from './components/Detail/Detail';
import VeryDetail from './components/VeryDetail/VeryDetail';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Information from './components/Information/Information';
import axios from 'axios';
import Checkout from './components/Checkout/Checkout';

function App() {
  const typeApi = ['dogs', 'cats', 'food', 'supplies'];
  const [type, setType] = useState('dogs');
  const [list, setList] = useState([{}])
  const [listId, setListId] = useState([{}])
  const [item, setItem] = useState({})
  const [idCate, setIdCate] = useState('')
  const [checked, setChecked] = useState(false)
  const [user, setUser] = useState({})
  const [logoutInfo, setLogoutInfo] = useState(true)
  const [isLogin, setIsLogin] = useState(false)
  const [totalMoney, setTotalMoney] = useState(0)
  const [cartList, setCartList] = useState(() => {
    return localStorage.getItem('listCart') ? JSON.parse(localStorage.getItem('listCart')) : []
  });
  useEffect(() => {
    fetch(`http://localhost:5000/${type}`)
      .then((res) => res.json())
      .then((data) => {
        setList(data)
      })
  }, [type])
  const handleLoginChecked = (data) => {
    setLogoutInfo(true)
    setChecked(data)
    setIsLogin(false)
  }
  const handleType = (type) => {
    setType(type)
  }

  const getIdType = (id) => {
    setIdCate(id)
  }
  const clickDetail = (data) => {
    setItem(data)
  }
  const infoUser = (data) => {
    setUser(data)
  }
  const logoutUser = (data) => {
    setLogoutInfo(data)
  }
  const editInfo = (data) => {
    console.log(data)
    const newInfo = {
      ...user,
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      gender: data.gender,
      address: data.address,
    }
    axios.put(`http://localhost:5000/users/${newInfo.id}`, newInfo)
      .then(res => setUser(res));
  }
  const editAccount = (data) => {
    console.log(data)
    const newInfo = {
      ...user,
      id: data.id,
      password: data.password
    }
    axios.put(`http://localhost:5000/users/${newInfo.id}`, newInfo)
      .then(res => setUser(res));
  }

  const onAddToCart = (data) => {
    setCartList(data)
  }
  const OnRemoveCart = (id) => {
    const newList = [...cartList];
    newList.splice(id, 1);
    setCartList(newList)
    localStorage.setItem('listCart', JSON.stringify(newList))
  }

  const handleIsLogin = (data) => {
    setIsLogin(data);
  }

  const onTotalMoney = (data) => {
    setTotalMoney(data)
  }
  const onBuyOrder = (data) => {
    data ? setCartList([]) : setCartList(JSON.stringify(localStorage.getItem('listCart')))
  }

  return (
    <Router>
      <NavBar logoutUser={logoutUser} type={typeApi} handleType={handleType} checked={checked} handleLoginChecked={handleLoginChecked} />
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Home getIdType={getIdType} />} exact />
          <Route path="/dogs" element={<Category
            listId={listId}
            getIdType={getIdType}
            list={list}
            type={type}
          />} />
          <Route path="/cats" element={<Category
            listId={listId}
            getIdType={getIdType}
            list={list}
            type={type}
          />} />
          <Route path="/food" element={<Category
            listId={listId}
            getIdType={getIdType}
            list={list}
            type={type}
          />} />
          <Route path="/supplies" element={<Category
            listId={listId}
            getIdType={getIdType}
            list={list}
            type={type}
          />} />
          <Route path="/cart" element={<Cart isLogin={isLogin} onTotalMoney={onTotalMoney} user={user} OnRemoveCart={OnRemoveCart} cartList={cartList} onAddToCart={onAddToCart} />} />
          {typeApi.map((t, index) =>
            <Route key={index} path={`/${t}/:id`} element={<Detail type={type} onClickDetail={clickDetail} />} />
          )}
          {typeApi.map((t, index) =>
            <Route key={index} path={`/${t}/:id/:id`} element={<VeryDetail isLogin={isLogin} cartList={cartList} onAddToCart={onAddToCart} item={item} type={type} idCate={idCate} onClickDetail={clickDetail} />} />
          )}
          <Route path="/login" element={<Login OnLogin={handleIsLogin} OnLoginChecked={handleLoginChecked} infoUser={infoUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword onChangePassword={editAccount} />} />
          <Route path="/information" element={<Information editAccount={editAccount} user={user} logoutInfo={logoutInfo} editInfo={editInfo} />} />
          <Route path="/checkout" element={<Checkout onBuyOrder={onBuyOrder} totalMoney={totalMoney} user={user} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
