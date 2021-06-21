const Users = require('../models/users')


function getAll () {
	return Users.find() 
}




module.exports = {
	getAll
}