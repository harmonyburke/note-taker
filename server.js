const express =require('express')
// importing express.js
const app=express()
// initialize express
const PORT=3001;
// specify port
app.use(express.static('public'));
// middleware pointing to public folder
const path = require('path');

app.get('/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('/api/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'db/db.json')));
// sends response to notes.html
app.post('/api/notes', (req,res) =>{
const {body}=req
}
)
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);