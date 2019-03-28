const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(express.json());

const cohortsRouter = require('./cohorts-router.js');
const studentsRouter = require('./students-router.js');

server.use('/api/cohorts', cohortsRouter);
server.use('/api/students', studentsRouter);

server.listen(5000, () => {
    console.log('LISTEN 5000');
});