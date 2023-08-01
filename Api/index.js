const express = require("express");
// eN1nD4TKz1TJZDSD

const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoutes");
const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: false }));
mongoose
  .connect(
    "mongodb+srv://ethical345:eN1nD4TKz1TJZDSD@cluster0.cgh01rm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection sucfessfull!"))
  .catch((err) => console.log(err.message));
app.use(express.json());
app.use(cors());

app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("application is running on port 3000");
});
