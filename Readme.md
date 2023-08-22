const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.post("/chat", async (req, res) => {
  const completion = await openai.completions.create({
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

  console.log(completion);
  res.send(completion.choices[0]?.text.trim());
});
