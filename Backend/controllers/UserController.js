class UserController{
    constructor(service){
        this.userService = service;
    }


    obtenerTodosLosUsuarios = async (req, res) => {
        try {
            const usuarios = await this.userService.obtenerTodosLosUsuarios();
            res.json(usuarios);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    obtenerUsuarioPorId = async (req, res) => {
        try {
            const { id } = req.params;
            const usuario = await this.userService.obtenerUsuarioPorId(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    crearUsuario = async (req, res) => {
        try {
            const { nombre, apellido, email, password } = req.body;
            const nuevoUsuario = await this.userService.crearUsuario(nombre, apellido, email, password);
            res.status(201).json(nuevoUsuario);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    actualizarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const { nombre, apellido, email, password } = req.body;
            const usuarioActualizado = await this.userService.actualizarUsuario(id, nombre, apellido, email, password);
            res.json(usuarioActualizado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    eliminarUsuario = async (req, res) => {
        try {
            const { id } = req.params;
            const usuarioEliminado = await this.userService.eliminarUsuario(id);
            res.json(usuarioEliminado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await this.userService.login({ email, password });
            res.status(200).send({ success: true, message: user });
        } catch (error) {
            res.status(400).send({ success: false, message: error.message });
        }
    };

}




//Login



export default UserController;