const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const AthenaModel = require("./model/AthenaDesk");
const TicketModel = require("./model/TicketModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
mongoose.connect(process.env.MONGO_URI);

app.get("/", (req, res) => {
  res.send("hello");
})
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  AthenaModel.findOne({ email: email }).then(async (user) => {
    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET,
      );
      if (user.password == password) {
        console.log("yes");
        await res.json({ mes: "Yes", token: token });
      } else {
        await res.json({ mes: "No" });
      }
    }
  });
});

function logHello() {
  console.log("Hello");
}

app.get("/users", (req, res) => {
  AthenaModel.find({}, { _id: 1, name: 1 }).then((user) => {
    res.send(user);
  });
});
app.get("/user", async (req, res) => {
  const token = await req.headers["x-access-token"];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const email = await decoded.email;
  const user = await AthenaModel.findOne({ email: email });
  res.send(user.name);
});

app.post("/checkIfRegistered", async (req, res) => {
  const userReg = await AthenaModel.findOne({ name: req.body.name });
  if (!userReg) {
    res.json("no");
  } else {
    res.json("yes");
  }
});

app.get("/tickets", async (req, res) => {
  const token = req.headers["x-access-token"];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const email = await decoded.email;
    const user = await AthenaModel.findOne({ email: email });
    if (user) {
      TicketModel.find({ asignee: user.name }).then((t) => {
        res.send(t);
      });
    }
  } catch {
    res.json({ mes: "No", error: "Invalid Token" });
  }
});

app.post("/register", (req, res) => {
  AthenaModel.create(req.body).then(console.log("Done!"));
});

app.post("/uploadTicket", (req, res) => {
  console.log(req.body);
  TicketModel.create(req.body).then(console.log("Done!"));
});

app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
