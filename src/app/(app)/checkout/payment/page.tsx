"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./payment.css"

export default function PaymentPage() {
    const router = useRouter()
    const [payment,setPayment] = useState({
        cardType:"visa",
        cardNumber:"",
        name:"",
        cvv:"",
        expiry:"",
        saveInfo:false,
    })
    //Questa funzione serve per aggiornare lo stato payment ogni volta che un input cambia,senza scrivere una funzione diversa per ogni campo.
    /**
     Funziona per:

input text

input checkbox

select

Cosa significa?

handleChange è una funzione chiamata ogni volta che un input cambia (onChange)

e è l’evento

React.ChangeEvent<...> dice a TypeScript:

“Questo evento arriva da un <input> o da un <select>”
serve solo per ts.
     */
    const handleChange =(

        e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    )=> {
        /**
         * Perché serve?

TypeScript pensa che e.target sia troppo generico (EventTarget).

Ma noi sappiamo che:

è un <input>

oppure un <select>

Con as HTMLInputElement gli stiamo dicendo:

“Fidati, è un input vero, con value, checked, type”

📌 Senza questa riga, TypeScript non ti fa usare checked.
         */
        const target = e.target as HTMLInputElement
        //Destructuring: prendiamo i dati dall’input,Qui stiamo leggendo le proprietà dell’input HTML.,checked solo per checkbox
        const { name, value, type, checked} = target
        //aggiorniamo lo stato
        setPayment((prev)=>({
            //prev è lo stato precedente,usiamo la forma sicura di setState
            ...prev,//copiamo tutto lo stato precedente e non cancellare gli altri campi,tienili  tutti
            [name]:type === "checkbox" ? checked : value, //cui nome è una chiave dinamica
            //se l input è un checkbox  usa checked (true / false) altri usa value
            /*
            exp:
            <input name="cardNumber" value="4242" />
Valori:

name = "cardNumber"
type = "text"
value = "4242"
Risultato:

payment.cardNumber = "4242"
Caso 2: clicco il checkbox
<input type="checkbox" name="saveInfo" checked />


Valori:

name = "saveInfo"
type = "checkbox"
checked = true


Risultato:

payment.saveInfo = true
            */
        }))
    }
    /**
     * 
     * handlePay è una funzione che viene chiamata quando clicchi “Pay now”

e è l’evento del form

React.FormEvent serve solo a TypeScript per dire:

“Questa funzione è collegata a un <form>”

📌 Questa funzione viene usata qui:

<form onSubmit={handlePay}>
     */
    const handlePay = (e: React.FormEvent)=> {
        /**
         * Cosa fa?

👉 Blocca il comportamento automatico del browser

Cosa farebbe il browser senza questa riga?

Ricaricherebbe la pagina

Perderesti:

stato React

dati inseriti

esperienza fluida

📌 In React quasi sempre si usa preventDefault() nei form.
         */
        e.preventDefault()
        router.push("checkout/complete")
    }
return (
    <div className="payment-page">
        <h1>Payment</h1>
        <p className="secure">All transactions are secured and encrypted</p>

        <form onSubmit={handlePay} className="payment-form">
            <select name="cardType" value={payment.cardType} onChange={handleChange}>
                <option value="visa">
                    Visa Card
                </option>
                <option value="mastercard">
                    Mastercard
                </option>
            </select>
            <input type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={payment.cardNumber}
                    onChange={handleChange}
                    required
                    />
            <input type="text"
                    name="name"
                    placeholder="name"
                    value={payment.name}
                    onChange={handleChange}
                    required />

            <div className="row">
            <input type="text"
                    name="expiry"
                    placeholder="MM/YY"
                    onChange={handleChange}
                    required />
            <input type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={payment.cvv}
                    onChange={handleChange}
                    required />
            </div>
            <label className="custom-checkbox">
                <input type="checkbox"
                name="saveInfo"
                checked={payment.saveInfo}
                onChange={handleChange} />
                <span className="checkmark"></span>
                <span>Save this information for the next time</span>
            </label>

            <button type="submit" className="pay-btn" onClick={()=>router.push("/checkout/complete")}>
                Pay now
            </button>
        </form>

    </div>
)
}