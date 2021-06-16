import React, { useState, useEffect } from 'react'
import "../../assets/css/product.css"
import { Button, Card } from "../../components"
// import miniDrone from "../../assets/img/mini_drone.png"
import * as Yup from 'yup';
import { useFormik } from "formik";
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux'
import { deleteProduct, getProduct, insertProduct, updateProduct } from "../../configs/Redux/action/product"


export default function Product() {
    const dispatch = useDispatch()
    const [clickModal, SetClickModal] = useState(false)
    const [clickModalUpdate, SetClickModalUpdate] = useState(false)
    const [idProduct, setIdProduct] = useState(null)
    const [error, setError] = useState(false)
    const [load, setLoad] = useState(true);
    const [dataProduct, setDataProduct] = useState([])
    const [dataImage, setDataImage] = useState({
        image: {},
    });
    const handleClickImage = (event) => {
        if (event.target.files.length <= 0) {
            return setError(true)
        } else {
            if (event.target.files[0].size > 100000) {
                setError(true)
            } else {
                setError(false)
                setDataImage({
                    image: event.target.files[0],
                });
            }
        }
    };
    const handleClickModal = () => {
        SetClickModal(true)
    }
    const handleClickModalUpdate = (id) => {
        setIdProduct(id)
        SetClickModalUpdate(true)
    }
    const inputNumber = /^\d+$/

    const formik = useFormik({
        initialValues: {
            nameProduct: "",
            purchasePrice: "",
            sellingPrice: "",
            stock: ""
        },
        validationSchema: Yup.object({
            nameProduct: Yup.string()
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            purchasePrice: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            sellingPrice: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            stock: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(1, "Minimum 1 characters")
                .required("Required!"),

        }),
        onSubmit: values => {
            const formData = new FormData();
            formData.append("nameProduct", values.nameProduct);
            formData.append("purchasePrice", values.purchasePrice);
            formData.append("sellingPrice", values.sellingPrice);
            formData.append("stock", values.stock);
            formData.append("image", dataImage.image);
            dispatch(insertProduct(formData))
                .then((res) => {
                    if (res.data.message === "Uploaded file must be png, jpg or jpeg file") {
                        Swal.fire({
                            title: "Error!",
                            text: res.data.message,
                            icon: "error",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#6a4029",
                        });
                    } else {
                        Swal.fire({
                            title: "Success!",
                            text: res.data.message,
                            icon: "success",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#ffba33",
                        }).then((result) => {
                            setLoad(true)
                        });
                    }
                })
                .catch((err) => {

                    Swal.fire({
                        title: "Error!",
                        text: err.response.data.message,
                        icon: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#6a4029",
                    });
                });
        }
    });
    const formikUpdate = useFormik({
        initialValues: {
            nameProduct: "",
            purchasePrice: "",
            sellingPrice: "",
            stock: ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            nameProduct: Yup.string()
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            purchasePrice: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            sellingPrice: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(4, "Minimum 4 characters")
                .required("Required!"),
            stock: Yup.string().matches(inputNumber, 'Please input with type "number"')
                .min(1, "Minimum 1 characters")
                .required("Required!"),

        }),
        onSubmit: values => {
            const formData = new FormData();
            formData.append("nameProduct", values.nameProduct);
            formData.append("purchasePrice", values.purchasePrice);
            formData.append("sellingPrice", values.sellingPrice);
            formData.append("stock", values.stock);
            formData.append("image", dataImage.image);
            dispatch(updateProduct(formData, idProduct))
                .then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Uploaded file must be png, jpg or jpeg file") {
                        Swal.fire({
                            title: "Error!",
                            text: res.data.message,
                            icon: "error",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#6a4029",
                        });
                    } else {
                        Swal.fire({
                            title: "Success!",
                            text: res.data.status,
                            icon: "success",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#ffba33",
                        }).then((result) => {
                            setLoad(true)
                        });
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        title: "Error!",
                        text: err.response.data.status,
                        icon: "error",
                        confirmButtonText: "Ok",
                        confirmButtonColor: "#6a4029",
                    });
                });
        }
    });
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                    .then((res) => {
                        // dispatch(getProduct())
                        setLoad(true)
                        Swal.fire({
                            title: "Success!",
                            text: res.data.message,
                            icon: "success",
                            confirmButtonText: "Ok",
                            confirmButtonColor: "#ffba33",
                        })
                    })
            }
        });
    }

    useEffect(() => {
        dispatch(getProduct()).then((res) => {
            setDataProduct(res.data.data.result)
        })
    }, [dispatch])

    useEffect(() => {
        if (load) {
            dispatch(getProduct())
                .then((res) => {
                    setDataProduct(res.data.data.result)
                })
                .then(() => setLoad(false))
                .catch(() => {
                    setLoad(false);
                });
        }
    }, [load, dispatch]);

    return (
        <div className="product">
            <div className="container">
                <h1>List of Product</h1>
                <button type="button" className="product-btn" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleClickModal}>
                    Add Product
                </button>
                <div className="container mt-5">
                    <div className="row ">
                        {dataProduct &&
                            dataProduct.map((item, index) => {
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
                                                    <div className="d-flex justify-content-center">
                                                        <Button btn="delete" title="delete" onClick={() => handleDelete(item.id)} />
                                                        <button type="button" className="update" data-toggle="modal" data-target="#exampleModalCenters" onClick={() => handleClickModalUpdate(item.id)}>
                                                            update
                                                        </button>
                                                    </div>
                                                </>
                                            } />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {clickModal &&
                    <>
                        <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Add Product</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="mt-4" onSubmit={formik.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="nameProduct">Product Name</label>
                                                <input
                                                    type="nameProduct"
                                                    className="form-control"
                                                    name="nameProduct"
                                                    id="nameProduct"
                                                    placeholder="Enter your product name"
                                                    value={formik.values.nameProduct}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.nameProduct && formik.touched.nameProduct && (
                                                    <p className="error">{formik.errors.nameProduct}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="purchasePrice">Purchase Price</label>
                                                <input
                                                    type="purchasePrice"
                                                    className="form-control"
                                                    name="purchasePrice"
                                                    id="purchasePrice"
                                                    placeholder="Enter your purchase price"
                                                    value={formik.values.purchasePrice}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.purchasePrice && formik.touched.purchasePrice && (
                                                    <p className="error">{formik.errors.purchasePrice}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="sellingPrice">Selling Price</label>
                                                <input
                                                    type="sellingPrice"
                                                    className="form-control"
                                                    name="sellingPrice"
                                                    id="sellingPrice"
                                                    placeholder="Enter your selling price"
                                                    value={formik.values.sellingPrice}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.sellingPrice && formik.touched.sellingPrice && (
                                                    <p className="error">{formik.errors.sellingPrice}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock</label>
                                                <input
                                                    type="stock"
                                                    className="form-control"
                                                    name="stock"
                                                    id="stock"
                                                    placeholder="Enter your stock product"
                                                    value={formik.values.stock}
                                                    onChange={formik.handleChange}
                                                />
                                                {formik.errors.stock && formik.touched.stock && (
                                                    <p className="error">{formik.errors.stock}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    // value={formik.values.image}
                                                    onChange={handleClickImage}
                                                />
                                                {error && <p className="error">Your picture is too big.</p>}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary" >Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
                {clickModalUpdate &&
                    <>
                        <div className="modal fade" id="exampleModalCenters" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLongTitle">Add Product</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form className="mt-4" onSubmit={formikUpdate.handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="nameProduct">Product Name</label>
                                                <input
                                                    type="nameProduct"
                                                    className="form-control"
                                                    name="nameProduct"
                                                    id="nameProduct"
                                                    placeholder="Enter your product name"
                                                    value={formikUpdate.values.nameProduct}
                                                    onChange={formikUpdate.handleChange}
                                                />
                                                {formikUpdate.errors.nameProduct && formikUpdate.touched.nameProduct && (
                                                    <p className="error">{formikUpdate.errors.nameProduct}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="purchasePrice">Purchase Price</label>
                                                <input
                                                    type="purchasePrice"
                                                    className="form-control"
                                                    name="purchasePrice"
                                                    id="purchasePrice"
                                                    placeholder="Enter your purchase price"
                                                    value={formikUpdate.values.purchasePrice}
                                                    onChange={formikUpdate.handleChange}
                                                />
                                                {formikUpdate.errors.purchasePrice && formikUpdate.touched.purchasePrice && (
                                                    <p className="error">{formikUpdate.errors.purchasePrice}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="sellingPrice">Selling Price</label>
                                                <input
                                                    type="sellingPrice"
                                                    className="form-control"
                                                    name="sellingPrice"
                                                    id="sellingPrice"
                                                    placeholder="Enter your selling price"
                                                    value={formikUpdate.values.sellingPrice}
                                                    onChange={formikUpdate.handleChange}
                                                />
                                                {formikUpdate.errors.sellingPrice && formikUpdate.touched.sellingPrice && (
                                                    <p className="error">{formikUpdate.errors.sellingPrice}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="stock">Stock</label>
                                                <input
                                                    type="stock"
                                                    className="form-control"
                                                    name="stock"
                                                    id="stock"
                                                    placeholder="Enter your stock product"
                                                    value={formikUpdate.values.stock}
                                                    onChange={formikUpdate.handleChange}
                                                />
                                                {formikUpdate.errors.stock && formikUpdate.touched.stock && (
                                                    <p className="error">{formikUpdate.errors.stock}</p>
                                                )}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    // value={formik.values.image}
                                                    onChange={handleClickImage}
                                                />
                                                {error && <p className="error">Your picture is too big.</p>}
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary"  >Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            <style jsx>
                {`
                .error{
                    color:red;
                }
                `}
            </style>
        </div >
    )
}
