const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const todoRoutes = require("./views/todoRoutes");
const todoController=require("./controllers/todoController");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Swathu");
});

// Use todoRoutes for API endpoints
app.use("/api/todos", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => { 
    console.error(err.stack); // log the actual error object
    res.status(500).json({ message: "Something went wrong" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
