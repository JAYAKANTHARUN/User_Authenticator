const express = require('express');
const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// const bodyParser = require('body-parser');
// app.use(bodyParser.json({ limit: '10mb' }));

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
      }
      catch (error) {
        console.log(error)
        res.send({ result: 'An error occurred while processing signup request' });
      }
})

app.post('/login',async(req,res)=>{
  try {
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
  }
  catch (error) {
    console.log(error)
    res.send({ result: 'An error occurred while processing login request' });
  }
})

app.post('/getuser', async(req,res)=>{
  try{
    let result = await db.query('SELECT * FROM public.users WHERE email = $1', [req.body.lsemail])
    if (result.rows.length!==0){
      result = result.rows[0]
      res.send({result})
    }
    else{
      res.send({result:'no profile found'})
    }
  }
  catch(error){
    console.log(error)
    res.send({ result: 'An error occurred while processing getuser request' });
  }
})

app.post('/update',async(req,res)=>{
  try {
      if (req.body.username && req.body.phonenumber && req.body.gender && req.body.dob && req.body.profilephoto) {
          let result = await db.query('UPDATE public.users SET username = $1, phonenumber = $2, gender = $3, dob = $4, profilephoto = $5 WHERE email = $6', [req.body.username, req.body.phonenumber, req.body.gender, req.body.dob, req.body.profilephoto, req.body.email])
          res.send({ result })
      }
      else {
        res.send({ result: 'enter valid details' })
      }
    }
    catch (error) {
      console.log(error)
      res.send({ result: 'An error occurred while processing signup request' });
    }
})

app.post('/changepassword',async(req,res)=>{
  try {
      if (req.body.newpassword && req.body.oldpassword && req.body.confirmpassword && req.body.newpassword===req.body.confirmpassword) {
          const check = await db.query('SELECT * FROM public.users WHERE email = $1',[req.body.email])
          if (check.rows[0].password===req.body.oldpassword){
            const result = await db.query('UPDATE public.users SET password = $1 WHERE email = $2', [req.body.newpassword, req.body.email]);
            res.send({ result });
          }
          else{
            res.send({ result: 'invalid password' })
          }
      }
      else {
        res.send({ result: 'enter valid details' })
      }
    }
    catch (error) {
      console.log(error)
      res.send({ result: 'An error occurred while processing signup request' });
    }
})

app.post('/adminlogin',async(req,res)=>{
  try {
    if (req.body.username && req.body.password){
      const admin = await db.query('SELECT * FROM public.admins WHERE username = $1 AND password = $2',[req.body.username, req.body.password]);
      if (admin.rows.length!==0){
          res.send({result:"admin present"});
      }
      else{
          res.send({result:"no admin found"})
      }
    }
    else{
        res.send({result:"enter valid details"})
    }
  }
  catch (error) {
    console.log(error)
    res.send({ result: 'An error occurred while processing login request' });
  }
})

app.post('/getalluser', async(req,res)=>{
  try{
    let result = await db.query('SELECT * FROM public.users')
    if (result.rows.length!==0){
      result = result.rows
      res.send({result})
    }
    else{
      res.send({result:'no users found'})
    }
  }
  catch(error){
    console.log(error)
    res.send({ result: 'An error occurred while processing getuser request' });
  }
})

app.post('/removeuser/:id',async(req,res)=>{
  try{
    let userid = req.params.id
    let result = await db.query('DELETE FROM public.users WHERE userid = $1',[userid])
    res.send({ result:"user removed" })
  }
  catch(error){
    console.log(error)
    res.send({ result: 'An error occurred while processing getuser request' });
  }
})

app.get('/search/:key', async (req, res) => {
  try {
    const key = `%${req.params.key}%`
    const result = await db.query(`SELECT * FROM public.users WHERE username ILIKE $1 OR phonenumber ILIKE $1 OR gender ILIKE $1 OR dob ILIKE $1 OR email ILIKE $1`, [key]);
    res.send(result.rows);
  }
  catch (error) {
    console.error(error);
    res.send({ result: "An error occurred while searching for products" });
  }
})

app.listen(4000,()=>{
    console.log("backend server is running")
});