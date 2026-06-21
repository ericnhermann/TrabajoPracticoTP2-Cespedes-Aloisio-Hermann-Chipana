import { generateToken, verifyToken } from "../utils/jwt.js";

class UserService {
    constructor(user, role) {
        this.user = user;
        this.role = role;
        this.roleInclude = {
            model: role,
            attributes: ["id", "name"],
        };
    }

    #sinPassword(usuario) {
        const data = usuario.toJSON ? usuario.toJSON() : usuario;
        const { password, ...resto } = data;
        return resto;
    }

    obtenerTodosLosUsuarios = async () => {
        const usuarios = await this.user.findAll({
            attributes: ["id", "nombre", "apellido", "email", "roleId"],
            include: [this.roleInclude],
        });
        return usuarios;
    };

    obtenerUsuarioPorId = async (id) => {
        const usuario = await this.user.findByPk(id, {
            attributes: ["id", "nombre", "apellido", "email", "roleId"],
            include: [this.roleInclude],
        });
        return usuario;
    };

    crearUsuario = async (nombre, apellido, email, password, roleId = 2) => {
        const nuevoUsuario = await this.user.create({
            nombre,
            apellido,
            email,
            password,
            roleId,
        });
        return this.#sinPassword(nuevoUsuario);
    };

    actualizarUsuario = async (id, nombre, apellido, email, password, roleId) => {
        const usuario = await this.user.findByPk(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }

        const datos = { nombre, apellido, email };
        if (password) datos.password = password;
        if (roleId !== undefined) datos.roleId = roleId;

        await usuario.update(datos);
        return this.obtenerUsuarioPorId(id);
    };

    eliminarUsuario = async (id) => {
        const usuario = await this.user.findByPk(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        await usuario.destroy();
        return this.#sinPassword(usuario);
    };

    login = async ({ email, password }) => {
        const user = await this.user.findOne({
            where: { email },
            attributes: ["id", "nombre", "apellido", "email", "password", "roleId"],
            include: [this.roleInclude],
        });
        if (!user) {
            throw new Error("Usuario no encontrado");
        }

        const passwordValida = await this.user.validatePassword(password, user.password);
        if (!passwordValida) {
            throw new Error("Contraseña incorrecta");
        }

        const payload = {
            id: user.id,
            nombre: user.nombre,
            roleId: user.roleId,
        };

        const token = generateToken(payload);
        return { token, id: user.id };
    };

    me = async (token) => {
        const payload = verifyToken(token);
        const usuario = await this.obtenerUsuarioPorId(payload.id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return usuario;
    };
}

export default UserService;
