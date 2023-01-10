const express = require('express');
const router = express.Router();
const { Home } = require('../models')


require('../config/db.connection')

router.get("/limit/:limit", async (req, res, next) => {
    try {
        const home = await Home.find({}).limit(req.params.limit);
        res.status(200).json(home);
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

router.get("/limit/:limit/:page", async (req, res, next) => {
    try {
        const page = req.params.page;
        const home = await Home.find({})
        .skip(page > 0 ? (page - 1) * req.params.limit : 0)
        .limit(req.params.limit);
        res.status(200).json(home);
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

router.get("/user/:id", async (req, res, next) => {
    try {
        const userID = req.params.id;
        const home = await Home.find({userId: userID})
        res.status(200).json(home);
    } catch (error) {
        res.status(400).json(error);
        next();
    }
});

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

 router.get("/:id", async (req, res, next) => {
	try {
        const home = await Home.findById(req.params.id)
        const homeWithReviews = await home.populate('reviews');
        res.status(200).json(homeWithReviews)
    } catch (error) {
        res.status(400).json(error)
        next();
    }
});

router.delete("/:id", async (req, res, next) => {
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
