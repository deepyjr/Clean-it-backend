const express = require('express')
const router = express.Router()
const Intervention = require('../models/intervention')

// get all
router.get('/', async (req,res) =>{
    try{
        const interventions = await Intervention.find()
        res.json(interventions)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// get one
router.get('/:id', getIntervention, (req,res) =>{
    res.send(res.intervention)
})

//creating one 
router.post('/', async (req,res)=>{
    const intervention = new Intervention ({
        latitude : req.body.latitude,
        longitude: req.body.longitude,
        lieu: req.body.lieu,
        equipe: req.body.equipe
    })
    try{
        const newIntervention = await intervention.save()
        res.status(201).json(newIntervention)
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

//delete one 
router.delete('/:id', getIntervention ,async (req,res)=>{
    try{
        await res.intervention.remove()
        res.json({message : 'deleted'})
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//update one 
router.patch('/:id',getIntervention, async (req,res)=>{
    if( req.body.latitude != null){
        res.intervention.latitude = req.body.latitude
    }
    if( req.body.longitude != null){
        res.intervention.longitude = req.body.longitude
    }
    if( req.body.lieu != null){
        res.intervention.lieu = req.body.lieu
    }
    if( req.body.equipe != null){
        res.intervention.equipe = req.body.equipe
    }
    try{
        const updateIntervention = await intervention.save()
        res.json(updateIntervention)
    } catch(err){
        return res.status(400).json({ message: err.message })
    }
})


async function getIntervention(req, res , next){
    try{
        intervention = await Intervention.findById(req.params.id)
        if(Intervention == null){
           return res.status(404).json({ message: 'cannot find intervention' })
        }
    } catch (err){
        return res.status(500).json({ message: err.message })
    }
    res.intervention = intervention
    next()
}

module.exports = router