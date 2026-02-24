"use client"

import { div } from "framer-motion/client"
import { useState } from "react"
import "./shipping.css"
import {useRouter} from "next/navigation"
export default function ShippingPage() {
    const router = useRouter()
    const [form,setForm] = useState({
        address:"",
        postalCode:"",
        city:"",
        country:"Italy",
        phone:"",
        saveInfo: false

    })
    /**
     * 
     * Qui stiamo dichiarando una funzione arrow chiamata handleChange.

La funzione riceve un argomento e, che è l’evento di cambio dell’input (onChange).

React.ChangeEvent<HTMLInputElement | HTMLSelectElement> specifica che questo evento può provenire da:

un <input> (es. testo, telefono, checkbox)

un <select> (menu a tendina)

Serve a dare tipizzazione TypeScript, così e.target viene riconosciuto correttamente.
     */
    const handleChange = (e: React.ChangeEvent <HTMLInputElement | HTMLSelectElement>)=> {
       /**
        * Qui usiamo destructuring per estrarre alcune proprietà dall’elemento che ha generato l’evento:

name: il valore dell’attributo name dell’input (es. address, city, phone).

value: il valore corrente dell’input (es. “Roma” per la città).

type: il tipo di input (text, checkbox, select, ecc.).

checked: se è un checkbox, indica se è selezionato (true/false).
        */
        const { name, value,type, checked} = e.target as any
       /**
        * prev => ({ ...prev, ... }) è una funzione che prende lo stato precedente (prev) e restituisce un nuovo oggetto.

...prev significa “copio tutte le proprietà esistenti del form”.

[name]: type === "checkbox" ? checked : value:

[name] è una chiave dinamica: aggiorna il campo corrispondente al name dell’input.

type === "checkbox" ? checked : value significa:

se l’input è una checkbox, usa checked (true/false)

altrimenti usa il value dell’input
        */
        setForm(prev=> ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))

    }

    const handleSubmit = (e: React.FormEvent)=> {
        e.preventDefault()
        //qui potresti salvare i dati in context o localstorage
        router.push("/checkout/payment")
    }

    return (
        <div className="shipping-page">
            <h1>Shipping Information</h1>
            <form onSubmit={handleSubmit} className="shipping-form">
                <label>
                    Address:
                    <input type="text" name="address" value={form.address} onChange={handleChange} />

                </label>
                <label>
                    Postal Code:
                    <input type="text" name="postalCode" value={form.postalCode} onChange={handleChange} required />
                </label>
                  <label>
                    Country:
                    <input type="text" name="country" value={form.country} onChange={handleChange} required />
                </label>
                <label>
                    City:
                    <input type="text" name="city" value={form.city} onChange={handleChange} required />
                </label>
               
                 <label>
                Phone Number:
                 <select name="country" value={form.country} onChange={handleChange} 
                >
                    <option value="Italy">(+39)</option>
                     <option value="US">(+1)</option>
                      <option value="UK">(+44)</option>
                </select>
                <input type="tel" name="phone" value={form.phone} onChange={handleChange} required />
            </label>
            </form>
        
           
            <label className="custom-checkbox">
                <input type="checkbox"
                        name="saveInfo"
                        checked={form.saveInfo}
                        onChange={handleChange}
                         />
                         <span className="checkmark"></span>
                         <span>Save this Information for next time</span>
            </label>
            <button
                    type="submit" className="checkout-btn"
                    onClick={handleSubmit}
                    >
                Checkout
            </button>
            
        </div>
    )
}