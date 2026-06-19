class ReservaController{
    constructor(reserva){
        this.reserva = reserva;
    }

    reservaMasCara = async(req, res) => {
        try {
            const resultado = await this.reserva.reservaMasCara();
            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}




export default ReservaController;