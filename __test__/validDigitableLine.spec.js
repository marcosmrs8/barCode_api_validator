import {validateDigitableLine} from '../src/utils/validDigitableLine.js'

describe('validateDigitableLine', () => {
    test('Should receive a digitable line and return a valid digitable line', async ( ) => {
        const digitableLine = '34191.09289 6112325293683035710009889310000015600'
        const data = await validateDigitableLine(digitableLine)
        expect(data).toEqual("34191092896112325293683035710009889310000015600")
    })
    test('Should receive a invalid digitable line and return error', async ( ) => {
        expect.assertions(1);
        const digitableLine = '34191092896112325293683035aa710009889310000015600'
        try {
            await validateDigitableLine(digitableLine)
        } catch (error) {
            expect(error.message).toEqual('Only Numeric is allowed.');
        }
    })
    test('Should receive a invalid digitable line and return error', async ( ) => {
        expect.assertions(1);
        const digitableLine = '34191092896112325293683035710009889310000015600000'
        try {
            await validateDigitableLine(digitableLine)
        } catch (error) {
            expect(error.message).toEqual('Malformed ticket.');
        }
    })
  });