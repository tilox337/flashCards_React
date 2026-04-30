class Deck {
  cards = [];
  tab = {};
  constructor(name, tabEl = null, nameEl = null, deleteButton = null) {
    this.name = name;
    this.tab.tabEl = tabEl;
    this.tab.nameEl = nameEl;
    this.tab.deleteButton = deleteButton;
  }

  addCard = (card) => {
    this.cards.push(card);
  };
}

export default Deck;
