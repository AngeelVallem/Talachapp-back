const express = require('express')
const users = require('../usecases/users')
const router = express.Router()


router.post('/', async (request, response) =>{
    try{
        const newUser = await users.signUp(request.body)

        response.json({
            success: true,
            message: 'User registered',
            data: {
                user: newUser
            }
        })
    } catch (error){
        response.status(400)
        response.json({
            success: false,
            message: 'Could not register',
            error: error.message
        })
        
    }
})
router.get('/', async (request, response) =>{
    try{
        const allUsers = await users.getAll()
        response.json({
            success: true,
            message: 'All Users',
            data: {
                users: allUsers
            }
        })
    } catch (error){
        response.status(400)
        response.json({
            success: false,
            message: 'Error not get Users',
            error: error.message
        })
    }
})

router.post('/login', async (request, response) =>{
    try{
        const { email, password } = request.body
        const token = await users.login(email, password)
        
        response.json({
            success: true,
            message: 'Logged in',
            data: {
                token
            }
        })
    } catch (error){
        response.status(400)
        response.json({
            success: false,
            message: 'Could not log in',
            error: error.message
        })
        
    }
})


router.patch('/:id', async (request, response) => {	
	try{
		const { id } = request.params
        const userUpdated = await users.updateById(id, request.body)
		response.json({
			success : true,
			message : "User updated ",
            data: {
                user: userUpdated
            }
		})
	}
	catch(error){
		response.status(400)
		response.json({
			succes : false,
			message : error.message
		})
	}
})



module.exports = router

