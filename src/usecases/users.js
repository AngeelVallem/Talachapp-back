const Users = require('../models/users')


function getAll () {
	return Users.find() 
}


function updateById (id, dataToUpdate){
    return Users.findByIdAndUpdate(id, dataToUpdate)
}

module.exports = {
	getAll,
	updateById
}