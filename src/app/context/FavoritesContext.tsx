"use client";

import { createContext,useContext, useEffect, useState } from "react";
import { Plant } from "../types/plant";

/**
 * 📌 Stai dicendo:

“Il mio Context conterrà queste due cose”

favorites → lista di piante preferite

toggleFavorite → funzione per aggiungere/rimuovere una pianta
 */
interface FavoritesContextType {
    favorites: Plant[]
    toggleFavorite: (plant: Plant) => void
}
/**
 * Qui:

crei il contenitore globale

inizialmente è null perché:

il valore vero arriverà dal Provider
 */

const FavoritesContext = createContext<FavoritesContextType | null>(null);
/**
 * 
 📌 Questo è un wrapper.

Significa:

<FavoritesProvider>
   <App />
</FavoritesProvider>

👉 Tutti i componenti dentro <App /> potranno accedere ai preferiti.
 */

export function FavoritesProvider({ children }:{ children: React.ReactNode }) {
    const [favorites, setFavorites]=useState<Plant[]>([])
//questo effetto quando il componente monta(signfica si riendirizza alla prima volta)
  useEffect(() => {
    /**
     * Cos’è localStorage

localStorage è:

una memoria del browser

persistente (resta anche dopo refresh o chiusura tab)

basata su coppie chiave → valore

salva solo stringhe

📌 Non è React, è Web API del browser.
Cosa fa getItem("favorites")

👉 getItem:

cerca nel localStorage una chiave chiamata "favorites"

se esiste → restituisce il valore associato

se NON esiste → restituisce null
Cosa viene salvato davvero

Nel tuo codice, in un altro punto:

localStorage.setItem("favorites", JSON.stringify(favorites));


Quindi nel browser è salvato:

"favorites" → "[{...},{...},{...}]"

⚠️ È una stringa, anche se sembra un array.

Cosa contiene stored
Caso 1️⃣ – dati presenti
const stored = "[{\"id\":1,\"name\":\"Rose\"}]"


tipo: string

contenuto: JSON (testo)
     */
  const stored = localStorage.getItem("favorites");
/**
 * se non c’è nulla:

stato vuoto

esci subito
 */
  if (!stored) {
    setFavorites([]);
    return;
  }

  try {
    /**
     * Cosa fa JSON.parse(stored)

prende una stringa

scritta in formato JSON

e la trasforma in dati JavaScript veri

Esempio:

stored = '[{"id":1,"name":"Rose"}]'


Dopo:

parsed = [{ id: 1, name: "Rose" }]


📌 Senza JSON.parse:

i dati sono solo testo

non puoi usarli come array o oggetti
     */
    const parsed: Plant[] = JSON.parse(stored);
    /**
     * Questa riga:

aggiorna lo stato favorites

ma in modo sicuro

Cosa fa Array.isArray(parsed)

Controlla:

true → è davvero un array

false → non lo è
se parsed è un array → usa parsed

altrimenti → usa array vuoto
     */
    setFavorites(Array.isArray(parsed) ? parsed : []);
  } catch (error) {
    /**
     * catch (error) {
📌 Qui:

error è l’errore lanciato automaticamente da JavaScript

tipicamente un SyntaxError

esempio: JSON malformato
console.error("Errore parsing favorites:", error);
Cosa fa:

stampa un errore in console

con messaggio chiaro

non ferma l’app

localStorage.removeItem("favorites");
Qui fai pulizia 🧹

cancelli la chiave "favorites"
     */
    console.error("Errore parsing favorites:", error);
    localStorage.removeItem("favorites");
    setFavorites([]);
  }
}, []);
    //salve su localStorage , e si puo usare piu di un useefect, perche ogni useeffect uguale un tipo di effect
  useEffect(() => {
  if (favorites.length > 0) {
    /**
     * 3️⃣ localStorage.setItem("favorites", JSON.stringify(favorites))
Passo per passo:

JSON.stringify(favorites)

converte l’array favorites in una stringa JSON

es: [{"id":1,"name":"Rose"}] → '[{"id":1,"name":"Rose"}]'

localStorage.setItem("favorites", ...)

salva la stringa nella memoria del browser

chiave: "favorites"

valore: stringa JSON

📌 Così quando ricarichi la pagina, puoi leggere di nuovo i preferiti dal browser.
     */
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
}, [favorites]);

/**
 * 
 * const toggleFavorite = (plant: Plant) => { ... }

Stai creando una funzione freccia chiamata toggleFavorite.

plant: Plant → indica l’oggetto pianta da aggiungere o rimuovere.

Scopo: aggiungere o togliere la pianta dai preferiti.
 */
    const toggleFavorite = (plant: Plant) => {
      /**setFavorites → funzione di React useState per aggiornare lo stato favorites.
Passi una funzione invece del nuovo valore diretto → forma funzionale: */
/**
 * 3️⃣ prev.some((p) => p.id === plant.id)

prev → array corrente di preferiti

.some(...) → verifica se esiste già la pianta nell’array

Funziona così:

Restituisce true se almeno un elemento soddisfa la condizione

Condizione: p.id === plant.id (stesso id della pianta cliccata)

4️⃣ Operatore ternario
? prev.filter((p) => p.id != plant.id)
: [...prev, plant]


Se la pianta è già presente (some → true) → la rimuove:

prev.filter((p) => p.id != plant.id)


filter crea un nuovo array senza la pianta con lo stesso id

Altrimenti (some → false) → la aggiunge: [...prev, plant]

[...prev, plant] crea un nuovo array copiando tutti i precedenti e aggiungendo plant alla fine
 */
        setFavorites((prev) =>
            prev.some((p) => p.id === plant.id) ? prev.filter((p) => p.id != plant.id) : [...prev, plant]
        )
    }

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            { children }
        </FavoritesContext.Provider>
    )
}
export function useFavorites() {
    const ctx = useContext(FavoritesContext)
    if (!ctx) throw new Error("useFavorite must be used insed FavoritesProvider")
        return ctx
}

/**
 * perche abbiamo usato stato globale e context API
 */