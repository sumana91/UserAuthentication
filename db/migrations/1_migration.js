exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('User', function (table) {
      table.increments('id').primary()
      table.string('firstname').notNull()
      table.string('lastname')
      table.integer('phone')
      table.string('email').notNull().unique()
      table.string('password')
      table.dateTime('created_at')
      table.dateTime('updated_at')
    }),

    knex.schema.createTable('parentUser', function (table) {
      table.increments('id').primary()
      table.string('referral_code').unique()
      table.integer('user_id')
      table.foreign('user_id').references('User.id')
    }),

    knex.schema.createTable('childUser', function (table) {
      table.increments('id').primary()
      table.string('referral_code')
      table.foreign('referral_code').references('parentUser.referral_code')
      table.integer('userId')
      table.foreign('userId').references('User.id')
    })
  ])
}


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('User', () =>{}),
    knex.schema.dropTable('parentUser',() =>{}),
    knex.schema.dropTable('childUser',() =>{})
    ])
}
