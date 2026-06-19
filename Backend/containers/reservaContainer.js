import ReservaController from "../controllers/ReservaControlles.js"

import {Reserva} from "../Models/index.js"
import ReservaService from "../services/ReservaService.js"

const reservaService = new ReservaService(Reserva)
const reservaController = new ReservaController(reservaService)


export default reservaController