import React from "react";
import Deck from "./Deck";
import Card from "./Card";

class Study extends React.Component {
  state = {
    decks: [new Deck("name")],
  };

  componentDidMount() {
    const data = localStorage.getItem("decks");
    this.setState({ decks: data ? JSON.parse(data) : [] });
  }
  render() {
    return (
      <>
        <div style={{ display: "flex", gap: "10px" }}>
          {this.state.decks.map((deck, index) => {
            return (
              <div key={index}>
                <button
                  onClick={() => {
                    this.setState({
                      activeDeckNumber: index,
                      activeDeck: this.state.decks[index],
                    });
                  }}
                >
                  {deck.name}
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <button></button>
          <button></button>
          <button></button>
        </div>
      </>
    );
  }
}

export default Study;
