import express from 'express'
//import createUser from '../controllers/user'
import User from '../models/user'
const router =  new express.Router()

router.post('/users', async (req,res) => {
    const keys = Object.keys(req.body)
    const isValid = keys.includes("password")
    
    try {
        if (!isValid) {
        //res.status(400).send({error: "password error"})
        throw new Error('password error obj')
        }
        const user = new User(req.body)
        await user.save()
        res.send(user)
    } catch (e) {
        // switch (err.name) {
        //     case 'ValidationError':
        //       for (field in err.errors) {
        //         switch (err.errors[field].type) {
        //           case 'exists':
        //             res.send("Already exists")
        //             break;
        //           case 'invalid':
        //             res.send('unknown error')
        //             break;
        //           case 'MongoError':
        //               res.send({"mongoError": err.mongoError })
                  
        //         }
        //       }
              
        //     default:
        //         res.status(400).send(e)
        //   }
        console.log('catch Error',e.message)
        res.status(400).send(e.message)
    }
})

export default router