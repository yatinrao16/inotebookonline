const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const path=require('path')




connectToMongo();
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.use(express.static(path.join(__dirname,'../build')))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'../build/index.html'))
})


app.listen(port, () => {
  console.log(`iNotebook backend listening at http://localhost:${port}`)
})
