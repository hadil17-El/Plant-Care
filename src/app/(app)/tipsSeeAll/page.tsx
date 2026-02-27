"use client"
import Link from "next/link"
import tips from "@/app/data/tips.json"
import "./tips.css"
import Image from "next/image"
import { useRef } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
export default function TipsPage() {
    /**
     * Cosa fa:

useRef è un hook di React.

Serve per ottenere un riferimento diretto a un elemento del DOM.

In questo caso il riferimento sarà a un <div>.
Perché <HTMLDivElement | null>?

All'inizio il valore è null.

Dopo il render, React assegna a scrollRef.current il div reale.

In pratica:
👉 scrollRef.current diventa il contenitore che vogliamo far scorrere.
     */
const scrollRef = useRef<HTMLDivElement | null>(null)
/**
 * Analizziamola riga per riga:
🔹 scrollRef.current?.

current è il div reale.

?. è l’optional chaining.

Significa: "esegui solo se current NON è null".

🔹 .scrollBy({...})

È un metodo nativo del browser che sposta lo scroll di una certa quantità.
 */
   const scrollLeft = () => {
    /**
     * 🔹 left: -250

Sposta lo scroll di 250 pixel verso sinistra.

Valore negativo = sinistra

Valore positivo = destra

🔹 behavior: "smooth"

Attiva animazione fluida.

Collegamento del ref al div
<div className="tips-list" ref={scrollRef}>

Qui succede la parte fondamentale:

React collega questo div a scrollRef

Dopo il render:

scrollRef.current === questo div

È questo elemento che effettivamente scorre.
     */
        scrollRef.current?.scrollBy({
            left:-250,
            behavior:"smooth"
        })
    }
       const scrollRight = () => {
        scrollRef.current?.scrollBy({
            left: 250,
            behavior:"smooth"
        })
    }
    return (
        <div className="tips-wrapper">
           <button className="arrow left" onClick={scrollLeft}>
                    <FaArrowLeft size={20} color="#2e8b57" />
            </button>
             <button className="arrow right" onClick={scrollRight}>
                    <FaArrowRight size={20} color="#2e8b57" />
                 </button>
            <div className="tips-list" ref={scrollRef}>
                <div className="tips-cards">
                    {tips.slice(0.4).map((tip) => (
                <Link key={tip.slug} href={`/tips/${tip.slug}`} className="tip-card">
                    <Image width= {250} height={250} src={tip.image} alt={tip.title} className="tip-img" />
                    <div className="tip-content">
                         <h3>{tip.title}</h3>
                    <p>{tip.excerpt}</p>
                    </div>
             
                </Link>
            ))}
                </div>

            </div>
            
        </div>
    )
}
//uso slice(0.4) per limitare il numero di card in home