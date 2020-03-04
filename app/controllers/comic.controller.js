const Comic = require('../models/comic.model.js');

// Create and Save a new comic
exports.create = (req, res) => {
    //validate request
    if(!req.body.serieTitle){
        return res.status(400).send({
            message: "Comic serieTitle can not be empty"
        });
    }

    //Create the comic
    const comic = new Comic({
        serieTitle: req.body.serieTitle,
        issueNumber: req.body.issueNumber,
        publisher: req.body.publisher,
    });

    comic.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating the comic"
        });
    });

};

// Retrieve and return all comics from the database.
exports.findAll = (req, res) => {
    Comic.find()
    .then(comics => {
        res.send(comics);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving comics."
        });
    });
};


// Find a single comic with a comicId
exports.findOne = (req, res) => {
    Comic.findById(req.params.comicId)
    .then(comic => {
        if(!comic) {
            return res.status(404).send({
                message: "comic not found with id " + req.params.comicId
            });            
        }
        res.send(comic);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "comic not found with id " + req.params.comicId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving comic with id " + req.params.comicId
        });
    });
};


// Update a comic identified by the comicId in the request
exports.update = (req, res) => {
    //Validate the request:
    if(!req.body.serieTitle){
        return res.status(400).send({
            message: "Comic serieTitle can't be empty"
        });
    }
    Comic.findByIdAndUpdate(req.params.comicId, {
        serieTitle: req.body.serieTitle,
        issueNumber: req.body.issueNumber,
        publisher: req.body.publisher,
    }, {new:true})
    //The {new: true} option in the findByIdAndUpdate() method is used to return 
    //the modified document to the then() function instead of the original.
    .then(comic => {
        if(!comic){
            return res.status(404).send({
                message: "Comic not found with id" + req.params.comicId
            });
        }
        res.send(comic);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Comic not found with id" + req.params.comicId
            });
        }
        return res.status(500).send({
            message: "Error updating comic with id" + req.params.comicId
        })
    })
};

// Delete a comic with the specified comicId in the request
exports.delete = (req, res) => {
    Comic.findByIdAndRemove(req.params.comicId)
    .then(comic => {
        if(!comic){
            return res.status(404).send({
                message: "Comic not found with id" + req.params.comicId
        });
    }
    res.send({message: "Comic deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Comic not found with id" + req.params.comicId
            });
        }
        return res.status(500).send({
            message: "Error deleting comic with id" + req.params.comicId
        })
    })
};
