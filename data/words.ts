
// Struct in TypeScript
type Word = {
  word: string,
  id: string,
  letterCount: string
}

// Array of Word and export keyword is equivalent to the module.exports in Node
export const words: Word[] = [
  { word: "bacon", id: "123", letterCount: "5" },
  { word: "noodles", id: "124", letterCount: "7" },
  { word: "rice", id: "125", letterCount: "4" },
  { word: "sushi", id: "126", letterCount: "5" },
  { word: "kakigori", id: "127", letterCount: "8" },
  { word: "bingsoo", id: "128", letterCount: "7" },
  { word: "matcha", id: "129", letterCount: "6" },
  { word: "yakimeshi", id: "130", letterCount: "9" },
  { word: "ramen", id: "131", letterCount: "5" },
  { word: "takoyaki", id: "132", letterCount: "8" },
];


// module.exports = { words: words };
