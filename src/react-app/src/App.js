import { useState } from 'react'
import Presenter from './modules/presenter';
import './App.css';

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

function App() {
  const [mention, setMention] = useState('어서오세요! 무슨 맥주 드릴까요?')
  const [beers, setBeers] = useState(null);

  beerOrder.setBeerHandler(setBeers);

  const handleClick = () => {
    setMention('감사합니다!')
    presenter.getRandomBeers().then();
  };

  return (
    <div className="App">
      <h1>{mention}</h1>

      <button onClick={handleClick}>아무맥주</button>

      {beers &&
        <section>
          <h2>내가 주문한 맥주</h2>
          {beers.map(beer => (
            <section>
              <h3>이름: {beer.name}</h3>
              <img src={beer.imageUrl} />
              <p>어울리는 음식들</p>
              <ul>
                {beer.foodPairing.map(food => <li>{food}</li>)}
              </ul>
            </section>
          ))}
        </section>
      }
    </div>
  );
}

export default App;
