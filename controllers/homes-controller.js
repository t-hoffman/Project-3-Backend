const express = require('express');
const router = express.Router();
const { Home } = require('../models')


require('../config/db.connection')

router.get('/', async (req, res, next) => {
    try {
        const homes = await Home.find({})
        res.status(200).json(homes)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
   
})

router.post('/', async (req, res, next) =>{
    try {
     const createdHome = await Home.create(req.body)
     res.status(201).json(createdHome)
     
    } catch (error) {
     res.status(400).json(error)
         next();
    }
 })

 router.get("/:id", async (req, res) => {
	try {
        const home = await Home.findById(req.params.id)
        res.status(200).json(home)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.delete("/:id", async (req, res) => {
	try {
        const deletedHome = await Home.findByIdAndRemove(req.params.id)
        res.status(202).json({message:`${deletedHome}`})
        
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.put("/:id", async (req, res, next) => {
	try {
        const updatedHome = await Home.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json(updatedPerson)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

module.exports = router;
