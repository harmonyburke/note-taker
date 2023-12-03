const express =require('express')
// importing express.js
const app=express()
// initialize express
const PORT=3001;
// specify port
const path = require('path');
const fs=require('fs');
const note=require('./db/db.json');
// creates an id 
const uuid =require('./public/assets/js/id')
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// middleware 

app.get('/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'db/db.json')));
// sends response to notes.html

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  fs.readFile(path.join(__dirname, './db/db.json'), 'utf8', (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);
      notes.push(newNote);

      fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes, null, 2), (err) => {
          if (err) throw err;
          res.status(200).send('Note added successfully');
      });
  });
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);