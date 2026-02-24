//è pagina dinamica
/**
 * Errore:
Route "/tips/[slug]" used `params.slug`. 
`params` is a Promise and must be unwrapped with `await`
In Next.js App Router (13+), i parametri dinamici ora sono async.
Quindi params è una Promise.

✅ SOLUZIONE CORRETTA (Next.js 13+ / 14 / 15)

Devi rendere la funzione async e usare await.
 */
import tips from "@/app/data/tips.json"
import "./slug.css"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import Link  from "next/link"
import Image from "next/image"
type Props = {
    params: {slug:string}
}
export default async function TipDetail({ params } : Props) {
    const {slug } = await params
    const tip = tips.find((t) => t.slug === slug);
    if(!tip)  {
     return <div>
     Tip not found
     </div>   
    }

    return(
         
        <div className="tip-detail">
              <Link href="/home" className="back-btn">
                <FaArrowLeft size={30} color="green" />
            </Link>
            <div className="tip-hero">
                <Image width={250} height={250} src={tip.image} alt={tip.title} />
            </div>
            <div className="tip-badge">
                <span className="tip-badge">Plant Care</span>
                <h1>{tip.title}</h1>
                <p className="tip-content">{tip.content}</p>
                <div className="tip-highlight">
                    Healty plants start with small daily care.
                </div>
         
            </div>
        </div>
    )
}