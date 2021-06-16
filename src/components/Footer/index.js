import { React } from "react";
import "../../assets/css/footer.css"
import Logo from "../../assets/img/Logo-footer.png"

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="container d-flex justify-content-between">
                    <div className="d-flex">
                        <img width="68" height="32" src={Logo} alt="logo" />
                        <p className="footer-title">DroneshopID</p>
                    </div>
                    <p className="version">alpha version 0.1</p>
                </div>
            </div>
        </>
    )
}
export default Footer;