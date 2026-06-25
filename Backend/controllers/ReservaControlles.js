class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
    }

    crearReserva = async (req, res) => {
        try {
            const { fecha, hora, estado, precio, userId } = req.body;
            const nuevaReserva = await this.reservaService.crearReserva(
                fecha,
                hora,
                estado,
                precio,
                userId
            );
            res.status(201).json(nuevaReserva);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    reservaMasCara = async (req, res) => {
        try {
            const resultado = await this.reservaService.reservaMasCara();
            res.status(200).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}




export default ReservaController;