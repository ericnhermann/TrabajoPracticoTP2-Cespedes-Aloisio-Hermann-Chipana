import { Router } from "express";
import reservaController from "../containers/reservaContainer.js"

//instanciamos
const reservasRouter = Router()

//Ruta para un controller de reserva mas cara
reservasRouter.get("/max" , reservaController.reservaMasCara)


reservasRouter.get("/", (req, res) => {
    res.status(200).send("get all reservas /")
})

reservasRouter.get("/:id", (req, res) => {
    res.status(200).send("get reserva by id /")
})

reservasRouter.post("/", (req, res) => {
    res.status(200).send("create reserva /")
})

reservasRouter.put("/:id", (req, res) => {
    res.status(200).send("update reserva /")
})

reservasRouter.delete("/:id", (req, res) => {
    res.status(200).send("delete reserva by id/")
})

export default reservasRouter;
