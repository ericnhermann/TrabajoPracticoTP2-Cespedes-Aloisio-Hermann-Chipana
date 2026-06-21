import User from "./User.js";
import Role from "./Role.js";
import Reserva from "./Reserva.js";

Role.hasMany(User, {
  foreignKey: "roleId",
});

User.belongsTo(Role, {
  foreignKey: "roleId",
});

User.hasMany(Reserva, {
  foreignKey: "userId",
});

Reserva.belongsTo(User, {
  foreignKey: "userId",
});

export { User, Role, Reserva };
