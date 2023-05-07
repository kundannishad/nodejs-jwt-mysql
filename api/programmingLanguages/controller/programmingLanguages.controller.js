const {getProgrammingLanguages,
    createProgrammingLanguage,
    getProgrammingLanguageById,
    updateProgramingLanguageById,
    deleteProgrammingLangById} = require('../services/programmingLanguages.service');

const getProgrammingLanguagesList = (req,res) => {
    const page = req.query.page;
    getProgrammingLanguages(page,(error,results) =>{
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
    }); 
}

const createProgramingLanguage = (req,res)=>{
    const body = req.body;
    createProgrammingLanguage(body,(err,results)=>{
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

const programmingLanguageById = (req,res) =>{
    const id = req.params.id;
    console.log("id",id)
    getProgrammingLanguageById(id,(error,results)=>{
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

const updateProgramingLanguage = (req,res) =>{
    const body = req.body;
    body.id = req.params.id;
    updateProgramingLanguageById(body,(err,results)=>{
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

const deleteProgramingLanguage = (req,res) =>{
    const id = req.params.id;
    deleteProgrammingLangById(id,(error,results)=>{
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


module.exports = {
    getProgrammingLanguagesList,
    createProgramingLanguage,
    programmingLanguageById,
    updateProgramingLanguage,
    deleteProgramingLanguage
}