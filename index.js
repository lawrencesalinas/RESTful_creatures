const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')

app.use (methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)

//body-parser middleware, this will store the data submitted from the form in a user friendly req.body object
//The express.urlencoded() middleware tells body-parser to capture urlencoded data (form data) and store it in req.body. 
//The {extended: false} option ensures that the values in this body will either be strings or arrays. 
app.use(express.urlencoded({extended: false}));

app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures.js'))










app.get('/', (req, res) => {
    res.render('home.ejs')
})



app.listen(8000, () => {
    console.log("RESTful_creautres")
})
