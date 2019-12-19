const mongoose = require('mongoose')

const passageSchema = new mongoose.Schema ({
    date: {
        type : Date,
        required: true,
        default: Date.now
    },
    compteur: {
        type : String,
        required: true
    }  
})

module.exports = mongoose.model('passage', passageSchema)