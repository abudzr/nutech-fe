import React, { useState, useEffect } from "react"
import { useWindowScroll } from "react-use"

function ScrollToTop() {
    const { y: pageYoffset } = useWindowScroll();
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (pageYoffset > 300) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [pageYoffset])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    if (!visible) {
        return false
    }

    return (
        <div className="scroll-to-top cursor-pointer text-center" onClick={scrollToTop}>
            <i className="icon fa fa-angle-up"></i>
        </div>
    )
}

export default ScrollToTop
