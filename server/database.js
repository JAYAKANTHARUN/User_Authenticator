const {Client} = require('pg')

// const db = new Client({
//     host:'localhost',
//     port:5432,
//     user:'postgres',
//     password:'1234',
//     database:'project'
// })

const db = new Client({
    connectionString : 'postgres://jayakanth:wVHhAbpUsrvHOHP0bpPgawdeEjZ44LyD@dpg-ckemjgunpffc738su3r0-a.oregon-postgres.render.com/dbmsproject?sslmode=verify-full',
})

db.connect()
    .then(() => {
        console.log('Database connected');
    }
)
    .catch((err) => {
        console.error('Error connecting to the database : ', err);
    }
)

db.on("end",()=>{
    console.log("database disconnected")
})

module.exports = db;