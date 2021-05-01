const express = require('express');
const multer = require('multer')
const csv = require('fast-csv')

const app = express()
const upload = multer({dest : 'tmp/csv'})
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/csv',upload.single('file') , function (req, res) {
    const fileRows = [];
    
    // open uploaded file
    csv.parseFile(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("end", function () {
        console.log(fileRows)
        //fs.unlinkSync(req.file.path);   // remove temp file
        //process "fileRows" and respond
        res.json({message:'done uploading csv' , file : fileRows})
      })
    console.log(req.file)
    
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})