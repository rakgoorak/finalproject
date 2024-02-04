const express = require("express");
const { readdirSync } = require("fs");
const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({ limit: "10mb" }));
app.use('/uploads', express.static('uploads'))
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

app.listen(5000, () => console.log("Server Running port 5000"));
