const jwt = require('jsonwebtoken')


const SECRET_WORD = 'supersecretword'

function sign (payload) {
	return jwt.sign(payload, SECRET_WORD , { expiresIn : '30 days' })
}


function verify (token) { 
	return jwt.verify(token, SECRET_WORD)
}



module.exports = {
	...jwt,
	 sign,
	 verify
}