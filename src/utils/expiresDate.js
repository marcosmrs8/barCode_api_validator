

export async function expiresDate(digitableLine){
    if(digitableLine){
        if(digitableLine.length === 48){
            let expireDate = ''
            expireDate = expireDate.concat(digitableLine.slice(20, 23), digitableLine.slice(24, 29))           
            return `${expireDate.substring(0, 4)}-${expireDate.substring(4, 6)}-${expireDate.substring(6, 8)}`
        }
        let expireDate = digitableLine.slice(33, 37)
        const baseData = new Date("10/07/1997")
        baseData.setTime(baseData.getTime() + (expireDate * 24 * 60 * 60 * 1000));
        const month = (baseData.getMonth()+1 > 10 ? (baseData.getMonth() + 1):("0" +  (baseData.getMonth() + 1)))
        const year = (baseData.getFullYear())
        const day = (baseData.getDate())
        const expireDateFormated = `${year}-${month}-${('0' + day).slice(-2)}`
        return expireDateFormated
    }
   throw new Error('Error to treat data')
}