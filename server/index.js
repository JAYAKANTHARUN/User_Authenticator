const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));

const cors = require('cors')
app.use(cors())

const db = require('./database')
db.connect()

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

app.post('/signup',async(req,res)=>{
    try {
        const isValidEmail = emailRegex.test(req.body.email);
        if (req.body.username && req.body.phonenumber && req.body.gender && req.body.dob && req.body.email && req.body.password && req.body.confirmpassword && req.body.profilephoto && req.body.password === req.body.confirmpassword && isValidEmail) {
          const user = await db.query('SELECT * FROM public.users WHERE email = $1', [req.body.email]);
          if (user.rows.length === 0) {
            let result = await db.query('INSERT INTO public.users(username, phonenumber, gender, dob, email, password, profilephoto) VALUES($1, $2, $3, $4, $5, $6, $7)', [req.body.username,req.body.phonenumber,req.body.gender,req.body.dob,req.body.email,req.body.password,req.body.profilephoto]);
            res.send({ result });
          } else {
            res.send({ result: 'email already used' });
          }
        }
        else {
          res.send({ result: 'enter valid details' });
        }
      } catch (error) {
        console.log(error)
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