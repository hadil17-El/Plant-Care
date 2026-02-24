"use client"
import { useContext,createContext, useState } from "react"
import { CartItem } from "../types/cart"

import { Plant } from "../types/plant"
interface CartContextType{
    cart: CartItem[]
    addToCart: (plant: Plant) => void
    removeFromCart: (id:string) => void
    increaseQty: (id: string) => void
    decreaseQty: (id: string) => void
    totalePrice: number
}
const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children}: { children: React.ReactNode}) {
    const [cart, setCart] = useState<CartItem[]>([])
    const addToCart =(plant: Plant)=>{
        setCart((prev) =>{
const item = prev.find((p) => p.id === plant.id)
        if(item) {
            return prev.map((p) =>
                p.id === plant.id ? { ...p,quantity: p.quantity + 1} : p)
        }
        return [...prev, { ...plant, quantity: 1}]
        })
        
    }
const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

    const increaseQty = (id: string)  =>
        setCart((prev)  =>
        prev.map((p)  =>
            p.id === id ? { ...p, quantity: p.quantity + 1}:p
))

const decreaseQty = (id:string)  =>
    setCart((prev) =>
        prev
            .map((p) =>
            p.id === id ? {...p,quantity:p.quantity - 1}: p
        )
        .filter((p) => p.quantity > 0)
    )
    const totalePrice = cart.reduce(
        (sum, item)  => sum + item.price * item.quantity,
        0
    )
    return(
        <CartContext.Provider
                value={{ cart,addToCart,removeFromCart,increaseQty,decreaseQty,totalePrice}}>
            {children}
        </CartContext.Provider>
    )
}
export function useCart(){
    const ctx = useContext(CartContext)
    if(!ctx) throw new Error("useCart must be used inside CartProvider")
        return ctx
}

