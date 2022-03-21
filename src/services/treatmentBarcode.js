import { expiresDate } from "../utils/expiresDate.js"

export const treatmentToOrdinaryBarCode = async (digitableLine)=>{
    const {block1, block2, block3} = getFields(digitableLine)
    let dv1 = digitableLine[9]
    let dv2 = digitableLine[20]
    let dv3 = digitableLine[31]
    try {
        validateVerifyingDigitModule10(block1, dv1)
        validateVerifyingDigitModule10(block2, dv2)
        validateVerifyingDigitModule10(block3, dv3)
        let barCode = mountBarCode(digitableLine)
        validateVerifyingDigitModule11(barCode, barCode[4])
        const expirationDate = await expiresDate(digitableLine)
        var value = parseFloat(digitableLine.substring(digitableLine.length - 10, digitableLine.length)).toString()
        const amount = getValue(value)
        return {barCode, amount, expirationDate }
    } catch (error) {
        throw new Error(error.message)
    }

}

export const treatmentToConvenantBarCode = async (digitableLine)=>{
    const {block1, block2, block3, block4} = getFields(digitableLine)
    let dv1 = digitableLine[11]
    let dv2 = digitableLine[23]
    let dv3 = digitableLine[35]
    let dv4 = digitableLine[47]
    try {
        let newBarCode = ''
        let value = ''
        validateVerifyingDigitModule10(block1, dv1)
        validateVerifyingDigitModule10(block2, dv2)
        validateVerifyingDigitModule10(block3, dv3)
        validateVerifyingDigitModule10(block4, dv4)
        const expirationDate =  await expiresDate(digitableLine)
        let barCode = mountBarCode(digitableLine)
        newBarCode = newBarCode.concat(barCode.slice(0, 3), barCode.slice(4, 44))
        validateVerifyingDigitModule10(newBarCode, barCode[3])
        value = parseFloat(value.concat(digitableLine.slice(4,11), digitableLine.slice(12, 16))).toString()
        const amount = getValue(value)
        return {barCode, amount, expirationDate }
    }catch(error){
        throw new Error(error.message)
    }
}

export const getFields = (digitableLine)=>{
    if(digitableLine.length === 47){
        let block1 = digitableLine.slice(0, 9)
        let block2 = digitableLine.slice(10,20)
        let block3 = digitableLine.slice(21, 31)
        return {block1, block2, block3}
    }
    let block1 = digitableLine.slice(0, 11)
    let block2 = digitableLine.slice(12, 23)
    let block3 = digitableLine.slice(24, 35)
    let block4 = digitableLine.slice(36, 47)
    return {block1, block2, block3, block4}
}

export const validateVerifyingDigitModule10 = (block, dv)=>{
    let final = []
    let blockReversed = block.split('').reverse().join('');
    for( let i = 0; i <= blockReversed.length-1; i++){
        if(i % 2 === 1){
            final.push(Number(blockReversed[i]))
        }else{
            let value = (Number(blockReversed[i]) * 2)
            let stringValue = value.toString()
            value = value > 9 ? (Number(stringValue[0]) + Number(stringValue[1])) : value
            final.push(value)
        }
    }
    let DVcode = final.reduce((a, b) => a + b, 0)
    let resto = DVcode % 10
    DVcode = resto === 0 ? resto : 10 - resto
    if(DVcode.toString() == dv){
        return true
    }
    throw new Error('The check digit does not match')
}

export const validateVerifyingDigitModule11 = (barCode, dv)=>{
    let newBarCode = ''
    newBarCode = newBarCode.concat(barCode.slice(0, 4), barCode.slice(5, 44)).split('').reverse().join('');
    let dvBarCode = dv
    let sum = 0
    let loopMultiplicator = 2
    for( let i = 0; i <= newBarCode.length-1; i++){
        sum += Number(newBarCode[i]) * loopMultiplicator
        loopMultiplicator++
        if(loopMultiplicator > 9){
            loopMultiplicator = 2
        }
    }
    let resto = sum % 11
    resto =  11 - resto
    const dvCode = resto === 0 || resto === 10 || resto === 11 ? 1 : resto
    if(dvCode.toString() === dvBarCode){
        return true
    }
    throw new Error('The check digit does not match')
}

export const mountBarCode = (digitableLine)=>{
    let barCode = '';
    if(digitableLine.length === 47){
        barCode = digitableLine.slice(0, 4)
        return barCode = barCode.concat(digitableLine[32],digitableLine.slice(33, 47), digitableLine.slice(4, 9), digitableLine.slice(10,20), digitableLine.slice(21, 31) )
    }else if(digitableLine.length === 48){
        return barCode = barCode.concat(digitableLine.slice(0, 11), digitableLine.slice(12, 23), digitableLine.slice(24, 35), digitableLine.slice(36, 47))
    }else{
        throw new Error('The length of the digitable line is invalid')
    }
    
}

export const getValue = (value)=>{
    if(value){
        if (value.length == 2) {
            var finalValue = "0," + value;
        }else if (value.length == 1) {
            var finalValue = "0,0" + value;
        } else {
        var finalValue = value.substring(0, value.length -2) + "," + value.substring(value.length -2, value.length);
        }
        return finalValue
    }
    throw new Error('No value available')
}