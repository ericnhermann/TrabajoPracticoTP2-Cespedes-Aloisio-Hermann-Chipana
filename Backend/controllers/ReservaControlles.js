class ReservaController {
    constructor(reservaService) {
        this.reservaService = reservaService;
    }

    reservaMasCara = async (req, res) => {
        try {
            const resultado = await this.reservaService.reservaMasCara();
            res.status(200).json(resultado)
        } catch (error) {
            res.status(400).json({ error: error.message})
        }
    }
}




export default ReservaController;