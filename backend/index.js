const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const { v4:uuidv4 } = require("uuid")
const jwt = require("jsonwebtoken");

//HTTP METHODS
/**
 * GET      => Get metodu veri çekmek istediğimizde kullandığımız http metodudur. İster liste istersek sadece bir entity getirebiliriz.
 * POST     => Kaynağa yeni bir eleman ekleneceği zaman kullanılır. Create işlemlerinde kullanılır.
 * PUT      => Kaynaktaki bir veriyi güncellemek için kullanılır. Update işlemlerinde kullanılır
 * PATCH    => Kaynaktaki bir verinin belirli bir bölümünü güncellemek için kullanılır. Update işlemlerinde kullanılır.
 * DELETE   => Kaynaktan veri silmek için kullanılır. Delete işlemlerinde kullanılır.
 * 
 * ENDPOINT BEST PRACTICE
 * GET      => http://localhost:5000/products   => Bütün ürünleri getirir.
 * GET      => http://localhost:5000/products/1 => Ürünlerden id değeri 1 olan ürünü getirir
 * POST     => http://localhost:5000/products   => Kaynağa yeni bir ürün eklemek için kullanılır.
 * PUT      => http://localhost:5000/products   => Kaynaktaki veriyi güncellemek için kullanılır.
 * DELETE   => http://localhost:5000/products   => Kaynaktaki veriyi silmek için kullanılır.
 * 
 * 
 * POST     => http://localhost:5000/products/1 => Gönderdiğin metodun yaptığı işlemi çalıştırır. Create metodu ise ekleme, delete metodu ise silme işlemi, update metodu ise güncelleme işlemi yapar
 * POST     => http://localhost:5000/products/category/5 => Gönderdiğin metodun yaptığı işlemi çalıştırır. Create metodu ise ekleme, delete metodu ise silme işlemi, update metodu ise güncelleme işlemi yapar
 */

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
    categoryName : String
    // imageUrl : String
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
    products : Array,//[{product:product, amount:amount},{product:product, amount:amount}]
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

//PRODUCT LIST
app.get("/products",async (req,res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})
//PRODUCT LIST

//PRODUCT ADD
app.post("/products/add",async(req,res) => {
    try {
        const {name, stock, price, categoryName} = req.body;
        const product = new Product({
            id : uuidv4(),
            name : name,
            stock : stock,
            price : price,
            categoryName : categoryName
        });
        await product.save();
        res.json({message : "Product added successfully..."});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
});
//PRODUCT ADD

//PRODUCT DELETE
app.post("/products/remove",async (req, res) => {
    try {
        const {_id} = req.body;
        await Product.findByIdAndDelete(_id);
        res.json({message : "Product deleted successfully..."});
    } catch (error) {
        res.status(500).json({message : error.message});
    }
})
//PRODUCT DELETE

//CART ADD
app.post("/cart/add", async(req,res) => {
    try {
        const { product, user } = req.body;
        const cart = new Cart({
            id : uuidv4(),
            productId : product._id,
            userId : user._id
        });
        await cart.save();

        //const selectedProduct = await Product.findById(product._id);=> Parametre olarak productId gönderseydik product ı bu şekilde yakalardık.
        product.stock -= 1;
        await Product.findByIdAndUpdate(product._id,product);

        res.json({message : "The product has been successfully added to the cart."})
        
    } catch (error) {
        res.status(500).json({message : error.message});
    }     
})
//CART ADD






app.listen(port,() => {
    console.log("ETrade http://localhost:" + port + " üzerinden yayında.")
})