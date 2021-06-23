const Users = require('../models/users')
const bcrypt = require('../lib/bcrypt')


function getAll () {
	return Users.find() 
}

function findById (id){
	return Users.findById(id)
}

async function signUp({name, email, password, role}){

	const userFound = await Users.findOne({email})

	if(userFound){
		throw new Error('Email already registered')
	}

const encriptedPassword = await bcrypt.hash(password)

	return Users.create({
		name,
		email, 
		password : encriptedPassword,
		role
	})
}

// async function login (email, password) {
// 	const userFound = await Users.findOne({email})
	
// 	if(!userFound){
// 		throw new Error('Invalid data')
// 	}

// 	const isValidData = await bcrypt.compare(password, userFound.password)

// 	if(!isValidData){
// 		throw new Error('Invalid data')
// 	}
// 	return jwt.sign({id : userFound._id}) 
// }


module.exports = {
	getAll,
	findById,
	signUp
}