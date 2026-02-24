export interface Product {
    id: number;
    name: string;
    description: string
    category:"seeds" | "tools" | "pots-soil";
    price: number;
    rating: number;
    image: string
}