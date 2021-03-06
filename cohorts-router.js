const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const router = require('express').Router();

router.post('/', async (req,res) => {
    if (!req.body.name) {
        res.status(400).json({error:'missing required field: name'});
    } else {
        try {
            const cohort = await db('cohorts').insert(req.body);
            res.status(200).json(cohort);
        }
        catch(err) {
            res.status(500).json({error:err});
        }
    }

});

router.get('/', async (req,res) => {
    try {
        const cohorts = await db('cohorts');
        res.status(200).json(cohorts);
    }
    catch(err) {
        res.status(500).json({error:err});
    }
});

router.get('/:id', async (req,res) => {
    const {id} = req.params;
    try {
        const cohort = await db('cohorts').where({id}).first();
        res.status(200).json(cohort);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.get('/:id/students', async (req,res) => {
    const {id} = req.params;
    try {
        const students = await 
        db('students').where({cohort_id: id});
        res.status(200).json(students);
    }
    catch(err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req,res) => {
    const {id} = req.params;
    if (!req.body.name) {
        res.status(400).json({error:'missing required field: name'});
    } else {
        try {
            const cohort = await
            db('cohorts').where({id}).update(req.body);
            if (cohort) {
                const result = await db('cohorts').where({id}).first();
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
        const cohort = await db('cohorts').where({id}).del();
        if (cohort) {
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