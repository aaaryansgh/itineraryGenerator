require("dotenv").config();
const express=require("express")
const app=express();
const cors=require("cors");
const OpenAI=require("openai");
const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY})
app.use(express.json());
app.use(cors({
    origin:"https://itinerary-generator-frontend.vercel.app",
    credentials:true,
}))


app.post("/generate-itinerary",async(req,res)=>{
    const{destination,days,interest,budget}=req.body;
    try{
        const prompt = `
    Create a ${days}-day travel itinerary for ${destination} in JSON format without any Markdown formatting with:
    {
      "destination": "string",
      "budget": "string",
      "days": [
        {
          "title": "Day X – short theme",
          "morning": ["8:00 AM – Breakfast (€5)", "9:00 AM – Eiffel Tower (€25)"],
          "afternoon": ["Lunch at cafe (€20)", "Museum visit (€15)"],
          "evening": ["Dinner (€25)"]
        }
      ],
      "budgetBreakdown": [
        {"category": "Accommodation", "eur": 300, "inr": "₹26,000"},
        {"category": "Food & Dining", "eur": 120, "inr": "₹10,400"}
      ],
      "dos": ["Book tickets online", "Use Metro pass"],
      "donts": ["Avoid tourist traps", "Don’t forget to validate tickets"]
    }
    `;

        const response = await client.responses.create({
            model: "gpt-4.1-mini-2025-04-14",
            input: prompt,
            store:true
        });
        const jsonData = JSON.parse(response.output_text);
        res.json(jsonData);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message})
    }
})


app.listen(2000,()=>{
    console.log("Server is running on port 2000");
})

