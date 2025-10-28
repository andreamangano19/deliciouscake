const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const correctAnswers = {
  q1: "c:\\users\\utente\\appdata\\local\\temp",
  q2: "pslist",
  q3: "192.168.199.155"
};

app.post("/check", (req, res) => {
  const userAnswers = req.body;
  let score = 0;
  let result = {};

  for (let key in correctAnswers) {
    if (
      userAnswers[key] &&
      userAnswers[key].trim().toLowerCase() === correctAnswers[key].toLowerCase()
    ) {
      result[key] = true;
      score++;
    } else {
      result[key] = false;
    }
  }

  result.score = score;
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
