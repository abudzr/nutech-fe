import React from "react"
import { Footer, Navbar, ScrollToTop } from "../../components"
import Content from "../../parts/HomePage/Content"
import Hero from "../../parts/HomePage/Hero"

function home() {
    return (
        <>
            <Navbar />
            <Hero />
            <ScrollToTop />
            <Content />
            <Footer />
        </>
    )
}

export default home