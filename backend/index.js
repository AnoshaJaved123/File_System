const connectTomongo = require('./dbconfig')
const express = require('express')
const cors = require('cors')



connectTomongo()

const port = 5000;

const app = express()
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/userAuth', require('./Routes/userAuth'))


app.use('/api/itemAuth', require('./Routes/itemAuth'));





app.listen(port, () => {
    console.log(`app is listining at port ${port}`)
})