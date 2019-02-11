exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('User', function (table) {
      table.increments('id').primary()
      table.string('firstname').notNull()
      table.string('lastname')
      table.integer('phone')
      table.string('email').notNull().unique()
      table.string('password')
      table.boolean('parentUser').notNull()
      table.string('referralcode').notNull()
      table.foreign('referralcode').references('parentUser.referralcode')
    }),

    knex.schema.createTable('parentUser', function (table) {
      table.integer('id')
      table.string('firstname')
      table.string('lastname')
      table.integer('phone')
      table.string('email').notNull().unique()
      table.string('password')
      table.string('referralcode').notNull().unique().primary()
    })
  ])
}


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('User', () =>{}),
    knex.schema.dropTable('parentUser',() =>{})
    ])
}
