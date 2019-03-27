
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {cohort_id: 1, name: 'Steve McQueen'},
        {cohort_id: 1, name: 'Ronnie James Dio'},
        {cohort_id: 2, name: 'Edgar Winter'},
        {cohort_id: 2, name: 'Marshall Stacks'},
      ]);
    });
};
