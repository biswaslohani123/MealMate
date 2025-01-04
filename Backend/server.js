import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config.js'




// app config
const app = express()
const PORT = process.env.PORT || 4000


// middleware
app.use(express.json())
app.use(cors())



//api endpoints
app.use("/api/user",userRouter)



app.get('/', (req, res) => {
    res.send('API Working')
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    
})


