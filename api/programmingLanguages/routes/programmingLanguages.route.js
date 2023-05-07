const {
    getProgrammingLanguagesList,
    createProgramingLanguage,
    programmingLanguageById,
    updateProgramingLanguage,
    deleteProgramingLanguage
} = require('../controller/programmingLanguages.controller')
const router = require("express").Router();

router.get('/getProgrammingLanguagesList',getProgrammingLanguagesList)
router.post('/createProgramingLanguage',createProgramingLanguage)
router.get('/programmingLanguageById/:id',programmingLanguageById)
router.put('/updateProgramingLanguage/:id',updateProgramingLanguage)
router.delete('/deleteProgramingLanguage/:id',deleteProgramingLanguage)


module.exports = router