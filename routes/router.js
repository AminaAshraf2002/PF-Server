const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

const router = new express.Router()

//register - http://localhost:3000/register
router.post('/register',userController.registerController)
//login - //register - http://localhost:3000/register
router.post('/login',userController.loginController)
//add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectImg'),projectController.addProjectController)
//home project
router.get('/get-home-projects',projectController.getHomeProjects)
//all project
router.get('/all-projects',jwtMiddleware,projectController.allProjectsController)
//user-projects
router.get('/user-projects',jwtMiddleware,projectController.getuserProjectsController)
module.exports = router
