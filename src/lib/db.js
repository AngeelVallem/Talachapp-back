const mongoose = require('mongoose')


const DB_USER = 'Admin', 
DB_PASSWORD = 'admin123',
DB_HOST ='talachapp.fz5gx.mongodb.net',
DB_NAME = 'talachapp'




const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

function connect(){
	return  mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology : true})
    }
    
    
    
    module.exports = connect
    