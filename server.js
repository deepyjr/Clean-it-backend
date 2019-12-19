require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use((req, res, next ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        // On liste des méthodes et les entêtes valides
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    
        return res.end();
    }
    next();
})


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error',(error)=> console.error(error))
db.once('open',()=> console.log('connected'))

app.use(express.json())

const interventionsRouter = require('./routes/interventions')
app.use('/interventions', interventionsRouter)


//listening 
app.listen(3000, () => console.log('server started'))