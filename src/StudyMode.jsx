import React from "react";
import Deck from "./Deck";
import Card from "./Card";

class Study extends React.Component {
  state = {
    decks: [new Deck("name")],
    activeDeckNumber: 0,
    nowCard: 0,
    nowSide: "asdasd",
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
                      nowCard: 0,
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
          <button
            onClick={() => {
              this.setState({
                nowCard:
                  (this.state.nowCard -
                    1 +
                    this.state.decks[this.state.activeDeckNumber].cards
                      .length) %
                  this.state.decks[this.state.activeDeckNumber].cards.length,
              });
            }}
          ></button>
          <button
            onClick={() => {
              this.setState({
                nowSide:
                  this.state.decks[this.state.activeDeckNumber].cards[
                    this.state.nowCard
                  ].frontSide !== this.state.nowSide
                    ? this.state.decks[this.state.activeDeckNumber].cards[
                        this.state.nowCard
                      ].frontSide
                    : this.state.decks[this.state.activeDeckNumber].cards[
                        this.state.nowCard
                      ].backSide,
              });
            }}
          >
            {this.state.nowSide}
          </button>
          <button
            onClick={() => {
              this.setState({
                nowCard:
                  (this.state.nowCard + 1) %
                  this.state.decks[this.state.activeDeckNumber].cards.length,
              });
            }}
          ></button>
        </div>
      </>
    );
  }
}

export default Study;
