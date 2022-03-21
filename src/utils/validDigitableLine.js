export async function validateDigitableLine(digitableLine){
    let validatedDigitableLine =  digitableLine.replace(/[^a-zA-Z0-9]/g, '')
    var reg = new RegExp('^[0-9]*$');
    if (reg.test(validatedDigitableLine)==false) {
        throw new Error('Only Numeric is allowed.')
    }
    if(validatedDigitableLine.length <= 46 || validatedDigitableLine.length > 48){
        throw new Error('Malformed ticket.')
    }
    return validatedDigitableLine
}