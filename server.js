const express =require('express')
// importing express.js
const app=express()
// initialize express
const PORT=process.env.PORT || 3001;
// specify port
const path = require('path');
const fs=require('fs');
const note=require('./db/db.json');
// creates an id 
const {v4:uuidv4} = require('uuid')
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// middleware 

app.get('/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req,res) =>
fs.readFile('db/db.json', 'utf8', (err, data) =>{
  err ? console.log('This is the error', err): res.json(JSON.parse(data))

}))
// res.sendFile(path.join(__dirname, 'db/db.json')));
// sends response to notes.html


app.post('/api/notes', (req, res) => {
  const title=req.body.title
  const text=req.body.text
  const newNote={title, text, id:uuidv4()}

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
app.delete('/api/notes/:id', (req, res) => {
  
  const noteId = req.params.id;
  console.log(noteId)
  fs.readFile('db/db.json', 'utf8', (err, data) =>{
     console.log(data)
     const result = JSON.parse(data).filter((note) => note.id !== noteId);
    console.log(result)
    fs.writeFileSync('./db/db.json', JSON.stringify(result));
    res.json(`Item ${noteId} has been deleted 🗑️`);
  
  })
    
  // fs.readFile('db/db.json')
  //   console.log("my data", data)
  //   .then((json) => {
  //     // Make a new array of all tips except the one with the ID provided in the URL
  //     const result = json.filter((note) => note.id !== noteId);
  //     console.log("my result array", result)

  //     // Save that array to the filesystem
  //     fs.writeFile('./db/db.json', result);

  //     // Respond to the DELETE request
  //     res.json(`Item ${noteId} has been deleted 🗑️`);
  //   });
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);