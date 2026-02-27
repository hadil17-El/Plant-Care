//client component:legge params
//In Next.js recente, params è SEMPRE una Promise nei Server Components


    import CategoryClient from "./CategoryClient"
export default  async function CategoryPage({
    params,
}: {
    params: { category: string} 
}) {
 return <CategoryClient  category={(await params).category} />
}


/**
 * Property 'category' does not exist on type '{}'
significa che TypeScript pensa che p sia {}, non Plant.
✅ Perché succede

Quando fai:

import plants from "../data/plants.json";


TypeScript non sa automaticamente che plants è un Plant[].
Quindi plants diventa any[] o {} → e p.category genera errore.


Quando importi un JSON così:

import products from "@/app/data/products.json"


TypeScript, se non guidato, lo interpreta come:

const products: {}[]


👉 {} non è assegnabile a Plant | Product.
 */
/**
 * L’errore nasce da una combinazione non valida in Next.js App Router:

hai "use client" → Client Component

la funzione è async e usa await params → solo Server Components possono essere async

In App Router un Client Component NON può essere async.
✅ SOLUZIONE CORRETTA (consigliata)
1️⃣ Rendi il componente SINCRONO

In un Client Component, params non è una Promise.
❌ ERRATO
params: Promise<{ category: string }>
const { category } = await params

✅ CORRETTO
params: { category: string }
const { category } = params
 */

/**
 * 1️⃣ Cosa significa questo pezzo
export default async function CategoryPage({
  params,
}: {
  params: { category: string }
})

🔹 È destructuring di un oggetto

Next.js chiama automaticamente la tua pagina passando un oggetto come argomento, che ha questa forma:

{
  params: {
    category: "indoor"
  }
}


Tu stai dicendo a JavaScript:

“Prendi l’argomento della funzione e estrai solo la proprietà params”

È equivalente a scrivere:

export default async function CategoryPage(props) {
  const params = props.params
}


ma in versione più compatta e moderna.

🔹 La parte TypeScript dopo : cosa fa?
: { params: { category: string } }


Serve solo a tipizzare l’argomento della funzione.

Stai dicendo a TypeScript:

“Questa funzione riceve un oggetto che contiene params,
e params contiene category, che è una stringa”

📌 Non crea oggetti, non esegue codice,
serve solo per controllo degli errori e autocomplete.
 */
/**
 * 
 * 
 * 2️⃣ Cosa significa <CategoryClient category={params.category} />

Questa è una normale prop React.

🔹 CategoryClient è un componente
<CategoryClient category={params.category} />


equivale a dire:

“Renderizza CategoryClient
e passagli una prop chiamata category
con valore params.category”

Se params.category === "indoor", allora è come scrivere:

<CategoryClient category="indoor" />


 * 📦 Next.js chiama la pagina così:
CategoryPage({
  params: { category: "indoor" }
})

📤 Tu passi la prop così:
<CategoryClient category={params.category} />

📥 Il client la riceve così:
CategoryClient({ category: "indoor" })

5️⃣ Perché questo pattern è importante in Next.js

✅ params → solo Server Component

✅ useRouter, onClick → solo Client Component

✅ Separazione pulita → niente errori su Promise / async
 */