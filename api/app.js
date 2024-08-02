import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/auth.routes.js"
import profile from "./routes/user.routes.js"
const app=express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("api/profile",profile);

app.get('/',(req,res)=>{
    res.send("It time for Backend")
})

app.listen(8080,()=>{
    console.log("Server is running on 8080")
})