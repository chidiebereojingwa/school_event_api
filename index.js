const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth");
const productRoute = require("./routes/event");
const cors = require("cors");



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


app.use(cors());
app.use(express.json())
app.use("/api/user",userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", eventRoute);

 


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running")
})

