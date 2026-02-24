//client component : gestisc click/router
"use client"
import "./Category.css"
import { Plant } from "@/app/types/plant"
import { Product } from "@/app/types/product"
import Image from "next/image"
import { AiFillStar } from 'react-icons/ai'
import { useRouter } from "next/navigation"
import rawPlants from "@/app/data/plants.json"
import rawProducts from "@/app/data/products.json"
/**
 * 🔍 Analizziamo i pezzi
const plants

stai creando una variabile

si chiama plants

: Plant[]

è TypeScript

significa:
👉 plants deve essere un array ([])
👉 e ogni elemento deve essere di tipo Plant

Esempio mentale:

plants = [
  Plant,
  Plant,
  Plant
]

= rawPlants

rawPlants arriva da:

import rawPlants from "@/app/data/plants.json"


è dati grezzi JSON

TypeScript non sa che forma abbiano

Tu gli stai dicendo:

“Fidati: questi dati rispettano il tipo Plant”
 */
const plants:Plant[]=rawPlants //cosa è e  a cosa serve:“Creo una costante chiamata plants che deve essere un array di Plant,e le assegno i dati presi da rawPlants”


/**
 * “Creo products che è un array di Product
e forzo TypeScript a trattare rawProducts come Product[]”

rawProducts as Product[]

as = type assertion

stai dicendo a TypeScript:

“So io cosa sto facendo, considera questi dati come Product[]”

📌 TypeScript non controlla davvero, si fida.
 */
const products:Product[] = rawProducts as Product[]
export default  function CategoryClient({
  category,
 }: {
   category: string
 }) {

    const router = useRouter()
    //cosa signfica e a cosa serve:1️⃣ Cosa fa in una frase:Controlla se category è “indoor” oppure “outdoor” e salva il risultato (true o false) in isPlantCategory



    const isPlantCategory = category === "indoor" || category === "outdoor"
/**
 * 3️⃣ Spiegazione parte per parte
🔹 const items

Stai creando una variabile chiamata items.

🔹 : (Plant | Product)[]

Questa è TypeScript.

Significa:

items è un array
che può contenere Plant oppure Product
🔹 isPlantCategory ? ... : ...

Questo è l’operatore ternario.

È un modo corto di scrivere un if / else.

🔁 Traduzione in if / else
let items

if (isPlantCategory) {
  items = plants.filter(p => p.category === category)
} else {
  items = products.filter(p => p.category === category)
}
  🔹 plants.filter(...)

plants è un array di Plant

filter crea un nuovo array

tiene solo gli elementi che soddisfano la condizione

p => p.category === category


Significa:

“tieni solo le piante che hanno la stessa categoria dell’URL”

4️⃣ Esempio concreto:
Dati
category = "indoor"
isPlantCategory = true


👉 viene eseguito solo:

plants.filter(p => p.category === "indoor")


items diventa:

[
  { id: 1, name: "Monstera", category: "indoor" },
  { id: 2, name: "Ficus", category: "indoor" }
]
 */
    const items:(Plant | Product)[] = isPlantCategory ? plants.filter(p=> p.category === category) : products.filter(p=> p.category === category)

    return (
        <div
            className="category-page">
              {/**Mostra il nome della categoria in MAIUSCOLO come titolo della pagina */}
               {/* <h2 className="category-title">{category.toUpperCase()}</h2>*/}
               {/**?. (optional chaining) dice:“usa toUpperCase solo se category esiste” */}
                <h2 className="category-title">  {category?.toUpperCase()}</h2>
                {/**3️⃣ items.map(...)
{items.map(item => (

🔹 Cosa fa

Trasforma ogni elemento dell’array items
in un blocco HTML (una card)

🔍 Spiegazione semplice

items è un array

map:

scorre ogni elemento

ritorna un nuovo elemento JSX

📌 È come dire:

for each item in items:
  crea una card

4️⃣ Perché { ... } attorno a map
{items.map(...)}


Perché:

JSX permette solo espressioni JavaScript

map() restituisce un array

React sa renderizzare array di JSX

5️⃣ Il parametro item
item => (


item è un singolo elemento

può essere:

un Plant

oppure un Product

Per questo prima avevi:

(Plant | Product)[]

6️⃣ Il key
<div key={item.id} className="card">

🔹 A cosa serve key

Serve a React per capire quale elemento è quale
 */}
                <ul
                    className="category-list">
                        {items.map(item => (
                            <div
                                key={item.id} className="card">
                                   {item.image && (
                                    <Image className="image" src={item.image} alt={item.name} width={200} height={200} />
                                   )}
                                    <div
                                        className="card-detail">
                                          <div className="name-rating">
                                           <h3>{item.name}</h3>
                                            <p className="rating">
                                              <AiFillStar className="star" size={16} />
                                               <AiFillStar className="star" size={16} />
                                           
                                                  {item.rating}
                                              
                                            </p>
                                          </div>
                                           
                                            <p className="description">{item.description}</p>
                                            <p className="price">${item.price}</p>

                                            <button className="view-detail" onClick={()=> router.push(`/plants/${item.id}`)}>
                                                View Detail
                                            </button>
                                    </div>
                            </div>
                        ))}
                </ul>
        </div>
    )

}

/**
 * 1️⃣ Cosa sono le props
🔹 Definizione semplice

Le props sono dati che un componente React riceve da un altro componente.

👉 Sono come argomenti di una funzione.

📌 Esempio semplice
<Greeting name="Marco" />


Il componente riceve:

function Greeting({ name }) {
  return <p>Ciao {name}</p>
}


🧠 Qui:

name è una prop

"Marco" è il valore passato

✔️ Le props:

arrivano da un componente padre

funzionano in qualsiasi componente React

NON dipendono da Next.js

2️⃣ Cosa sono i params
🔹 Definizione semplice

I params sono dati presi dall’URL.

👉 Li crea Next.js automaticamente, non tu.

📌 Esempio URL
/category/indoor


Next.js legge l’URL e costruisce:

params = {
  category: "indoor"
}


✔️ I params:

arrivano dalla rotta (URL)

esistono solo in Next.js

servono per capire “in che pagina siamo”

4️⃣ Come lavorano insieme (caso reale)
URL
/category/indoor

Next.js (Server Component)
params = { category: "indoor" }

Tu passi il valore come prop
<CategoryClient category={params.category} />

Il Client Component riceve una prop
function CategoryClient({ category }) {
  // category === "indoor"
}


🧠 Traduzione mentale

“Prendo category dall’URL (params)
e lo passo al componente come dato (prop)

5️⃣ Frase da ricordare (regola d’oro)

I params vengono dall’URL.
Le props passano dati tra componenti.
 */