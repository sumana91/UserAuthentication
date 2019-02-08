exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('User', function (table) {
      table.increments('id').primary()
      table.string('firstname').notNull()
      table.string('lastname')
      table.integer('phone')
      table.string('email').notNull().unique()
      table.string('password')
    })
  ])
}


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('User', () =>{})
    ])
}
