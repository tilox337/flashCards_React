class Card {
  constructor(frontSide = "", backSide = "", learned = false) {
    this.frontSide = frontSide;
    this.backSide = backSide;
    this.learned = learned;
  }
}

export default Card;
