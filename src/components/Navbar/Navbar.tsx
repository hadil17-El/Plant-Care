"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Stethoscope, Leaf, BookOpen, HeartHandshakeIcon, HeartIcon } from "lucide-react"
import "./navbar.css"
import { useFavorites } from "@/app/context/FavoritesContext"
import { FaCartShopping } from "react-icons/fa6"

export default function Navbar() {
    const pathname = usePathname()
    const { favorites } = useFavorites();
    const isActive = (path: string) => pathname === path

    return (
        <nav className="bottom-navbar">
            <div className="nav-content">

                <Link 
                    href="/home" 
                    className={`nav-btn ${isActive("/home") ? "active" : ""}`}
                >
                    <Home size={20} />
                    <span>Home</span>
                </Link>
                {/**
                 *   <div className="center-btn">
                    <Leaf size={28}/>
                         </div>
                 * 
                 */}
                
           
                   <Link 
                    href="/favorites"
                    className={`nav-btn ${isActive("/plants") ? "active" : ""}`}
                >
                    <HeartIcon size={20} />
                    <span>Favourite</span>
                </Link>

                <Link 
                    href="/cart"
                    className={`nav-btn ${isActive("/cart") ? "active" : ""}`}
                >
                    <FaCartShopping size={20}/>
                    <span>Cart</span>
                </Link>

              

           
            </div>
        </nav>
    )
}

/**
 * ${isActive("/diagnose") ? "active" : ""} → aggiungi la classe "active" solo se sei nella pagina /diagnose
 * 
 * Cosa fa isActive() ?

È una funzione che controlla la pagina attuale.

Esempio:

const isActive = (path: string) => pathname === path


La funzione:

legge la "current route" → es: /plants

la confronta con path

Esempio pratico:

Se chiami:

isActive("/plants")


Allora:

se sei nella pagina /plants → true

altrimenti → false
 */