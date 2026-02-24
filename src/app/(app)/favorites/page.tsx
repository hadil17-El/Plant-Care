"use client"

import { useFavorites } from "@/app/context/FavoritesContext"
import PlantCard from "../home/PlantCard"
import "./favorites.css"

export default function FavortesPage() {
    const { favorites } = useFavorites()
    if (favorites.length === 0 ) {
        return   <p> No Favorite Plants Yet </p>
    }
    return (
        <section className="favorite-section">
            <h1>WishList</h1>

            <div className="recommended-list">
                {
                    favorites.map((plant) => (
                        <PlantCard key={plant.id}  plant={plant} />
                    ))
                }
            </div>
        </section>
    )
}