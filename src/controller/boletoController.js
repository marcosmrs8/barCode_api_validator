import { validateDigitableLine } from "../utils/validDigitableLine.js"
import { treatmentToConvenantBarCode, treatmentToOrdinaryBarCode } from "../services/treatmentBarcode.js"

export async function validTicket(req, res){
    const digitableLine = req.params.boleto
    try {
        const validDigitableLine = await validateDigitableLine(digitableLine)
        let response = validDigitableLine.length === 47 ? await treatmentToOrdinaryBarCode(validDigitableLine) : await treatmentToConvenantBarCode(validDigitableLine)
        res.send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
}