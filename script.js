const getWord = async () => {
  const response = await fetch("/api/hangwoman/words");
  const data = await response.json();

  return data;
};

const printAnswer = (array) => {
  const transformedArray = array.map((element) => {
    if (element !== false) return `${element} `;
    else return "_ ";
  });

  return transformedArray.join("");
};

const startGame = async () => {
  const wordObject = await getWord();

  const answersArray = new Array(Number(wordObject.letterCount)).fill(false);

  document.getElementById("answer").innerText = printAnswer(answersArray);

  const guessesArray = [];

  document.addEventListener("keydown", async (event) => {
    const { key } = event;

    guessesArray.push(key);

    const rightLetter = await fetch(
      `/api/hangwoman/guess/${wordObject.id}/${key}`
    );
    const { answers } = await rightLetter.json();

    answers.forEach((guessedLetter, index) => {
      if (guessedLetter === true) {
        answersArray[index] = key;
      }
    });

    document.getElementById("guess").innerText = guessesArray.toString();

    document.getElementById("answer").innerText = printAnswer(answersArray);
  });
};

startGame();
