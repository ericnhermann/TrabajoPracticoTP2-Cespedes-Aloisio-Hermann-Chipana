class ReservaService {
    constructor(reserva) {
        this.reserva = reserva;
    }


    //creamos el metodo para obtener la reserva mas cara 
    reservaMasCara = async () => {
        return await this.reserva.findOne({
            order: [["precio", "DESC"]],
            raw: true
        });

        console.log(reservaMayor);
    }
}

export default ReservaService;



