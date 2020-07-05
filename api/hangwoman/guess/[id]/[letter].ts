import { NowRequest, NowResponse } from "@vercel/node";

import { words } from "../../../../data/words";

export default (req: NowRequest, res: NowResponse) => {
  const { id, letter } = req.query;

  const foundWordObject = words.find((word) => word.id === id);

  if (!foundWordObject)
    return res.status(404).json({ message: "Word not found." });

  const foundWordCharArray = foundWordObject.word.split("");

  // Transform into an array into array of booleans
  const answerArray = foundWordCharArray.map((char) => char === letter);

  res.status(200).json({ answers: answerArray });
};
