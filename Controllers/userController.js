const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//desc. register a user
//route POST/api/contacts/register
//access public


// At login endpoint we will use json web token 

const registerUser = AsyncHandler(async (req,res)=>
{
    const {username,email,password} =req.body;
    if(!username,!email,!password)
    {
        res.status(400);
        throw new Error("All fields are mandatory")
    }

    const userAvailable = await User.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already registered")
    }


    const hashedpassword = await bcrypt.hash(password,10) 
    console.log("Hashed password is:-", hashedpassword)
    const user = await User.create({
        username,email,password: hashedpassword,
    });

    console.log(`User created ${user}`);
    if(user)
    {
        res.status(201).json({_id: user.id , email: user.email})
    }

    else{
        res.status(400);
        throw new Error("User data is not valid")
    }

    
})

//desc. login a user
//route POST/api/contacts/login
//access public
const loginUser = AsyncHandler(async (req,res)=>
{
    const {email, password} = req.body;
    if(!email, !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory..")
    }
        const user = await User.findOne({email});
        // compare password with hashedpassword
            if ( user && (await bcrypt.compare(password,user.password)))
            {
                const accessToken = jwt.sign(
                    {
                        user:{
                            username: user.username,
                            email: user.email,
                            id: user.id,
                        },
                    },process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: "25m"}
                    
                );
                res.status(200).json({accessToken});
            }
   
            else{
                res.status(401);
                throw new Error("Email or password is not valid")
            }
   
            

});

// only authorized or people having accesstoken can access private routes..
//desc. current user info
//route POST/api/contacts/current
//access private(only a logged in user can get current info. of a system)

const currentUser = AsyncHandler(async (req,res)=>
{
    res.json(req.user)

}) 

module.exports = {registerUser,loginUser,currentUser}