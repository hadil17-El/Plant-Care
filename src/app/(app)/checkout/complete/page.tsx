"use client"

import { div } from "framer-motion/client"
import { CircleCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import "./complet-page.css"
import { FaCheckCircle } from "react-icons/fa"
import { useEffect } from "react"
export default function PaymentCompletPage() {
    const router = useRouter()
    useEffect(()=>{
        /**
         * 📌 Perché così:

useEffect parte quando la pagina è montata

setTimeout aspetta 7s

router.push("/home") fa il redirect

clearTimeout evita memory leak se l’utente lascia la pagina prima
         */
        const timer = setTimeout(()=>{
            router.push("/home")
        },4000)

        return ()=>clearTimeout(timer)
    },[router])
    return (
        <div className="complet-page">
            <FaCheckCircle className="success-icon"   style={{color:" #388e4a"}} size={204}/>

            <h1>Payment Complete</h1>
            <p>Thank you for shopping with us!</p>

        </div>
    )
    
}