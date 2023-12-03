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
app.post('/api/notes', (req,res) =>{
  const newNote=req.body
  // request pulls in the body
  // responds with the note in db.json
     res.json(note)
if(newNote){
  // if the body is pulled in the request, new note varaible object will save
  const newNoteEl={
    title, 
    text,
    id:uuid(),
  };
  fs.readFile('./db/db.json', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      // Convert string into JSON object
      const parseNote = JSON.parse(data);

      // Add a new note
      parseNote.push(newNoteEl);
// converts data to a string to be saved
  const noteString=JSON.stringify(newNoteEl);
// adds data to db.json
  fs.appendFile('./db/db.json', noteString, (err) =>
  err
  ?console.error(err)
  :console.log(`New note added!`)
   )
};
});
}
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);