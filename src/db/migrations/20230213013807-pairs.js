'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pairs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ape_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Apes', key: 'id' },
        allowNull: false,
        defaultValue: 1,
      },
      farther_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Apes', key: 'id' },
        allowNull: false,
        defaultValue: 1,
      },
      mother_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Apes', key: 'id' },
        allowNull: false,
        defaultValue: 2,
      },
      partner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Apes', key: 'id' },
        allowNull: true,
      },
      in_law: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pairs')
  },
}
