class ReservaService {
    constructor(reserva) {
        this.reserva = reserva;
    }


    crearReserva = async (fecha, hora, estado, precio, userId) => {
        const nuevaReserva = await this.reserva.create({
            fecha,
            hora,
            estado,
            precio,
            userId,
        });
        return nuevaReserva;
    };

    reservaMasCara = async () => {
        const reserva = await this.reserva.findOne({
            order: [["precio", "DESC"]],
            raw: true,
        });

        if (!reserva) {
            throw new Error("No hay reservas registradas");
        }

        return reserva;
    };
}

export default ReservaService;



