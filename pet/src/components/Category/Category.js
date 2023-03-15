import { Link } from "react-router-dom";
import "./category.css"
function Category(props) {
    const { list, type, getIdType } = props
    const getIdCategory = (id) => {
        getIdType(id);
    }
    return (
        <div className="main">
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
                                    <div className="card_image"><img src={item.image} /></div>
                                    <div className="card_content">
                                        <h2 className="card_title">{item.name}</h2>
                                        <p className="card_text">{item.description}</p>
                                        <Link
                                            to={`/${type}/${item.id}`}
                                            style={{ textDecoration: "none" }}
                                        ><button
                                            className="btn card_btn"
                                            onClick={() => getIdCategory(item.id)}
                                        >Xem Chi Tiết</button></Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Category