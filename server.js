const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = 3001;

const app = express();


app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

//Get request for fetching all notes
app.get('/api/notes', (req, res) => {
  fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
    if (err) { console.log(err) }
    res.json(JSON.parse(data));
  })
});

//Post request to add new notes
app.post('/api/notes', (req, res) => {
  const newNote = { ...req.body, id: uuid() }
  fs.readFile(path.join(__dirname, './db/db.json'), (err, data) => {
    if (err) { console.log(err) }
    
    const notes = JSON.parse(data);
    notes.push(newNote);


  fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err) => {
    if (err) { console.log(err) }
    res.json(newNote);
  })
})
})


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
