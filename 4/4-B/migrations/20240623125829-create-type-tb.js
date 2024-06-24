'use strict';
const { QueryTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Membuat tabel type_tb
    await queryInterface.createTable('type_tb', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Menambahkan data awal ke dalam tabel
    const typesData = [
      { name: 'Strength', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HP', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Agility', createdAt: new Date(), updatedAt: new Date() }
    ];

    // Insert data menggunakan Sequelize
    await queryInterface.sequelize.query(
      'INSERT INTO "type_tb" (name, createdAt, updatedAt) VALUES (:name, :createdAt, :updatedAt)',
      {
        replacements: typesData,
        type: QueryTypes.INSERT
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('type_tb');
  }
};
