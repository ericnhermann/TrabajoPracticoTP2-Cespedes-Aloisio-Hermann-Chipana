import { DataTypes, Model } from "sequelize";
import sequelize from "../connection/sequelize.js";
import bcrypt from "bcrypt";

class User extends Model {
  static validatePassword = async (passwordPlain, passwordHash) => {
    return bcrypt.compare(passwordPlain, passwordHash);
  };
}

User.init(
  {
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        is: /^[a-zA-Z\s]+$/i,
      },
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        len: [3, 50],
        is: /^[a-zA-Z\s]+$/i,
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  }
});

export default User;
