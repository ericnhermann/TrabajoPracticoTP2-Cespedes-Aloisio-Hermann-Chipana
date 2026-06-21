import { Role } from "../Models/index.js";

const ROLES = [
  { id: 1, name: "admin" },
  { id: 2, name: "cliente" },
];

export async function seedRoles() {
  for (const role of ROLES) {
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }
}
