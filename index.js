const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
// require('abort-controller/polyfill');

const router = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoute");
const companyRouter = require("./routes/companyRoute");
const app = express();
// const { Configuration, OpenAIApi } = require('openai');

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/user", router);
app.use("/company", companyRouter);
app.use("/job", jobRouter);




const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("server is connected to db");
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
