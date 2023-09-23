const {Client} = require('pg')

const db = new Client({
    host:'localhost',
    port:5432,
    user:'postgres',
    password:'1234',
    database:'project'
})

db.on("connect",()=>{
    console.log("database connected")
})

db.on("end",()=>{
    console.log("database disconnected")
})

module.exports = db;