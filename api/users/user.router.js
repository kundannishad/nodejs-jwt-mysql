const   {
    createUser,
    getUserDetail,
    deleteUserById,
    updateUserById,
    getUserList,
    login
} = require('./user.controller');
const { checkToken } = require("../../auth/token_validate");

const router = require("express").Router();
router.post('/',checkToken,createUser)
router.get('/getUserDetail/:id',checkToken,getUserDetail)
router.patch('/updateUserById/:id',checkToken,updateUserById)
router.delete('/deleteUserById/:id',checkToken,deleteUserById)
router.get('/userList',checkToken,getUserList)
router.post('/login',login)




module.exports = router