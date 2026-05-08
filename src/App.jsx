import React from "react";
import Deck from "./Deck";
import Card from "./Card";
import "./App.css";

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
    const temp = [...this.state.decks];
    temp[this.state.activeDeckNumber].cards = [...updetedCards];
    this.setState({ decks: temp });
    localStorage.setItem("decks", JSON.stringify(this.state.decks));
  };

  componentDidMount() {
    const data = localStorage.getItem("decks");
    this.setState({ decks: data ? JSON.parse(data) : [] });
  }

  render() {
    return (
      <div className="app-container">
        <div style={{ display: "flex" }} className="input-group">
          <input
            className="input-main"
            type="text"
            value={this.state.nCard.frontSide}
            onChange={(e) => {
              const updateCard = new Card(
                e.target.value,
                this.state.nCard.backSide,
              );
              this.setState({ nCard: updateCard });
            }}
          />
          <input
            className="input-main"
            type="text"
            value={this.state.nCard.backSide}
            onChange={(e) => {
              const updateCard = new Card(
                this.state.nCard.frontSide,
                e.target.value,
              );
              this.setState({ nCard: updateCard });
            }}
          />
        </div>
        <div style={{ fontSize: 12, color: "red" }}>{this.state.err}</div>
        <button
          className="btn-create"
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
                nCard: { frontSide: "", backSide: "" },
              });
            } else {
              this.setState({ err: "заполните оба поля" });
              setTimeout(() => {
                this.setState({ err: "" });
              }, 3000);
            }
            localStorage.setItem("decks", JSON.stringify(this.state.decks));
          }}
        >
          create card
        </button>

        <div className="deck-list">
          {this.state.decks.map((deck, index) => (
            <div key={index}>
              {index === this.state.activeDeckNumber ? (
                <>
                  <input
                    className="input-main"
                    type="text"
                    value={this.state.decks[this.state.activeDeckNumber].name}
                    onChange={(e) => {
                      const cahngedDeck = this.state.decks;
                      cahngedDeck[this.state.activeDeckNumber].name =
                        e.target.value;
                      this.setState({ decks: cahngedDeck });
                      localStorage.setItem(
                        "decks",
                        JSON.stringify(this.state.decks),
                      );
                    }}
                  />
                  <button
                    className="btn-delete"
                    onClick={() => {
                      {
                        this.deleteDeckInState(
                          this.state.decks[this.state.activeDeckNumber],
                        );

                        this.setState({ activeDeckNumber: 0 });
                      }
                      localStorage.setItem(
                        "decks",
                        JSON.stringify(this.state.decks),
                      );
                    }}
                  >
                    X
                  </button>
                </>
              ) : (
                <button
                  className="deck-tab"
                  onClick={() => {
                    if (
                      this.state.decks[this.state.activeDeckNumber].name === ""
                    ) {
                      this.state.decks[this.state.activeDeckNumber].name =
                        "Deck";
                    }
                    this.setState({ activeDeckNumber: index });
                    localStorage.setItem(
                      "decks",
                      JSON.stringify(this.state.decks),
                    );
                  }}
                >
                  {deck.name}
                </button>
              )}
            </div>
          ))}
          <button
            className="deck-tab"
            onClick={() => {
              this.setState({
                decks: [...this.state.decks, new Deck("New deck")],
              });
              localStorage.setItem("decks", JSON.stringify(this.state.decks));
            }}
          >
            Create deck
          </button>
        </div>

        <div>
          {this.state.decks[this.state.activeDeckNumber]?.cards?.map(
            (card, index) => (
              <div key={index} className="card-item">
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
                    cahngedDeck[this.state.activeDeckNumber].cards = updateCard;
                    this.setState({ decks: cahngedDeck });
                  }}
                />
                <button
                  className="btn-edit"
                  onClick={() => {
                    this.setState({ nCard: card });
                    this.deleteCardInState(card);
                  }}
                >
                  change
                </button>
                <button
                  className="btn-delete"
                  onClick={() => {
                    this.deleteCardInState(card);
                    localStorage.setItem(
                      "decks",
                      JSON.stringify(this.state.decks),
                    );
                  }}
                >
                  x
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    );
  }
}
export default App;
