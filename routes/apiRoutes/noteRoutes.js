const fs = require('fs');
const path = require('path');
const { notes } = require('../../Develop/db/db.json');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    if (req.query) {
        res.send(notes);
    }
});

function newNote(body, noteList) {
    const note = body;
    noteList.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../Develop/db/db.json'),
        JSON.stringify({ notes: noteList }, null, 2)
    );
    return note;
}

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString();

    const note = newNote(req.body, notes);
    console.log(note);
    res.json(note);

});

module.exports = router;