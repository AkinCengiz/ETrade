const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const { v4:uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken");



app.use(cors());
app.use(express.json());

//console.log(uuidv4()) => uuidv4() metodu benzersiz bir id üretir.

const url ="mongodb+srv://akincengiz:Bjk1903@akincengiz.khf0v.mongodb.net/?retryWrites=true&w=majority&appName=akincengiz";
const port = 5000;

mongoose.connect(url).then(res => {
    console.log("Connection sucsess");
}).catch(err => {
    console.log(err.message);
})

//USER COLLECTION START
const userSchema = new mongoose.Schema({
    id : String,
    userName : String,
    email : String,
    password : String,
    isAdmin : Boolean
});

const User = mongoose.model("User",userSchema)
// module.exports = User;
//USER COLLECTION END

//PRODUCT COLLECTION START
const productSchema = new mongoose.Schema({
    id : String,
    name : String,
    price : Number,
    stock : Number,
    categoryName : String,
    imageUrl : String
});
const Product = mongoose.model("Product",productSchema);
//PRODUCT COLLECTION END

//CART COLLECTION START
const cartSchema = new mongoose.Schema({
    id : String,
    productId : String,
    userId : String
});
const Cart = mongoose.model("Cart",cartSchema);
//CART COLLECTION END

//ORDER COLLECTION START
const orderSchema = new mongoose.Schema({
    id : String,
    productId : String,
    userId : String
});
const Order = mongoose.model("Order",orderSchema);
//ORDER COLLECTION END

//TOKEN START
const secretKey = "Gizli anahtar Anahtar gizli";
const option = {
    expiresIn : "1h"
};
//TOKEN END


//USER REGISTER
//https://localhost:5000/auth/register
app.post("/auth/register",async (req,res)=>{
    try{
        const {userName,email, password} = req.body;
        let user = new User({
            id:uuidv4(),
            userName : userName,
            email : email,
            password : password,
            isAdmin : false
        });
        await user.save();
        const payload = {
            user : user
        }
        const token = jwt.sign(payload,secretKey,option);
        res.json({user : user, token:token});
    }catch(error){
        res.status(500).json({error : error.message})
    }
});

//USER LOGIN
app.post("/auth/login",async(req,res)=> {
    try {
        const {email, password} = req.body;
        const users = await User.find({email:email,password:password});
        if(users.length === 0){
            res.status(500).json({message : "Username or password not found"});
        }else{
            const payload = {
                user : users[0]
            }
            const token = jwt.sign(payload,secretKey,option);
            res.json({user:users[0],token:token})
        }
    } catch (error) {
        res.status(500).json({error : error.message})
    }
})










app.listen(port,() => {
    console.log("ETrade http://localhost:" + port + " üzerinden yayında.")
})