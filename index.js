import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const port = 3000;
const app= express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/MoneyTracker')
var db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/add", (req,res) =>{
    var category_select = req.body.category_select
    var amount_input= req.body.amount_input
    var info = req.body.info
    var date_input = req.body.date_input

    var data={
        "Category": category_select,
        "Amount" : amount_input,
        "Info": info,
        "Date": date_input
    }
    db.collection('users').insertOne(data, (err,collection) => {
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully")

    })
})
app.get("/",(req,res) =>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})

app.listen(port,()=>{
    console.log(`Listening on Port ${port}`);
})