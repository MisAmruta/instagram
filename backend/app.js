const express = require('express');
const app = express();
const cors = require('cors')
const PORT= process.env.PORT || 5000;
//mongodb...
const mongoose = require('mongoose');
const {MONGOURI}=  require('./Keys')



 mongoose.connect(MONGOURI,{
    useUnifiedTopology: true,
    useNewUrlParser: true
 });
 mongoose.connection.on('connected',()=>{
     console.log("connected to mongoose!!")
 })
 mongoose.connection.on('error',(err)=>{
    console.log("error generated!!",err)
})

//userschema
require('./models/user');
require('./models/post')
app.use(express.json())
app.use(cors())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.get('/',(req,res)=>{
    res.send("Hello world");
})


app.listen(PORT,()=>{
    console.log("server is running ..." ,PORT);
})

