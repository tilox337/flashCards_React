import React, { act } from "react";
import Deck from "./Deck";
import Card from "./Card";

class App extends React.Component {
  state = {
    decks: [],
    nCard: new Card(),
    activeDeckNumber: 0,
  };

  deleteDeckInState = (element) => {
    const filtered = this.state.decks.filter((e) => e !== element);

    this.setState({ decks: filtered });
    localStorage.setItem("decks", JSON.stringify(this.state.decks));
  };
  deleteCardInState = (element) => {
    const updetedCards = this.state.decks[
      this.state.activeDeckNumber
    ].cards.filter((e) => e !== element);
    const temp = this.state.decks;
    temp[this.state.activeDeckNumber].cards = updetedCards;
    this.setState({ decks: temp });
    localStorage.setItem("decks", JSON.stringify(this.state.decks));
  };

  componentDidMount() {
    const data = localStorage.getItem("decks");
    console.log(data);
    this.setState({ decks: data ? JSON.parse(data) : [] });
  }

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
            localStorage.setItem("decks", JSON.stringify(this.state.decks));
          }}
        >
          create card
        </button>
        <div style={{ display: "flex", gap: "10px" }}>
          {this.state.decks.map((deck, index) => {
            return (
              <div key={index}>
                {index === this.state.activeDeckNumber ? (
                  <>
                    <input
                      type="text"
                      value={this.state.decks[this.state.activeDeckNumber].name}
                      onChange={(e) => {
                        const cahngedDeck = this.state.decks;
                        cahngedDeck[this.state.activeDeckNumber].name =
                          e.target.value;

                        this.setState({
                          decks: cahngedDeck,
                        });
                      }}
                    ></input>
                    <button
                      onClick={() => {
                        this.deleteDeckInState(
                          this.state.decks[this.state.activeDeckNumber],
                          "decks",
                        );
                        this.setState({ activeDeckNumber: 0 });
                      }}
                    >
                      X
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      this.setState({
                        activeDeckNumber: index,
                      });
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
                decks: [...this.state.decks, new Deck("New deck")],
              });
            }}
          >
            Create deck
          </button>
        </div>
        <div>
          {this.state.decks[this.state.activeDeckNumber]?.cards?.map(
            (card, index) => {
              return (
                <div key={index} style={{ display: "flex", gap: "10px" }}>
                  <div>{card.frontSide}</div>
                  <div>{card.backSide}</div>
                  <input
                    type="checkbox"
                    checked={card.learned}
                    onChange={() => {
                      let updateCard = [
                        ...this.state.decks[this.state.activeDeckNumber].cards,
                      ];
                      updateCard[index].learned = !updateCard[index].learned;
                      const cahngedDeck = this.state.decks;
                      cahngedDeck[this.state.activeDeckNumber].cards =
                        updateCard;
                      this.setState({
                        decks: cahngedDeck,
                      });
                    }}
                  ></input>
                  <button
                    onClick={() => {
                      this.setState({ nCard: card });
                      this.deleteCardInState(card);
                    }}
                  >
                    change
                  </button>
                  <button
                    onClick={() => {
                      this.deleteCardInState(card);
                    }}
                  >
                    x
                  </button>
                </div>
              );
            },
          )}
        </div>
      </>
    );
  }
}

export default App;
