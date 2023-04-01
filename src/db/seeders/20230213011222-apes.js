'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Apes',
      [
        {
          name: 'King Authur',
          sex: 'M',
        },
        {
          name: 'Queen Margret',
          sex: 'F',
        },
        {
          name: 'Bill',
          sex: 'M',
        },
        {
          name: 'Flora',
          sex: 'F',
        },
        {
          name: 'Charlie',
          sex: 'M',
        },
        {
          name: 'Percy',
          sex: 'M',
        },
        {
          name: 'Audrey',
          sex: 'F',
        },
        {
          name: 'Ronald',
          sex: 'M',
        },
        {
          name: 'Helen',
          sex: 'F',
        },
        {
          name: 'Generiva',
          sex: 'F',
        },
        {
          name: 'Harry',
          sex: 'M',
        },
        {
          name: 'Victorie',
          sex: 'F',
        },
        {
          name: 'Ted',
          sex: 'M',
        },
        {
          name: 'Dominique',
          sex: 'F',
        },
        {
          name: 'Louis',
          sex: 'M',
        },
        {
          name: 'Molly',
          sex: 'F',
        },
        {
          name: 'Lucy',
          sex: 'F',
        },
        {
          name: 'Malfoy',
          sex: 'M',
        },
        {
          name: 'Rose',
          sex: 'F',
        },
        {
          name: 'Hugo',
          sex: 'M',
        },
        {
          name: 'Darcy',
          sex: 'F',
        },
        {
          name: 'James',
          sex: 'M',
        },
        {
          name: 'Alice',
          sex: 'F',
        },
        {
          name: 'Albus',
          sex: 'M',
        },
        {
          name: 'Lilly',
          sex: 'F',
        },
        {
          name: 'Remus',
          sex: 'M',
        },
        {
          name: 'Draco',
          sex: 'M',
        },
        {
          name: 'Aster',
          sex: 'F',
        },
        {
          name: 'William',
          sex: 'M',
        },
        {
          name: 'Ron',
          sex: 'M',
        },
        {
          name: 'Ginny',
          sex: 'F',
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apes', null, {})
  },
}
