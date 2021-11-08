const express = require('express')
const router = express.Router()
const fs = require('fs')
const methodOverride = require('method-override')


//index route
router.get('/', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    // console.log(creatureData)
    res.render('prehistoric_creatures/index', {myCreatures: creatureData})
})
//route to create new creature
router.get('/new', (req, res) =>{
    res.render('prehistoric_creatures/new.ejs')
})

//route to show individual creature
router.get('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    let creatureIndex = parseInt(req.params.idx)
    // console.log(creatureData)
    res.render('prehistoric_creatures/show.ejs', {myCreature:creatureData[creatureIndex]} )
    
})

//post new creature created from new route
router.post('/', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    creatureData.push(req.body)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

//delete creature
router.delete('/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    creatureData.splice(req.params.idx, 1)
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})

//creature edit form route
router.get('/edit/:idx', (req, res) => {
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)
    res.render('prehistoric_creatures/edit.ejs', {creature: creatureData[req.params.idx], creatureId: req.params.idx})
})

//put route for edited values
router.put('/:idx', (req, res) =>{
    let creatures = fs.readFileSync('./prehistoric_creatures.json')
    let creatureData = JSON.parse(creatures)

    creatureData[req.params.idx].type = req.body.type
    creatureData[req.params.idx].img_url = req.body.img_url

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))
    res.redirect('/prehistoric_creatures')
})



module.exports = router