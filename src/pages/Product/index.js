import React from "react"
import { Footer, Navbar, ScrollToTop } from "../../components"
import Product from "../../parts/Product/Product"

function product() {
    return (
        <>
            <Navbar />
            <Product />
            <ScrollToTop />
            {/* <Content /> */}
            <Footer />
        </>
    )
}

export default product