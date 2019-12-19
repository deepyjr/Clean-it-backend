const mongoose = require('mongoose')

const interventionSchema = new mongoose.Schema ({
    date: {
        type : Date,
        required: true,
        default: Date.now
    },
    latitude: {
        type : String,
        required: true
    },
    longitude: {
        type : String,
        required: true
    },
    lieu:{
        type : String,
        required: true
    },
    equipe:{
        type : String,
        required: true
    }
})

module.exports = mongoose.model('intervention', interventionSchema)