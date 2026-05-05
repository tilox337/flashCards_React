import React, { act } from "react";
import Deck from "./Deck";
import Card from "./Card";

class App extends React.Component {
  state = {
    decks: [new Deck("name", null, null, null)],
    nCard: new Card(),
    activeDeckNumber: 0,
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
            if (
              this.state.nCard.frontSide.trim() !== "" &&
              this.state.nCard.backSide.trim() !== ""
            ) {
              const cahngedDeck = this.state.decks;
              cahngedDeck[this.state.activeDeckNumber].cards.push(
                this.state.nCard,
              );
              this.setState({
                decks: cahngedDeck,

                nCard: {
                  frontSide: "",
                  backSide: "",
                },
              });
            }
          }}
        >
          create card
        </button>
        <div style={{ display: "flex", gap: "10px" }}>
          {this.state.decks.map((deck, index) => {
            return (
              <div key={index}>
                {index === this.state.activeDeckNumber ? (
                  <input
                    type="text"
                    value={this.state.decks[this.state.activeDeckNumber].name}
                    onChange={(e) => {
                      const cahngedDeck = this.state.decks;
                      cahngedDeck[this.state.activeDeckNumber].name =
                        e.target.value;

                      this.setState({
                        decks: cahngedDeck,

                        /*activeDeck: {
                          name: e.target.value,
                        },*/
                      });
                    }}
                  ></input>
                ) : (
                  <button
                    onClick={() => {
                      this.setState({
                        activeDeckNumber: index,
                        activeDeck: this.state.decks[index],
                      });
                      console.log(this.state.activeDeck);
                    }}
                  >
                    {deck.name}
                  </button>
                )}
              </div>
            );
          })}
          <button
            onClick={() => {
              this.setState({
                decks: [
                  ...this.state.decks,
                  new Deck("New deck", null, null, null),
                ],
              });
            }}
          >
            Create deck
          </button>
        </div>
        <div>
          {this.state.decks !== []
            ? this.state.decks[this.state.activeDeckNumber].cards.map(
                (card, index) => {
                  console.log(this.state.decks[this.state.activeDeckNumber]);

                  return (
                    <div key={index} style={{ display: "flex", gap: "10px" }}>
                      <div>{card.frontSide}</div>
                      <div>{card.backSide}</div>
                      <input
                        type="checkbox"
                        checked={card.learned}
                        onChange={() => {
                          let updateCard = [
                            ...this.state.decks[this.state.activeDeckNumber]
                              .cards,
                          ];
                          updateCard[index].learned =
                            !updateCard[index].learned;
                          this.setState({
                            decks: {
                              ...this.state.decks,
                              [activeDeckNumber]: {
                                ...this.state.decks[
                                  this.state.activeDeckNumber
                                ],
                                cards: updateCard,
                              },
                            },
                          });
                        }}
                      ></input>
                    </div>
                  );
                },
              )
            : {}}
        </div>
      </>
    );
  }
}

export default App;
