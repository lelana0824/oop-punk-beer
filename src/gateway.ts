import axios, { AxiosResponse } from "axios";
import { BeerDto } from "./dto";

interface Response {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: ValueUnit
    boil_volume: ValueUnit
    method: Method,
    ingredients: Ingredients,
    food_pairing: string[],
    brewers_tips: string;
    contributed_by: string;
}

export interface ValueUnit {
    vaule: number;
    unit: string;
}

export interface Method {
    mash_temp: MashTemp[];
    fermentation: Fermentation
    twist: string;
}

interface MashTemp {
    temp: ValueUnit;
    duration: number;
}

interface Fermentation {
    temp: ValueUnit;
}

export interface Ingredients {
    malt: Malt[];
    hops: Hop[];
    yeast: string;
}

interface Malt {
    name: string;
    amount: ValueUnit;
}

interface Hop {
    name: string;
    amount: ValueUnit;
    add: string;
    attribute: string;
}

export interface Parameters {
    abv_gt?: number;
    abv_lt?: number;
    ibu_gt?: number;
    ibu_lt?: number;
    ebc_gt?: number;
    ebc_lt?: number;
    beer_name?: string;
    yeast?: string;
    brewed_before?: Date;
    brewed_after?: Date;
    hops?: string;
    malt?: string;
    food?: string;
    ids?: string;
}

class BeerDtoFactory {
    private beers: BeerDto[];

    constructor(beerDto: Response[]) {
        this.beers = beerDto.map(beerItem => {
            const { first_brewed, image_url, target_fg, target_og, attenuation_level, boil_volume, food_pairing, brewers_tips, contributed_by } = beerItem;
            return ({
                ...beerItem,
                firstBrewed: first_brewed,
                imageUrl: image_url,
                targetFg: target_fg,
                targetOg: target_og,
                attenuationLevel: attenuation_level,
                boilVolume: boil_volume,
                foodPairing: food_pairing,
                brewersTips: brewers_tips,
                contributedBy: contributed_by
            })
        })
    }

    getBeerDto() {
        return this.beers;
    }
}

export const fetchBeers = async (params?: Parameters) => {
    try {
        const data: AxiosResponse<Response[]> = await axios.get('https://api.punkapi.com/v2/beers', {
            params
        })

        return new BeerDtoFactory(data.data).getBeerDto();
    } catch (e) {
        console.error(e)
    }

}

export const fetchRandomBeers = async () => {
    try {
        const data: AxiosResponse<Response[]> = await axios.get('https://api.punkapi.com/v2/beers/random');
        return new BeerDtoFactory(data.data).getBeerDto();
    } catch (e) {
        console.error(e)
    }
}