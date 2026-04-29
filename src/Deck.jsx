class Deck {
  cards = [];
  tab = {};
  constructor(name, tabEl, nameEl, deleteButton) {
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
