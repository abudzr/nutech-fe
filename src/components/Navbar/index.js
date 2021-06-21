import { React, useState } from "react";
import "../../assets/css/navbar.css"
import logo from "../../assets/img/Logo.png"
import { NavLink, useHistory } from 'react-router-dom'
import styled from "styled-components";
import { useDispatch } from "react-redux";

function Navbar() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [state, setState] = useState({
        navbarMobileToggle: false,
        dropdownToggle: false,
        openWindowNavbar: false,
    });

    const handleSearch = (event) => {
        console.log(event);
        dispatch({
            type: "SET_QUERY_SEARCH_PRODUCT",
            payload: event.target.value,
        });
        if (event.target.value.length > 0) {
            history.push("/product");
        }
    }
    const toggleOpenNavbarMobile = () => {
        setState({ ...state, navbarMobileToggle: true });
    };
    const toggleCloseNavbarMobile = () => {
        setState({ ...state, navbarMobileToggle: false });
    };

    const NavUnlisted = styled.ul`
    display: flex;
  
    a {
      text-decoration: none;
    }
  
    li {
        font-style: normal;
        font-weight: normal;
        font-size: 18px;
        line-height: 21px;
        color: #0A1329;
        margin: 0 0.8rem;
        position: relative;
        list-style: none;
    }
  
    .current {
      li {
        border-bottom: 2px solid #315BC7;
      }
    }
  `;

    return (
        <>
            {/* mobile */}
            <div >
                <div
                    className={
                        state.navbarMobileToggle === true
                            ? "navbarMobile navbarMobile-show hide-lg"
                            : "navbarMobile navbarMobile-hide hide-lg"
                    }
                >
                    <div className="d-flex justify-content-end w-100">
                        <button
                            className="material-icons bg-transparent border-0 text-danger my-5"
                            onClick={toggleCloseNavbarMobile}
                        >
                            close
                        </button>
                    </div>
                    <div className="ml-2 flex justify-content-end">
                        <NavUnlisted>
                            <NavLink to="/" activeClassName="current" exact>
                                <li>Home</li>
                            </NavLink>
                            <NavLink to="/product" activeClassName="current" exact>
                                <li>Product</li>
                            </NavLink>
                        </NavUnlisted>
                    </div>
                    <div className="rounded-md border p-2 d-flex mb-4">
                        <input
                            type="text"
                            className="border-0 me-2 px-2 w-100"
                            style={{ outline: "none" }}
                            placeholder="search"
                            onKeyUp={(event) => handleSearch(event)}
                        />
                        <i className="icon-search fa fa-search" />
                    </div>

                </div>
            </div>

            {/* dekstop */}
            <div className="rectangle">
                <div className="container d-flex justify-content-between pt-2">
                    <div className="d-flex">
                        <img src={logo} width="59" height="27.53" alt="logo" />
                        <p className="ml-3">DroneshopID</p>
                    </div>
                    <div className="d-flex hide-mobile  ">
                        <div className="rounded-md p-2 d-flex input-search">
                            <input
                                type="text"
                                className="border-0 mr-2 "
                                style={{ outline: "none" }}
                                placeholder="search"
                                onKeyUp={(event) => handleSearch(event)}
                            />
                            <i className="icon-search fa fa-search" />
                        </div>
                        <div>
                            <NavUnlisted>
                                <NavLink to="/" activeClassName="current" exact>
                                    <li>Home</li>
                                </NavLink>
                                <NavLink to="/product" activeClassName="current" exact>
                                    <li>Product</li>
                                </NavLink>
                            </NavUnlisted>
                        </div>
                    </div>
                    <div className="hide-lg hide-xl hide-md">
                        <div className="d-flex">
                            <button
                                className=" border-0"
                                onClick={toggleOpenNavbarMobile}
                            >
                                <i className="fa fa-bars" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {/* siluet, layar hitam ketika navbar mobile keluar */}
            <div
                className={
                    state.navbarMobileToggle === true ? "position-fixed hide-lg" : "hide"
                }
                style={{
                    width: "100vw",
                    height: "100vh",
                    top: 0,
                    right: 0,
                    zIndex: "999",
                    background: "rgba(0,0,0,.6)",
                }}
                onClick={toggleCloseNavbarMobile}
            ></div>
            {/*  */}
        </>
    )
}
export default Navbar;