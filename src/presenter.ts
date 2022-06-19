/**
 * 1. View에게서 유저 이벤트를 받는 역할
 * 2. UI를 업데이트 하는 역할 -> DIP. View는 변할 수 있음.
 */

import { fetchBeers, Parameters } from "./gateway";

export interface IBeerOrder {
    getBeers: () => void;
}

class Presenter {
    private beerOrder: IBeerOrder;

    constructor(beerOrder: IBeerOrder) {
        this.beerOrder = beerOrder 
    }

    async getBeers(params: Parameters) {
        await fetchBeers(params)
        this.beerOrder.getBeers();
    }
}

export default Presenter;