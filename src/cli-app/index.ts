#!/usr/bin/env node
import readline from 'readline';
import { BeerDto } from '../dto';
import Presenter, { IBeerOrder } from '../presenter';

class BeerOrder implements IBeerOrder {
    getBeers(beers: BeerDto[]) {
        console.log(`맥주: `, beers)
        console.log('주문하신 맥주 나왔습니다!')
    }
}

const beerOrder = new BeerOrder();
const presenter = new Presenter(beerOrder);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const answerCallback = (answer: string) => {
    if (answer === '아무맥주') {
        console.log('감사합니다!');
        presenter.getRandomBeers().then();
        rl.close();
    } else {
        console.clear();
        console.log('죄송합니다. 손님 그런 메뉴는 없습니다 ㅠ\n');
        rl.question('다른거 필요한 건 없으세요?\n', answerCallback);
    }
};

rl.question('어서오세요! 무슨 맥주 드릴까요?\n', answerCallback);
    


