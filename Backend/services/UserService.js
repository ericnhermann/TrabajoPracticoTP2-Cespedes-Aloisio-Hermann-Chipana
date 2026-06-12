class UserService {
    constructor(user) {
        this.user = user;
    }

    obtenerTodosLosUsuarios = async () => {
        const usuarios = await this.user.findAll({
            //esto es para mostrar solo algunos campos de la tabla, en este caso el id, nombre y email
            attributes: ['id', 'nombre', 'email'],
        });
        return usuarios;
    };

    obtenerUsuarioPorId = async (id) => {
        const usuario = await this.user.findByPk(id, {
            attributes: ['id', 'nombre', 'email'],
        });
        return usuario;
    };

    crearUsuario = async (nombre, apellido, email, password) => {
        const nuevoUsuario = await this.user.create({ nombre, apellido, email, password });
        return nuevoUsuario;
    }

    actualizarUsuario = async (id, nombre, apellido, email, password) => {
        const usuario = await this.user.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        //actualizamos los campos del usuario
        await usuario.update({ name, apellido, email, password });
        return usuario;
    }

    eliminarUsuario = async (id) => {
        const usuario = await this.user.findByPk(id);
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        await usuario.destroy();
        //podemos retornar el usuario eliminado para confirmar que se elimino correctamente
        return usuario;
    }

    login = async ({ email, password }) => {
        const user = await this.user.findOne({
            where: { email },
            attributes: ["id", "name", "email", "password", "roleId"],
        });
        if (!user) throw new Error("user not found");
        const validatePassword = await this.user.validatePassword(password, user.password);
        console.log(`🚀 ~ UserService ~ validatePassword:`, validatePassword)
        if (!validatePassword) throw new Error("invalid password");
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roleId: user.roleId,
        };
    };






}




export default UserService;
