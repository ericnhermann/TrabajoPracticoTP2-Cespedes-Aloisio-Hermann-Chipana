import User from "./User.js";
import Reserva from "./Reserva.js";

User.hasMany(Reserva,{
    foreignKey: "userId",
});

Reserva.belongsTo(User,{
    foreignKey: "userId",
});

export {User, Reserva}



