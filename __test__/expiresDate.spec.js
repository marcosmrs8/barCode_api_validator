import {expiresDate} from '../src/utils/expiresDate.js'

describe('expiresDate', () => {
    test('Should receive a digitable line and return a date in string',async ( ) => {
        const digitableLine = '34191092896112325293683035710009889310000015600'
        const data = await expiresDate(digitableLine)
        expect(data).toEqual("2022-03-20")
    })
    test('Should receive a empty digitable line and return error',async ( ) => {
        expect.assertions(1);
        const digitableLine = ''
        try {
            await expiresDate(digitableLine)
        } catch (error) {
            expect(error.message).toEqual('Error to treat data');
        }
    })
  });