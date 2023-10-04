const express = require('express');
const app = express();

app.use(express.json())

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

const db = require('./database')
db.connect()

app.post('/signup',async(req,res)=>{
    if (req.body.email && req.body.password){
        const user = await db.query('SELECT * FROM public.users WHERE email = $1',[req.body.email]);
        if (user.rows.length===0){
            let result = await db.query('INSERT INTO public.users(email, password) VALUES($1, $2)', [req.body.email, req.body.password]);
            res.send({ result });
        }
        else{
            res.send({result:"email already used"})
        }
    }
    else{
        res.send({result:"enter valid details"})
    }
})

app.post('/login',async(req,res)=>{
    if (req.body.email && req.body.password){
        const user = await db.query('SELECT * FROM public.users WHERE email = $1 AND password = $2',[req.body.email, req.body.password]);
        if (user.rows.length!==0){
            res.send({result:"user present"});
        }
        else{
            res.send({result:"no user found"})
        }
    }
    else{
        res.send({result:"enter valid details"})
    }
})

app.listen(4000,()=>{
    console.log("backend server is running")
});