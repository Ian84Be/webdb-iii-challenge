const router = require('express').Router();

router.get('/', async (req,res) => {
    try {
        res.status(420).json({message:'enahnce your calm'});
    }
    catch(err) {
        res.status(500).json({error:err});
    }
});

module.exports = router;