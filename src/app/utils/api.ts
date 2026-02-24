import { Plant} from "../types/plant"

export const fetchPlants = async (): Promise<Plant[]> => {
    const res = await fetch("/api/plants")
    const data = await res.json()
    return data as Plant[]
}