const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dontenv = require("dotenv");
const userRoute = require("./routes/users")



mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json())
app.use("/api/user",userRoute)
 


app.listen(process.env.PORT || 5000, () => {
    console.log("Backend Server is running")
})

