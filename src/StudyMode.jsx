import React from "react";
import "./StudyMode.css";

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
      <div className="study-container">
        <div className="deck-nav">
          {this.state.decks.map((deck, index) => (
            <button
              key={index}
              className="deck-btn"
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
          <div className="card-area">
            <button className="nav-arrow" onClick={() => this.changeCard(-1)}>
              {"<-"}
            </button>
            <button
              className="flash-card"
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
            <button className="nav-arrow" onClick={() => this.changeCard(1)}>
              {"->"}
            </button>

            <div className="learned-footer">
              learned
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
          </div>
        ) : (
          <div>It is empty deck</div>
        )}
      </div>
    );
  }
}
export default Study;
