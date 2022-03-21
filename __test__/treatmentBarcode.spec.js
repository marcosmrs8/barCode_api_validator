'use strict';
import {treatmentToOrdinaryBarCode, treatmentToConvenantBarCode, getFields, validateVerifyingDigitModule10, validateVerifyingDigitModule11, mountBarCode, getValue } from '../src/services/treatmentBarcode.js'

describe('treatmentToOrdinaryBarCode', () => {
    test('Should check if is a valid digitable line and return a barCode amount and expirationDate commom type',async ( ) => {
        const digitableLine = '34191092896112325293683035710009889310000015600'
        const data = await treatmentToOrdinaryBarCode(digitableLine)
        expect(data).toEqual({
               "barCode": "34198893100000156001092861123252938303571000",
               "amount": "156,00",
               "expirationDate": "2022-03-20",
             })
    })
    test('Should receive a invalid digit verificator and return error',async ( ) => {
        expect.assertions(1);
        const digitableLine = '34191092806112325293683035710009889310000015600'
        try {
            await treatmentToConvenantBarCode(digitableLine)
        } catch (error) {
            expect(error.message).toEqual('The check digit does not match');
        }
    })
  });

test('Should receive a digitable line and return parts of this digitable line', ()=>{
    const digitableLine = '836400000029451201110009001010202222616303342052'
    const data = getFields(digitableLine)
    expect(data).toEqual({"block1": "83640000002", "block2": "45120111000", "block3": "00101020222", "block4": "61630334205"})
})

describe('treatmentToConvenantBarCode', () => {
    test('Should check if is a valid digitable line and return a barCode amount and expirationDate to convenant type',async ( ) => {
        const digitableLine = '836400000029451201110009001010202222616303342052'
        const data = await treatmentToConvenantBarCode(digitableLine)
        expect(data).toEqual({
            "barCode": "83640000002451201110000010102022261630334205",
            "amount": "245,12",
            "expirationDate": ""
        })
    })
    test('Should receive a invalid digit verificator and return error',async ( ) => {
        expect.assertions(1);
        const digitableLine = '836400000027451201110009001010202222616303342052'
        try {
            await treatmentToConvenantBarCode(digitableLine)
        } catch (error) {
            expect(error.message).toEqual('The check digit does not match');
        }
    })
  });

describe('validateVerifyingDigitModule10', () => {
    test('Should receive a block and digit verificator and return true', ()=>{
        const block = '237904480'
        const dv = '9'
        const data = validateVerifyingDigitModule10(block, dv)
        expect(data).toBeTruthy()
    })
    test('Should receive barCode and digit verificator and return true', ()=>{
        const code = '8460000001435900240200240500024384221010811'
        const dv = '7'
        const data = validateVerifyingDigitModule10(code, dv)
        expect(data).toBeTruthy()
    })
    test('Should receive barCode and invalid digit verificator and return error', ()=>{
        const code = '8460000001435900240200240500024384221010811'
        const dv = '9'
        try {
            validateVerifyingDigitModule10(code, dv)
        } catch (error) {
            expect(error.message).toEqual('The check digit does not match');
        }
    })
  });

describe('validateVerifyingDigitModule11', () => {
    test('Should receive a block and digit verificator and return true', ()=>{
        const code = '23797404300001240200448056168623793601105800'
        const dv = '7'
        const data = validateVerifyingDigitModule11(code, dv)
        expect(data).toBeTruthy()
    })
    test('Should receive a block and invalid digit verificator and return error', ()=>{
        const code = '23797404300001240200448056168623793601105800'
        const dv = '9'
        try {
            validateVerifyingDigitModule11(code, dv)
        } catch (error) {
            expect(error.message).toEqual('The check digit does not match');
        }
    })
  });

  describe('mountBarCode', () => {
    test('Should receive a digitable line and return the respective barCode', ()=>{
        const code = '836400000029451201110009001010202222616303342052'
        const data = mountBarCode(code)
        expect(data).toEqual('83640000002451201110000010102022261630334205')
    })
    test('Should receive a invalid digitable line and return error', ()=>{
        const code = ''
        try {
            mountBarCode(code)
        } catch (error) {
            expect(error.message).toEqual('The length of the digitable line is invalid');
        }
    })
  });

  describe('getValue', () => {
    test('Should receive a string value and return a treated value', ()=>{
        const value = '12490'
        const data = getValue(value)
        expect(data).toEqual('124,90')
    })
    test('Should receive a invalid digitable line and return error', ()=>{
        const value = ''
        try {
            getValue(value)
        } catch (error) {
            expect(error.message).toEqual('No value available');
        }
    })
  });