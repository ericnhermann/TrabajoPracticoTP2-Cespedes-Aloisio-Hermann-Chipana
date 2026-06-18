import { Router } from "express";

const reservasRouter = Router()

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
