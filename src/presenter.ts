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

interface ValueUnit {
    vaule: number;
    unit: string;
}

interface Method {
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

interface Ingredients {
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