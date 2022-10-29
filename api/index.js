const connectToMongo = require('./db')
const express = require('express')

const app = express()
const port = 3005
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello DIVANSH!')
})
// 3 main endpoints
app.use('/api/Suser',require('./routes/studentuser'))
app.use('/api/fav',require('./routes/favteacher'))
app.use('/api/Tuser',require('./routes/teacherUser'))

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port ${port}`)
})

connectToMongo()