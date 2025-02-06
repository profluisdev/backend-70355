import { Router } from "express"
import { sendMail } from "../utils/sendEmail.js";
import { passportCall } from "../middlewares/passportCall.middleware.js";
const router = Router();

router.get("/", passportCall("jwt"),  async (req, res) => {
    await sendMail("profeluismeradev@gmail.com", "Mail de prueba", req.user.first_name)
    res.send("Correo enviado")
})

export default router;