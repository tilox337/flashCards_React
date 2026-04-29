import React from "react";
import Deck from "./Deck";
import Card from "./Card";

class App extends React.Component {
  state = {
    decks: [],
  };
  render() {
    let nCard;
    nCard = new Card();
    let activeDeck = new Deck("name", null, null, null);

    return (
      <>
        <div style={{ display: "flex" }}>
          <input
            id="front"
            type="text"
            onChange={(e) => {
              nCard.frontSide = e.target.value;
            }}
          ></input>
          <input
            id="back"
            type="text"
            onChange={(e) => {
              nCard.backSide = e.target.value;
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            activeDeck.addCard(nCard);
            console.log(activeDeck);
          }}
        >
          create card
        </button>
      </>
    );
  }
}

export default App;
