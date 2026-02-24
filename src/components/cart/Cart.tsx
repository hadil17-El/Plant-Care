
"use client"
import { useCart } from "@/app/context/CartContext";
import { Minus, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Cart() {
    const {
        cart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        totalePrice,
    } = useCart()
const router = useRouter() //hook per navigazione
    if (cart.length === 0) {
        return <p className="vuoto">il carello è vuoto</p>
    }
    return (
        <div className="cart">
            {cart.map((item)=> (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />

                    <div className="cart-info">
                        <div className="name-remove">
                            <h3 className="cart-name">{item.name}</h3>
                         <button className="remove-btn"
                        onClick={()=> removeFromCart(item.id)}>
                            <Trash size={24} color="green" />
                            </button>
                        </div>
                        
                        <h4 className="cart-category">{item.category}</h4>
                        <p className="cart-price">${item.price}</p>

                        <div className="quantity-controls">
                            <button className="minus" onClick={()=>decreaseQty(item.id)}>
                               <Minus size={20} />
                            </button>
                            <span>{item.quantity}</span>
                            <button  className="plus" onClick={()=> increaseQty(item.id)}>
                                <Plus size={20} />
                            </button>
                        </div>

                       
                    </div>
                </div>
            ))}
            <div className="cart-summary">
                <h2>Totale: ${totalePrice.toFixed(2)}</h2>
                <button className="checkout-btn" onClick={()=> router.push("/checkout/shipping")}>Proceed to checkout</button>
            </div>
        </div>
    )
}