
import { Heart } from "lucide-react";
import  Link  from "next/link"
/*import  { Link } from "react-router-dom" //❌ react-router-dom NON deve mai essere usato in Next.js */
import { Plant } from "@/app/types/plant"
import {  useFavorites } from "@/app/context/FavoritesContext";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image"
interface PlantCardProps {
    plant: Plant;
}
export default function PlantCard({ plant }: PlantCardProps){
   const { favorites, toggleFavorite } = useFavorites()
    const isFav = favorites?.some((p) => p.id === plant.id)
    const { addToCart} = useCart()
    return(
        <Link href={`/plants/${plant.id}`} className="plant-card">
            <button
                className="favorite-btn"
                onClick={(e)=>{
                    e.preventDefault();
                    toggleFavorite(plant);;
                }}
                >
                    <Heart fill={isFav ? "#388e4a" : "none"}
                     stroke="green"
                          />

            </button>
            <Image width={250} height={250} src={plant.image}  alt={plant.name} />
            <h3>{plant.name}</h3>
            <p>{plant.tip}</p>

            <button className="add-cart"
                    onClick={(e)=> {
                        e.preventDefault()
                        e.stopPropagation()
                        addToCart(plant)
                    }}>Add to Cart</button>
        </Link>
    )
}