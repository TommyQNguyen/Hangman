

// Get a word from the random word generator API "words".
const getWord = async () => {
  const response = await fetch("/api/hangwoman/words");
  const data = await response.json();

  // Returns the data in this form: 
  // Object { id: "127", letterCount: "8" }
  return data;
};

// Function to visually represent the masked array filled with falses to the user on the HTML document
const printAnswer = (array) => {
  const transformedArray = array.map((element) => {
    if (element !== false)          // If element is not false, it represents a letter.
        return `${element} `;
    else 
        return "_ ";                // If element is false, it means the letter is not yet found.
  });

  return transformedArray.join(""); // Returns the result (the word complete or incomplete).
};

const winningMessage = () => {
  console.log("You win!"); //to Remove

  const youWinElement = document.getElementById("youWin");
  const hanaElement = document.getElementById("hana");
  const beforeElement = document.getElementById("before");
  const afterElement = document.getElementById("after");

  youWinElement.style.display = "inherit";
  youWinElement.style.animation = "slideIn 1s ease-in-out";

  hanaElement.style.display = "inherit";
  hanaElement.style.animation = "slideIn 5s ease-in-out";

  beforeElement.style.animation =
    "1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 4s position linear infinite backwards";
  afterElement.style.animation =
    "1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards";
};

const startGame = async () => {

  // Obtain the random word by calling the getWord function.
  const wordAnswerObject = await getWord();
  const MAX_NUMBER_OF_GUESSES = 100;
  let numberOfGuesses = 0;

  // Creates an array that will represent the masked word filled with false
  // Uses the letterCount to fill it with the right number of false values
  const wordAnswersArray = new Array(Number(wordAnswerObject.letterCount)).fill(false);

  // On the HTML document, output the masked array by calling printAnswer()
  document.getElementById("answer").innerText = printAnswer(wordAnswersArray);

  // Array to record the letter guesses of the user
  const wordGuessesArray = [];

  // Event listener that uses the keyboard keys
  document.addEventListener("keydown", async (event) => {
      
    numberOfGuesses = numberOfGuesses + 1;

    if (numberOfGuesses > MAX_NUMBER_OF_GUESSES) {
      // 3. if over display game over and play again.
      document.getElementById("play-again").style.display = "inherit";
      document.getElementById("play-again").style.animation =
        "slideIn 1s ease-in-out";
      return;
    }

    // Destructures the key pressed from the event
    const { key } = event;

    // Adds the key pressed to the wordGuessesArray to record it
    wordGuessesArray.push(key);

    const rightLetter = await fetch(
      `/api/hangwoman/guess/${wordAnswerObject.id}/${key}`
    );

    console.log(rightLetter);

    const { answers } = await rightLetter.json();

    console.log(answers);

    answers.forEach((guessedLetter, index) => {
      if (guessedLetter === true) {
        wordAnswersArray[index] = key;
      }

    });

    if (wordAnswersArray.every(element => element !== false)) {
        winningMessage();
    }


    document.getElementById("guesses").innerText = wordGuessesArray.toString();

    document.getElementById("answer").innerText = printAnswer(wordAnswersArray);
  });
};

startGame();
