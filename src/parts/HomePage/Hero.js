import React from "react"

// css
import "../../assets/css/home.css"

// import picture
import droneHero from "../../assets/img/hero-image.png"

// import button
import { Button } from "../../components"

function Hero() {
    const handleClickGetNow = () => {
        window.scrollTo({ top: 800, behavior: "smooth" })
    }

    return (
        <>
            <div className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="text-hero">
                                <h1 className="title-hero">Representing Drone Light</h1>
                                <p className="subtitle-hero">Look up the sky and beautiful world with simple navigation. Just record and get a lot memories to share, lightly and fast like a lightning.</p>
                                <Button
                                    btn="getnow"
                                    title="Get Now"
                                    onClick={handleClickGetNow}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img className="drone-hero" height="500" width="652" src={droneHero} alt="drone" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero