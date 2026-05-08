import React from "react";
import Deck from "./Deck";
import Card from "./Card";

class Study extends React.Component {
  state = {
    decks: [],
    activeDeckNumber: 0,
    nowCard: 0,
    isFront: true,
  };

  componentDidMount() {
    const data = localStorage.getItem("decks");
    if (data) this.setState({ decks: JSON.parse(data) });
  }

  changeCard = (step) => {
    const cards = this.state.decks[this.state.activeDeckNumber]?.cards || [];
    if (cards.length > 0) {
      this.setState({
        nowCard: (this.state.nowCard + step + cards.length) % cards.length,
        isFront: true,
      });
    }
  };

  render() {
    return (
      <>
        <div>
          {this.state.decks.map((deck, index) => (
            <button
              key={index}
              onClick={() =>
                this.setState({
                  activeDeckNumber: index,
                  nowCard: 0,
                  isFront: true,
                })
              }
            >
              {deck.name}
            </button>
          ))}
        </div>

        {this.state.decks[this.state.activeDeckNumber]?.cards?.[
          this.state.nowCard
        ] ? (
          <div>
            <button onClick={() => this.changeCard(-1)}>{"<-"}</button>
            <button
              onClick={() => this.setState({ isFront: !this.state.isFront })}
            >
              {this.state.isFront
                ? this.state.decks[this.state.activeDeckNumber].cards[
                    this.state.nowCard
                  ].frontSide
                : this.state.decks[this.state.activeDeckNumber].cards[
                    this.state.nowCard
                  ].backSide}
            </button>
            <button onClick={() => this.changeCard(1)}>{"->"}</button>

            <input
              type="checkbox"
              checked={
                !!this.state.decks[this.state.activeDeckNumber].cards[
                  this.state.nowCard
                ].learned
              }
              onChange={() => {
                const temp = [...this.state.decks];
                temp[this.state.activeDeckNumber].cards[
                  this.state.nowCard
                ].learned =
                  !temp[this.state.activeDeckNumber].cards[this.state.nowCard]
                    .learned;

                this.setState({ decks: temp }, () => {
                  localStorage.setItem(
                    "decks",
                    JSON.stringify(this.state.decks),
                  );
                });
              }}
            />
          </div>
        ) : null}
      </>
    );
  }
}

export default Study;
