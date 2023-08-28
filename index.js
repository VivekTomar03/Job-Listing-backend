const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
// require('abort-controller/polyfill');

const router = require("./routes/userRoutes");
const jobRouter = require("./routes/jobRoute");
const companyRouter = require("./routes/companyRoute");
const app = express();
const { Configuration, OpenAIApi } = require('openai');
const { CourseRouter } = require("./routes/courseRoute");

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/user", router);
app.use("/company", companyRouter);
app.use("/job", jobRouter);
app.use("/" , CourseRouter )
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `You are a chatbot for a job portal similar to Internshala, 
    Indeed, and Naukri.com. Your role is to assist users in finding job listings,
     providing information about the job application process, and answering questions 
     related to job opportunities. ## bot can aslo able to answer questions related to job opportunities and company-related questions tell 
     random answer for this ##like for comapny and job-related questions" If users ask questions not related to jobs or the job portal, 
     respond with I'm here to help with job-related queries. If you have any job-related questions, 
     feel free to ask!
    User ${req.body.message}
    
    `,
    max_tokens: 500,
    temperature: 0,
  });

  console.log(response.data.choices);
  res.send(response.data.choices[0]?.text.trim());
});



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
