const { error } = require('console')
const pool = require('../../config/database')

const create = async (data, callback) => {
  const { first_name, last_name, role_id, email, username, phoneno, password } =data
  const query ='INSERT INTO users (first_name, last_name, role_id, email, username, phoneno, password) VALUES (?, ?, ?, ?, ?, ?, ?)'
  const values = [
    first_name,
    last_name,
    role_id,
    email,
    username,
    phoneno,
    password
  ];
  const checkEmailExistOrNot = getDuplicateEmail(data.email);
  const isDuplicateUserName = await getDuplicateUserName(data.username);
  const isDuplicateMobileNo = await getDuplicateMobileNo(data.phoneno);

  if(checkEmailExistOrNot) {
    return callback("email duplicate")
  }

  if(isDuplicateUserName) {
    return callback("USer name duplicate")
  }

  if(isDuplicateMobileNo) {
    return callback("Mobile No duplicate")
  }


  pool.query(query, values, (err, results, fields) => {
    if (err) {
      return callback(err)
    }
    return callback(null, results)
  })
}

const getUsers = (callback)=>{
  const query ="select * from users"
  pool.query(query,[],(err,results,fielname) => {
    if (err) {
      return callback(err)
    }
    return callback(null, results)
  });
}


const getUserById = (id,callback)=>{
  const query ="select * from users where id=?"
  pool.query(query,[id],(err,results,fielname) => {
    if (err) {
      return callback(err)
    }
    return callback(null, results[0])
  });
}


const updateUser = (data,callback)=>{
  const { first_name, last_name, role_id, email, username, phoneno, password,id } =data
  const values = [
    first_name,
    last_name,
    role_id,
    email,
    username,
    phoneno,
    password,
    id
  ]
  
  const query ="update users set first_name=?,last_name=?,role_id=?,email=?,username=?,phoneno=?,password=? where id=?"
  pool.query(query,values,(err,results,fielname) => {
    if (err) {
      return callback(err)
    }
    return callback(null, results[0])
  });
}


const deleteUser = (id,callback)=>{
  const query ="delete from users where id=?"
  pool.query(query,[id],(err,results,fielname) => {
    if (err) {
      return callback(err)
    }
    return callback(null, results)
  });
}

function getDuplicateEmail(email) {
  console.log(email)
  const query ="select email from users where email=?"
  pool.query(query,email,(err,results,fielname) => {
    if (results.length > 0) {
      return true
    } else {
      return false
    }
  });
}


function getDuplicateUserName(username) {
  return new Promise((resolve, reject) => {
    const query = "SELECT username FROM users WHERE username = ?";
    pool.query(query, [username], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length > 0);
    });
  });
}

function getDuplicateMobileNo(mobileno) {
  return new Promise((resolve, reject) => {
    const query = "SELECT phoneno FROM users WHERE phoneno = ?";
    pool.query(query, [mobileno], (error, results) => {
      if (error) {
        return reject(error);
      }
      resolve(results.length > 0);
    });
  });
}

const getUserByUserEmail = (email, callBack) => {
  const query ="select * from users where email=?"
  pool.query(query,[email],(err,results,fielname) => {
    if (err) {
      return callBack(err)
    }
    console.log(results)
    return callBack(null, results[0])
  });
}

module.exports = { create ,getUsers,getUserById,updateUser,deleteUser,getUserByUserEmail }
