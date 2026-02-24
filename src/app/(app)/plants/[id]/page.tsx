"use client"

import plants from "@/app/data/plants.json";
import { useCart } from "@/app/context/CartContext";
import { div } from "framer-motion/client";
import { Sun, Droplets, Thermometer, Sprout } from "lucide-react";
import { useParams } from "next/navigation"
import Image from "next/image"
import "./PlantDetailPage.css"

export default function PlantDetailPage() {
    /**
     * useParams() legge i parametri dinamici dell’URL

Se l’URL è:

/plants/3


allora:

id === "3"

🔹 Perché { id: string }

In Next.js tutti i parametri URL sono stringhe, anche se sembrano numeri.

👉 TypeScript altrimenti non sa che tipo è id
👉 lo dichiariamo esplicitamente per evitare errori
     */
 const { id } = useParams< { id: string }>();//
 const plant = plants.find((p) => p.id === id);
 const { addToCart} = useCart()   

 if(!plant) 
 {
    return <p>Pianta non trovata</p>
 }

 return (
    <div className="plant-detail">
        <Image width={250} height={250} src={plant.image} alt={plant.name} className="plant-image" />
        <div className="plant-content">

        <h1>{plant.name}</h1>
        <p className="description">{plant.description}</p>

        <ul className="plant-info">
            <li><Sun /> {plant.sun}</li>
            <li><Droplets />{plant.water}</li>
            <li><Thermometer />{plant.temperature}</li>
            <li><Sprout />{plant.soil}</li>
        </ul>

        <div className="buy-section">
            <span className="price">${plant.price}</span>
            <button className="buy-btn" onClick={()=>addToCart(plant)}>Add to Cart</button>
        </div>
        </div>
        
    </div>
 )
}