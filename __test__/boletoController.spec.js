import {app} from '../src/index'
import supertest from 'supertest'
const requestSuperTest = supertest(app)

describe('Testing the /boleto/:boleto', () => {
    test('teste',async () => {
        const digitableLine = '34191092896112325293683035710009889310000015600'
        const res = await requestSuperTest.get(`/boleto/${digitableLine}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({
            "barCode": "34198893100000156001092861123252938303571000",
            "amount": "156,00",
            "expirationDate": "2022-03-20"
        })
    })
  
  });