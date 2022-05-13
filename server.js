const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//using a post request method to send our information to our db.json file
app.post('/api/notes',(req,res)=>{
    fs.readFile('./db/db.json',(err, data)=>{
        if (err) throw err;
        var notes =JSON.parse(data);
        let userNote= req.body;
        userNote.id = Math.floor(Math.random() * 10000);
        notes.push(userNote);
        console.log(notes)
        console.log(userNote)
    fs.writeFile('./db/db.json',JSON.stringify(notes),(err, data)=> {
        res.json(userNote);
    });
    });
});
//returns our data written in our notes using json,parse to turn data title and text to a string
app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json','utf8',(err, data) => {
        if (err) throw err;
        var notes = JSON.parse(data);
        res.json(notes);

    });
});

//creates our notes page which has its own html page and i am giving it the /notes to our url
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//makes our notes/id page to see what our stored notes had said instead of just its title but also its text
app.get('api/notes/:id', (req, res) =>{
    res.json(notes[req.params.id]);
    console.log(notes)
});

//creates our route sending the file name located in our develop folder to the index,html page which is our landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
//launches port 3001
app.listen(PORT, () =>
  console.log(`App listening at PORT: ${PORT} 🚀`)
);