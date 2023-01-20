const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const pinRoutes=require("./routes/pins")
const userRoutes=require("./routes/users")

dotenv.config();

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })
  .then(() => {
    console.log("Mongo DB server Connected!");
  }).catch((err)=>{
    console.log(err);
  })

  mongoose.set('strictQuery',true)

//pinRoutes will be called any time /api/pins endpoint is contacted as a post request
app.use("/api/pins",pinRoutes)


//to register a new User
app.use("/api/users",userRoutes)


app.listen(7000, () => {
  console.log("Server is running on port " + 7000);
});
