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
    try {
        if (req.body.username && req.body.phonenumber && req.body.gender && req.body.dob && req.body.email && req.body.password && req.body.confirmpassword && req.body.password === req.body.confirmpassword) {
          const user = await db.query('SELECT * FROM public.users WHERE email = $1', [req.body.email]);
          if (user.rows.length === 0) {
            let result = await db.query('INSERT INTO public.users(username, phonenumber, gender, dob, email, password) VALUES($1, $2, $3, $4, $5, $6)', [req.body.username,req.body.phonenumber,req.body.gender,req.body.dob,req.body.email,req.body.password]);
            res.send({ result });
          } else {
            res.send({ result: 'email already used' });
          }
        } else {
          res.send({ result: 'enter valid details' });
        }
      } catch (error) {
        res.send({ result: 'An error occurred while processing your request' });
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