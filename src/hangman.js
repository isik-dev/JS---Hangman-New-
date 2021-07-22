class Hangman {
  constructor(word, guessesRemaining) {
    this.word = word.toLowerCase().split("");
    this.guessesRemaining = guessesRemaining;
    this.guessedLetters = [];
    this.status = "playing";
  }
  get statusMessage() {
    if (this.status === "playing") {
      return `Guesses left: ${this.guessesRemaining}`;
    } else if (this.status === "failed") {
      return `Nice try! The word was "${this.word.join("")}".`;
    } else {
      return "Great work! You guessed the word";
    }
  }
  updateStatus() {
    const finished = this.word.every(
      (letter) => this.guessedLetters.includes(letter) || letter === " "
    );

    if (this.guessesRemaining === 0) {
      this.status = "failed";
    } else if (finished) {
      this.status = "finished";
    } else {
      this.status = "playing";
    }
  }
  get puzzle() {
    let puzzle = "";

    this.word.forEach((letter) => {
      if (this.guessedLetters.includes(letter) || letter === " ") {
        puzzle += letter;
      } else {
        puzzle += "*";
      }
    });

    return puzzle;
  }
  makeGuess(guess) {
    if (this.status === "playing") {
      guess = guess.toLowerCase();
      const uniqueGuess = !this.guessedLetters.includes(guess);
      const badGuess = !this.word.includes(guess);

      if (uniqueGuess) {
        this.guessedLetters = [...this.guessedLetters, guess];
      }
      if (uniqueGuess && badGuess) {
        this.guessesRemaining--;
      }
      this.updateStatus();
    }
  }
}

export { Hangman as default };
