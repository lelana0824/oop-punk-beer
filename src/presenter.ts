/**
 * 1. View에게서 유저 이벤트를 받는 역할
 * 2. UI를 업데이트 하는 역할 -> DIP. View는 변할 수 있음.
 */

import { BeerDto, fetchBeers, fetchRandomBeers, Parameters } from "./gateway";

export interface IBeerOrder {
    getBeers: (beers: BeerDto[]) => void;
}

class Presenter {
    private beerOrder: IBeerOrder;

    constructor(beerOrder: IBeerOrder) {
        this.beerOrder = beerOrder
    }

    async getBeers(params: Parameters) {
        try {
            const beers = await fetchBeers(params)

            if (beers) {
                this.beerOrder.getBeers(beers)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async getRandomBeers() {
        try {
            const beers = await fetchRandomBeers()

            if (beers) {
                this.beerOrder.getBeers(beers)
            }
        } catch (e) {
            console.error(e)
        }
    }
}

export default Presenter;