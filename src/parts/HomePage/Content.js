import React, { useEffect, useState } from "react"
// import redux
import { useDispatch } from 'react-redux'
import { getProduct } from "../../configs/Redux/action/product"
import { Card } from "../../components"


// import css
import "../../assets/css/content.css"

function Content() {
    // redux
    const dispatch = useDispatch();

    const [state, setState] = useState(null);
    const [page] = useState(1);
    let [queryLimit] = useState("3");
    let [queryOrder] = useState("asc");
    let [querySort] = useState("nameProduct");
    let [keyword] = useState("")
    useEffect(() => {
        dispatch(getProduct(page, queryLimit, querySort, queryOrder, keyword)).then((res) => {
            setState(res.data.data.result)
        })
    }, [dispatch, page, queryLimit, querySort, queryOrder, keyword]);

    return (
        <>
            <div className="row image-content">
                <div className="col-lg-6 overlay-left">
                    <h1>Ultra Light</h1>
                    <p>Drone move faster with weighing
                        component <span>under 200 g</span></p>
                </div>
                <div className="col-lg-6 overlay-right">
                    <h1>Best Resolution</h1>
                    <p>Take a beautiful view with best camera
                        up to <span>4K Camera Resolution</span></p>
                </div>
            </div>
            <div className="content-product">
                <h1>Products</h1>
                <p>New innovation, best quality than before.<br />
                    make every moment flying operation become unforgettable.</p>
                <div className="container">
                    <div className="row ">
                        {state && state.map((item, index) => {
                            return (
                                <div className="col-lg-4" key={index}>
                                    <Card
                                        card="card-product"
                                        content={
                                            <>
                                                <img src={`${process.env.REACT_APP_API_NUTECH}/${item.image}`} height="240" width="250" alt="mini drone" />
                                                <h3>{item.nameProduct}</h3>
                                                <h4>Harga Jual : Rp{item.sellingPrice}</h4>
                                                <h4>Harga Beli : Rp{item.purchasePrice}</h4>
                                                <h4>Stock : {item.stock}</h4>
                                            </>
                                        } />
                                </div>

                            )
                        })}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Content