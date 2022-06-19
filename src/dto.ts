import { ValueUnit, Method, Ingredients } from "./gateway";


export interface BeerDto {
    id: number;
    name: string;
    tagline: string;
    firstBrewed: string;
    description: string;
    imageUrl: string;
    abv: number;
    ibu: number;
    targetFg: number;
    targetOg: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuationLevel: number;
    volume: ValueUnit;
    boilVolume: ValueUnit;
    method: Method;
    ingredients: Ingredients;
    foodPairing: string[];
    brewersTips: string;
    contributedBy: string;
}
