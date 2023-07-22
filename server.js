const express = require('express')
const app = express()

app.use(express.json())

//routes
app.get('/', (req, res) => {
    res.send('Hello To Node API..')
})

//Get all places
app.get('/places', (req, res) => {
	try {
		const {type} = req.params;
		var fs = require('fs');
		var data = JSON.parse(fs.readFileSync('./placeslist.json', 'utf8'));
		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

//filter places by type
app.get('/places/type/:type', (req, res) => {
	try {
		const {type} = req.params;
		var fs = require('fs');
		var db = JSON.parse(fs.readFileSync('./placeslist.json', 'utf8'));
		const data = db.filter((item) =>
			item.type.toLowerCase() == type.toLowerCase()
		);

		res.status(200).json(data)
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

//filter places by id
app.get('/places/id/:id', (req, res) => {
	try {
		const {id} = req.params;
		var fs = require('fs');
		var db = JSON.parse(fs.readFileSync('./placeslist.json', 'utf8'));
		const data = db.filter((item) =>
			item.id == id
		);

		res.status(200).json(data[0])
	} catch (error) {
		res.status(500).json({message: error.message})
	}
})

//Start Listening Ways:
//1. 
//app.listen(3000)
//2.
app.listen(3000, () => {
    console.log('Node API is running on port 3000')
})