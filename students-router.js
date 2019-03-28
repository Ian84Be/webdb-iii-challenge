const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const router = require('express').Router();

router.post('/', async (req,res) => {
    if (!req.body.name || !req.body.cohort_id) {
        res.status(400).json({error:'missing name / cohort id'});
    } else {
        try {
            const student = await db('students').insert(req.body);
            res.status(200).json(student);
        }
        catch(err) {
            res.status(500).json({error:err});
        }
    }

});

router.get('/', async (req,res) => {
    try {
        const students = await db('students');
        res.status(200).json(students);
    }
    catch(err) {
        res.status(500).json({error:err});
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const student = await
        db.select('students.id','students.name','cohorts.name as cohort').from('students')
        .leftJoin('cohorts',{'students.cohort_id':'cohorts.id'})
        .where({'students.id':id}).first();
        if (student) {
            res.status(200).json(student);
        } else {
            res.status(404).json({error:'ID not found'});
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    if (!req.body.name || !req.body.cohort_id) {
        res.status(400).json({error:'missing name / cohort_id'});
    } else {
        try {
            const student = await
            db('students').where({id}).update(req.body);
            if (student) {
                const result = await db('students').where({id}).first();
                res.status(200).json(result);
            }
            else {
                res.status(404).json({ error: 'Record not found' });
            }
        }
        catch(err) {
            res.status(500).json(err);
        }
    }
});

router.delete('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const student = await db('students').where({id}).del();
        if (student) {
            res.status(200).json({success: 'Record deleted'});
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    }
    catch(err) {
        res.status(500).json(err);
    }
});


module.exports = router;