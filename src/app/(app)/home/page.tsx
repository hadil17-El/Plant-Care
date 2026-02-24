"use client"
import { JSX, useEffect, useRef, useState } from "react"
import "./home.css";
import { Search, Home, Stethoscope, Leaf, BookOpen, Recycle,Droplets, AlarmClock, Trees, Sprout, Flower2, Router, Thermometer} from "lucide-react"
import plantsData from "@/app/data/plants.json";
import Image from "next/image";
import toast, { Toaster} from "react-hot-toast"
import { useRouter } from "next/navigation";
import PlantCard from "@/app/(app)/home/PlantCard";
import { span } from "framer-motion/client";
import { FaLeaf, FaSnowflake } from "react-icons/fa";
import AnimatedText from "./AnimatedText";
import { motion } from "framer-motion";
import { FaTree } from "react-icons/fa6";
import tipsData from "@/app/data/tips.json"
import TipsPage from "../tipsSeeAll/page";

export default function HomePage(){
    const [weather, setWeather] = useState<{ temp: number;city: string; icon: string} | null>(null)

    useEffect(()=> {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Rome&units=metric&appid=ec618f9cfeb181af0410c3322dd8c104`)
        .then(res => res.json())
        .then(data => {
            setWeather({
                temp: Math.round(data.main.temp),
                city: data.name,
                icon: data.weather[0].icon
            })
        })
    }, [])

const router = useRouter()
const [plants, setPlants] = useState(plantsData);
const [query,setQuery]=useState("")
const handleSearch=(e:any)=>{
    if(e.key !== "Enter") return
        const plant = plants.find(p=>
                p.name.toLowerCase() === query.toLowerCase()
        )
        if(plant){
            router.push(`/plants/${plant.id}`)
        } else {
            alert("Pianta no trovata")
        }
}
const [showIcon,setShowIcon] = useState(false)
//cal un messaggio smart dal meteo
/**
 * 
2️⃣ Funzione getWeatherAdvice
const getWeatherAdvice = (temp: number) => {


è una funzione helper, NON un hook

riceve la temperatura (temp)

ritorna JSX (un elemento React)

non usa hook al suo interno
3️⃣ Funzione interna render
const render = (text: string, icon: JSX.Element) => (


Questa funzione:

serve solo a evitare duplicazioni

prende:

text → il messaggio da mostrare

icon → un’icona React (JSX)

Ritorna un JSX comune a tutti i casi meteo.

4️⃣ Contenitore principale
<span className="weather-advice">:
wrapper del messaggio meteo

5️⃣ AnimatedText
<AnimatedText
  text={text}
  onComplete={() => setShowIcon(true)}
/>


Cosa succede qui:

text={text} → passa la stringa animata

onComplete:

viene chiamato quando l’animazione del testo finisce

setShowIcon(true) → attiva l’icona

👉 flusso:

testo appare parola per parola

animazione finisce

showIcon diventa true

React fa un re-render

6️⃣ Render condizionale dell’icona
{showIcon && (


se showIcon === true → mostra l’icona

se false → React non renderizza nulla

È equivalente a:

if (showIcon) { render icon }

7️⃣ Animazione Framer Motion
<motion.span
  initial={{ opacity: 0, scale: 0.6 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4 }}
>


initial → stato iniziale (invisibile e piccolo)

animate → stato finale (visibile e grande)

transition → durata animazione (0.4s)

👉 l’icona entra con un effetto pop-in
8️⃣ Icona dinamica
{icon}


l’icona cambia in base alla temperatura

viene passata come parametro a render
 */
const getWeatherAdvice=(temp: number)=> {

const render = (text:string, icon:JSX.Element)=>(
    <span className="weather-advice">
           <AnimatedText  text={text} onComplete={()=> setShowIcon(true)} />
            {showIcon && (
              <motion.span
                    initial={{opacity:0, scale: 0.6}}
                    animate={{opacity: 1, scale: 1}}
                    transition={{ duration: 0.4}}
                    >
                        {icon}
                    </motion.span>
            )}
    </span>
)
    if(temp >= 30) return render(
 "Fa molto caldo:controlla l'umidita del terreno" ,
 <Thermometer size={26} color="#e54a4f"/>
    ) ;
    if(temp <= 5) return render(
"Fa freddo: evita annaffiature frequenti",
<FaSnowflake  size={26} color="#b1d0ef"/> 
    )
return render(
    "Condizioni ideali per la maggior parte delle piante",
     <FaLeaf size={26} color="#1d5f27" />
)
}
/**
 * 📌 Cos’è una ref:

è un contenitore

che può puntare a un elemento reale del DOM

React non lo ri-renderizza quando cambia

Qui stai dicendo:

“Questa ref conterrà un div HTML”

All’inizio è null perché:

il DOM non è ancora stato creato
 */
const scrollRef = useRef<HTMLDivElement | null>(null)
useEffect(()=>{
    /**scrollRef.current è: il div .recommended-list
lo salvi in container per comodità */
    const container = scrollRef.current
    /**4️⃣ Controllo di sicurezza:
Serve per:evitare errori tipo cannot read property scrollLeft of null
se il DOM non è pronto → esci */
    if(!container) return
/**📌 setInterval:
esegue una funzione ogni X millisecondi
setInterval restituisce un ID
👉 quell’ID serve per fermare l’intervallo più tardi
👉 per questo lo devi salvare in una variabile (interval)
Cosa restituisce davvero setInterval

Quando chiami:

setInterval(fn, 5000)


JavaScript:

crea un “timer”

lo registra internamente nel browser

ti restituisce un identificatore

Esempio:

const interval = setInterval(...)


Ora interval vale qualcosa tipo:

12   // (numero o oggetto, dipende dall’ambiente)


📌 Non è la funzione, è l’ID del timer.

Perché ti serve questo ID

Perché l’unico modo per fermare un interval è questo:

clearInterval(interval)


Se non salvi l’ID:
❌ non puoi fermarlo */
    const interval=setInterval(()=>{
        /**
         * Qui calcoli la fine reale dello scroll.

scrollWidth → larghezza totale del contenuto

clientWidth → larghezza visibile

differenza = quanto puoi scrollare al massimo

👉 Questo è il punto “più a sinistra”.
         */
        const maxScrollLeft = container.scrollWidth - container.clientWidth

        if(
            container.scrollLeft  >= maxScrollLeft - 10
        ) {
            container.scrollTo({left:0,behavior:"smooth"})
        } else {
            container.scrollBy({left:container.clientWidth,
                                behavior:"smooth",
            })
        }
    },5000)
    return ()=>clearInterval(interval)
},[])
   
 
    return(
        <div className="home-container">
            <Toaster position="top-center" />
            {/* Header */}
            <header className="home-header">
                {
                    weather ? (
                        <div className="weather-card">
                                <div className="city-temp">
                            <h2 className="city">{weather.city}</h2>
                            <p className="temp">{weather.temp}°C</p>
                                </div>
                          
                            <p>{getWeatherAdvice(weather.temp)}</p>
                                                       
                    
                        </div>
                    ) : (
                        <p>Loading weather...</p>
                    )

                }
            </header>

            {/* search bar */}
            <div className="search-bar">
                <Search size={20} />
                <input type="text"
                        placeholder="Cerca una pianta..." 
                        value={query}
                        onChange={(e)=> setQuery(e.target.value)}
                        onKeyDown={handleSearch}/>
            </div>
                {/** best categories */}
                <section className="categories">
                    <div className="section-header">
                        <h3>Best Categories</h3>
                    </div>

                    <div className="categories-list">
                        <div className="category-item active"
                                onClick={()=> router.push(`/category/outdoor`)}>
                            <Image src="/outdoor-plant.png" alt="outdoor-plant" width={30} height={30}/>
                            <p>Outdoor</p>
                        </div>
                        <div className="category-item"
                            onClick={()=> router.push(`/category/indoor`)}>
                            <Image src="/indoor-plant.png" alt="indoor-plant" height={30} width={30} />
                            <p>
                            Indoor
                            </p>
                        </div>
                        <div className="category-item"
                                onClick={() => router.push(`/category/seeds`)}>
                            <Image src="/semi.png" alt="semi" width={30} height={30} />
                            <p>Seeds</p>
                        </div>
                        <div className="category-item"
                                onClick={() => router.push(`/category/tools`)}>
                            <Image src="/tools.png" alt="tools" width={30} height={30} />
                            <p>Tools</p>
                        </div>
                          <div className="category-item"
                                onClick={() => router.push(`/category/pots-soil`)}>
                            <Image src="/vasi-terrici.png" alt="tools" width={30} height={30} />
                            <p>Pots&soil</p>
                        </div>
                    </div>
                </section>

                {/** Big promo banner */}

                <section className="promo-banner">
                    <div className="promo-text">
                        <h2>
                            Monstera Deliciosa
                            </h2>
                           <p>Perfect for beginners  Low maintenance</p>
                    <button>Shop now</button>
                     </div>
                    <img src="/promo-plant.jpg" alt="promo-plant"
                    className="promo-img" />
                    </section>              
                    {/**Recommended for you */}
                    <section className="recommended">
                        <div className="section-header">
                            <h3>Recommende for you</h3>
                            <span>See all</span>
                        </div>
                        <div className="recommended-list" ref={scrollRef}>
                        
                            {plants.map(plant => (
                                <PlantCard
                                    key={plant.id}
                                    plant={plant}
                                    />
                        
                            ))}
                        </div>
                        </section>    
                        <section className="plant-care">
                            <div className="section-header">
                                <h3>Plant Care Articles</h3>
                                <span>Learn & grow <FaTree size={16}/></span>
                                 
                            </div>
                            <div className="tips-list">
                                    <TipsPage />
                            </div>
                            </section>  
        </div>
    )
}
