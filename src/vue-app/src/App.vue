<template>
  <div className="app">
    <h1>{{ mention }}</h1>

    <button v-on:click="handleClick">아무맥주</button>
    <template v-if="beers">
      <section>
        <h2>내가 주문한 맥주</h2>
        <section v-for="beer in beers" :key="beer.id">
          <h3>이름: {{beer.name}}</h3>
          <img v-bind:src="beer.imageUrl"/>
          <p>어울리는 음식들</p>
          <ul>
            <li :key="food" v-for="food in beer.foodPairing">{{food}}</li>
          </ul>
        </section>
      </section>
    </template>
  </div>
</template>

<script>
import Presenter from './modules/presenter';

class BeerOrder {
  #beerHandler;

  getBeers(beers) {
    this.#beerHandler(beers)
  }

  setBeerHandler(handler) {
    this.#beerHandler = handler;
  }
}

const beerOrder = new BeerOrder();
const presenter = new Presenter(beerOrder);

export default {
  name: 'App',
  created() {
    beerOrder.setBeerHandler((beers) => { this.beers = beers})
  },
  data() {
    return {
      mention: '어서오세요! 무슨 맥주 드릴까요?',
      beers: null
    }
  },
  methods: {
    handleClick() {
      this.mention = '감사합니다!';
      presenter.getRandomBeers().then();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
