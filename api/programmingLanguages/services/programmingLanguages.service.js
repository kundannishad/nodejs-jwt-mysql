require("dotenv").config();
const pool = require('../../../config/database')
const helper = require('../../../helpers/helpers');

const getProgrammingLanguages = (page,callBack) =>{
    const offset = helper.getOffset(page,process.env.LIST_PER_PAGE);
    const listPerPage = process.env.LIST_PER_PAGE;
    const programmingLangQuery =`SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ${offset},${listPerPage}`
    pool.query(programmingLangQuery,(err,results,fielname) => {
        if (err) {
          return callBack(err)
        }
        return callBack(null, results)
      });
}

const createProgrammingLanguage = (data,callBack) => {
    const { name, released_year, githut_rank, pypl_rank, tiobe_rank} = data
    const programmingLangQuery ='INSERT INTO programming_languages (name, released_year, githut_rank, pypl_rank, tiobe_rank) VALUES (?, ?, ?, ?, ?)'
    const programmingLanguageArr = [
        name,
        released_year,
        githut_rank,
        pypl_rank,
        tiobe_rank
      ];

    pool.query(programmingLangQuery, programmingLanguageArr, (error, results, fields) => {
        if (error) {
           return callBack(error)
        }
        return callBack(null, results)
    })
}

const getProgrammingLanguageById = (id,callBack) =>{
    const query ="select * from programming_languages where id=?"
    pool.query(query,[id],(err,results,fielname) => {
        console.log("results",results);
      if (err) {
        return callBack(err)
      }
      return callBack(null, results[0])
    });
}

const updateProgramingLanguageById = (data,callBack) => {
    const { name, released_year, githut_rank, pypl_rank, tiobe_rank,id} = data;
    const updateValueArr = [name,released_year,githut_rank,pypl_rank,tiobe_rank,id]
    const programingLangQuery ="update programming_languages set name=?,released_year=?,githut_rank=?,pypl_rank=?,tiobe_rank=? where id=?"
    pool.query(programingLangQuery,updateValueArr,(err,results,fielname) => {
        if (err) {
          return callBack(err)
        }
        return callBack(null, results[0])
      });
}

const deleteProgrammingLangById = (id,callBack) =>{
    const query ="delete from programming_languages where id=?"
    pool.query(query,[id],(err,results,fielname) => {
      if (err) {
        return callBack(err)
      }
      return callBack(null, results)
    });
}


module.exports = {
    createProgrammingLanguage,
    getProgrammingLanguages,
    getProgrammingLanguageById,
    updateProgramingLanguageById,
    deleteProgrammingLangById
}