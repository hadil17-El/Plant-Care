import { motion } from "framer-motion";
/**
 * 2️⃣ Tipo Props
type Props = {
  text: string
  onComplete?: () => void
}


Qui stai definendo i props del componente:

text → obbligatorio

il testo da animare

onComplete → opzionale

funzione che verrà chiamata quando l’animazione finisce

Il ? significa:
👉 può esserci oppure no
 */
type Props = {
    text: string
    onComplete?:()=> void
}
export default function AnimatedText({text,onComplete}:Props) {
    /**
     * 4️⃣ Suddivisione del testo in parole
const words = text.split(" ")


prende la stringa:

"Fa molto caldo oggi"


la trasforma in:

["Fa", "molto", "caldo", "oggi"]


👉 questo ti permette di animare ogni parola separatamente



6️⃣ map sulle parole
words.map((word, index) => (


cicli su ogni parola

word → la parola corrente

index → posizione della parola nel testo

Esempio:

word = "molto"
index = 1


📚 Fonte:
https://react.dev/learn/rendering-lists

7️⃣ motion.span
<motion.span


Qui è il cuore del componente ❤️
Ogni parola diventa un elemento animato.

🔑 key
key={index}


serve a React per distinguere gli elementi

qui va bene usare index perché:

la lista è statica

l’ordine non cambia

📚 Fonte:
https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

8️⃣ Stato iniziale dell’animazione
initial={{ opacity: 0, x: -10 }}


opacity: 0 → invisibile

x: -10 → leggermente spostata a sinistra

👉 la parola parte nascosta

9️⃣ Stato finale
animate={{ opacity: 1, x: 0 }}


opacity: 1 → visibile

x: 0 → posizione normale

👉 la parola entra scorrendo

🔟 Transizione (timing)
transition={{
  delay: index * 0.2,
  duration: 0.3
}}


Qui succede la magia ✨

delay: index * 0.2

parola 0 → 0s

parola 1 → 0.2s

parola 2 → 0.4s

duration: 0.3

ogni parola impiega 0.3s ad apparire

👉 effetto “scrittura progressiva”

📚 Fonte:
https://www.framer.com/motion/transition/

1️⃣1️⃣ onAnimationComplete
onAnimationComplete={
  index === words.length - 2 ? onComplete : undefined
}


Questa riga è molto intelligente, vediamola bene.

words.length → numero totale parole

words.length - 2 → penultima parola

solo quella parola:

chiama onComplete

tutte le altre → undefined (nessuna callback)

👉 risultato:

onComplete viene chiamata una sola volta

quando l’animazione è praticamente finita


La riga è:

onAnimationComplete={index === words.length - 2 ? onComplete : undefined}

1️⃣ Cos’è onAnimationComplete

onAnimationComplete è una prop di Framer Motion.

è una callback

viene chiamata quando l’animazione di quell’elemento finisce

Qui l’elemento è:

<motion.span>parola</motion.span>
     */
    const words = text.split(" ")
    return (
      <span style={{ display:"inline-flex"}}  className="animated-text">
        {
            words.map((word,index)=> (
                <motion.span
                    key={index}
                    initial={{opacity:0,x:-10}}
                    animate={{opacity:1,x:0}}
                    transition={{delay: index * 0.2,duration: 0.3}}
                    onAnimationComplete={index === words.length - 2 ? onComplete : undefined}
                    style={{ marginRight: 4 , fontSize:20}}
                    >
                        {word}
                    </motion.span>
            ))
        }
      </span>
    )
}
/**
 * La riga è questa:

export default function AnimatedText({ text, onComplete }: Props) {

1️⃣ Da dove arriva { text, onComplete }

In React, ogni componente riceve un oggetto props.

Se scrivi:

<AnimatedText text="Ciao mondo" onComplete={handleFinish} />


React passa al componente un oggetto fatto così:

props = {
  text: "Ciao mondo",
  onComplete: handleFinish
}

2️⃣ Senza destrutturazione (forma “lunga”)

Potresti scrivere il componente così:

export default function AnimatedText(props: Props) {
  const text = props.text
  const onComplete = props.onComplete
}


Funziona esattamente allo stesso modo, ma è più verboso.

📚 Fonte:
https://react.dev/learn/passing-props-to-a-component

3️⃣ Con destrutturazione { text, onComplete }

Questa è JavaScript moderno (ES6) chiamato destructuring.

{ text, onComplete }


significa:

👉 “Prendi dall’oggetto props le proprietà text e onComplete
👉 e creami due variabili con quei nomi”

È equivalente a:

const text = props.text
const onComplete = props.onComplete


📚 Fonte ufficiale JS:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

4️⃣ E : Props cosa significa?
({ text, onComplete }: Props)


Questa parte è TypeScript, non React.

Significa:

“L’oggetto che sto destrutturando deve rispettare il tipo Props”

Ricordiamo Props:

type Props = {
  text: string
  onComplete?: () => void
}


Quindi TypeScript garantisce che:

text esiste ed è una stringa

onComplete può esistere oppure no

se esiste → è una funzione
 */