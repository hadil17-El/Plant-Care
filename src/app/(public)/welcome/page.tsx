"use client"
import { useRouter } from "next/navigation"
import Image from "next/image"
import "../launch.css"

export default function Welcome() {
    const router = useRouter()

    return(
        <div className="welcome-container">
            <Image
                src="/garding.jpg"
                alt="Gardening Illustration"
                width={250}
                height={250}
                className="welcome-img fade-up"/>

            <h2 className="welcome-title fade-up delay-1">
                Bring <span className="highlight">Nature</span> Closer to You
            </h2>
                    <p className="welcome-text fade-up delay-2">
                    Discover plants, tools, and tips to make your gardening easier and joyful.
                    </p>
            <button className="get-started-btn fade-up delay-3"
                    onClick={() => router.push("/home")}>
                Get Started
            </button>
        </div>
    )
}