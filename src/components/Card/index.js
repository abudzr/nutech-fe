import React from "react"
import "../../assets/css/card.css"

function Button({ content, card }) {
    return (
        <div className={card}>
            {content}
        </div>
    )
}

export default Button