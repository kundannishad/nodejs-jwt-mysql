const {genSaltSync,hashSync,compareSync} = require('bcrypt')
const { sign } = require("jsonwebtoken");
const {create ,getUsers,getUserById,updateUser,deleteUser,getUserByUserEmail} = require('./user.service')
const { error } = require("console")
const SALT_ROUNDS = 10;

const createUser = (req,res)=>{
    const body = req.body;
    const salt = genSaltSync(SALT_ROUNDS)
    body.password = hashSync(body.password,salt)
    create(body,(err,results)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                success:0,
                message:err
            });
        }
        return  res.status(200).json({
            success:1,
            data:results
        });
    })
} 

const getUserList = (req,res) => {
    getUsers((error,results)=>{
        if(error){
            console.log(error)
            return res.status(500).json({
                success:0,
                message:error
            });
        }
        return  res.status(200).json({
            success:1,
            data:results
        });
    }) 
}


const getUserDetail = (req,res) => {
    const id = req.params.id;
    console.log("id",id)
    getUserById(id,(error,results)=>{
        if(error){
            console.log(error)
            return res.status(500).json({
                success:0,
                message:error
            });
        }
        return  res.status(200).json({
            success:1,
            data:results
        });
    }) 
}


const deleteUserById = (req,res) =>{
    const id = req.params.id;
    deleteUser(id,(error,results)=>{
        if(error){
            console.log(error)
            return res.status(500).json({
                success:0,
                message:error
            });
        }
        return  res.status(200).json({
            success:1,
            data:results
        });
    }) 
}

const updateUserById = (req,res)=>{
    const body = req.body;
    body.id = req.params.id;
    updateUser(body,(err,results)=>{
        if(err){
            console.log(err)
            return res.status(500).json({
                success:0,
                message:"database connection error"
            });
        }
        return  res.status(200).json({
            success:1,
            data:results
        });
    })
}

const login = (req, res) => {
    const body = req.body;
    getUserByUserEmail(body.email, (err, results) => {
      if (err) {
        console.log(err);
      }
      if (!results) {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsontoken = sign({ result: results }, "qwe1234", {
          expiresIn: "1h"
        });
        return res.json({
          success: 1,
          message: "login successfully",
          token: jsontoken
        });
      } else {
        return res.json({
          success: 0,
          data: "Invalid email or password"
        });
      }
    });
  }

  
  module.exports = { 
    createUser,
    getUserDetail,
    deleteUserById,
    updateUserById,
    getUserList,
    login
};
  