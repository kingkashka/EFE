const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const { expressjwt } = require("express-jwt");
const path = require("path")

const secret = process.env.SECRET;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "dist")));

// mongoose.connect("mongodb+srv://keyesnicholas2017:ZfVMFfzCHvjMzKcz@cluster0.byosti0.mongodb.net/", (err) => {
//   if(err){
//   console.log(err)
// }
// console.log('connected to DB')
// })

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "your_database_name",
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use("/auth", require("./routes/authRouter.js"));
app.use("/api", expressjwt({ secret, algorithms: ["HS256"] }));
app.use("/api/review", require("./routes/reviewRouter.js"))
app.use("/soap", require("./routes/soapRouter.js"));
app.use("/butter", require("./routes/butterRouter.js"));

app.use((err, req, res, next) => {
  console.log(err);
  return res.send({ errMsg: err.message });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT || 9000, () => {
  console.log("The server is running on port 9000");
});
