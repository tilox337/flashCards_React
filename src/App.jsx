import React from "react";
import Deck from "./Deck";
import Card from "./Card";

class App extends React.Component {
  state = {
    decks: [],
    nCard: new Card(),
    activeDeck: new Deck("name", null, null, null),
  };
  render() {
    return (
      <>
        <div style={{ display: "flex" }}>
          <input
            type="text"
            value={this.state.nCard.frontSide}
            onChange={(e) => {
              const updateCard = new Card(
                e.target.value,
                this.state.nCard.backSide,
              );
              this.setState({ nCard: updateCard });
            }}
          ></input>
          <input
            type="text"
            value={this.state.nCard.backSide}
            onChange={(e) => {
              const updateCard = new Card(
                this.state.nCard.frontSide,
                e.target.value,
              );
              this.setState({ nCard: updateCard });
            }}
          ></input>
        </div>
        <button
          onClick={() => {
            this.setState({
              activeDeck: {
                ...this.state.activeDeck,
                cards: [...this.state.activeDeck.cards, this.state.nCard],
              },
              nCard: {
                frontSide: "",
                backSide: "",
              },
            });

            console.log(this.state.activeDeck);
          }}
        >
          create card
        </button>
        <div>
          {this.state.activeDeck.cards.map((card, index) => {
            return (
              <div key={index} style={{ display: "flex", gap: "10px" }}>
                <div>{card.frontSide}</div>
                <div>{card.backSide}</div>
                <input type="checkbox" checked={card.learned}></input>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default App;
