const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Przyjmujemy, że plik z konfiguracją jest w ../db.js
const User = require('./User'); // Importujemy model User

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,  // user_id może być null
    references: {
      model: User,  // Relacja z tabelą 'users'
      key: 'id',    // Kolumna, do której odnosi się klucz obcy
    },
    onDelete: 'CASCADE', // Usuwanie koszyka, gdy użytkownik zostanie usunięty
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // product_id może być null
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,  // Domyślna ilość to 1
  },
  added_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Domyślna wartość to aktualny czas
  },
}, {
  tableName: 'carts',
  timestamps: false,  // Brak domyślnych pól 'createdAt' i 'updatedAt'
});

// Definicja relacji
Cart.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Cart, { foreignKey: 'user_id' });

module.exports = Cart;
