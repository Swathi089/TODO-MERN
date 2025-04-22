const express =require("express")
const cors =require ("cors");
const dotenv=require("dotenv");
const connectDB= require("./config/db")
const toadoRoutes=require("./views/todoRoutes")

dotenv.config();
connectDB();

const app=express();

app.get("/",(req,res)=>{
    res.json("Swathu");

})

app.use("/api/todos",toadoRoutes)
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);

})