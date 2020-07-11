import { NowRequest, NowResponse } from "@vercel/node";

import { words } from "../../data/words";

export default (req: NowRequest, res: NowResponse) => {
  // Generate a random index to select a random word
  const randomIndex: number = Math.floor(Math.random() * words.length);

  // Destructure id and letterCount from the random word object 
  const { id, letterCount } = words[randomIndex];

  return res.json({ id, letterCount });
};

// module.exports = (req, res) => {
//     res.json({
//       body: req.body,
//       query: req.query,
//       cookies: req.cookies
//     })
//   }

