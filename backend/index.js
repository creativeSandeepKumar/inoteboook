const connectToMongo = require("./db");
const express = require("express");
let cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// express app using cors to deal with system access issue to connect with db and express json format to store data
connectToMongo();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello to inotebook backend");
});

// app using api routes to access api/auth and api/notes further routes for schemas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`);
});
