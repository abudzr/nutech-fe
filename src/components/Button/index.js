import React from "react"
import "../../assets/css/button.css"

function Button({ title, btn, onClick }) {
    return (
        <div>
            <button className={btn} onClick={onClick}>
                {title}
            </button>
        </div>
    )
}

export default Button