
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
    tbl.increments();
    tbl.string('name').notNullable().unique;
    tbl.string('cohort_id');
});
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};
