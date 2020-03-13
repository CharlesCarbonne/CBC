module.exports = (app) => {
    const comics = require('../controllers/comic.controller.js');

    // Create a new Note
    app.post('/comics', comics.create);

    // Retrieve all Notes
    app.get('/comics', comics.findAll);

    // Retrieve a single Note with noteId
    app.get('/comics/:comicId', comics.findOne);

    // Update a Note with noteId
    app.put('/comics/:comicId', comics.update);

    // Delete a Note with noteId
    app.delete('/comics/delete/:comicId', comics.delete);

    app.get('/createData', comics.generateTestData);
}