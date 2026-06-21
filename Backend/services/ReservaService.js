class ReservaService {
    constructor(reserva) {
        this.reserva = reserva;
    }


    //creamos el metodo para obtener la reserva mas cara 
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



