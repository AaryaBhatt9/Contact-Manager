const express = require("express");
const errorHandler = require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000 

console.log("Aarya Bhatt")

connectDb();

// app.get("/api/contacts", (req,res) =>
// {
//     res.send("Get all contacts");
// });

// app.get("/api/contacts" , (req,res)=> 
// {
//     res.json({"Message":"Send all contacts"})
// })

// app.get("/api/contacts",(req,res)=>
// {
//     res.status(400).json({"message":"send all contacts"})
// })

// here the given status code will be displayed!! 3 types of API


// app.post("/api/contacts",(req,res)=>
// {
//     res.send("Create a new contact!!");
// })

// app.put("/api/contacts",(req,res)=>
// {
//     res.send("update a  contact!!");
// })

// app.delete("/api/contacts",(req,res)=>
// {
//     res.send("delete a  contact!!");
// })


// here app.use() is the middleware
app.use(express.json());

app.use("/api/contacts", require("./routes/ContactRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)




app.listen(port, ()=>
{
    console.log(`Server is running on port ${port}`);
})