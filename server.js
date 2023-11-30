const express =require('express')
// importing express.js
const app=express()
// initialize express
const PORT=3001;
// specify port
app.use(express.static('public'));
// middleware pointing to public folder
app.get('/notes', (req,res) =>
res.sendFile(path.join(__dirname, 'public/notes.html')))
// sends response to notes.html
app.post('/notes', (req,res) =>{
    
}
)