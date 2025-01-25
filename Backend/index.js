import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoute from "./route/book.route.js";
import cors from "cors";

// import bookRoute from "./route/book.route.js";
import userRoute from "./route/user.route.js";
const app = express()

app.use(cors());
app.use(express.json());

dotenv.config();

const port = process.env.port || 4000;
const URI=process.env.MongoDBURI;

//connect to mongodb
try {
  mongoose.connect(URI,{
    useNewURIParser:true,
    useUnifiedTopology: true
  }
  );
  console.log("connected to mongoDB")
} catch (error) {
  console.log("error", error);
}


//Defining Routes
app.use("/book", bookRoute);
app.use("/user", userRoute);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})