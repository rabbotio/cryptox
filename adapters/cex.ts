import Util from './lib/util'

class cex {

  static exchange = 'cex'
  static API_URL = `https://cex.io/api/`

  static async getPrice(from, to) {
    const { API_URL, parse } = cex
    const { getJSON } = require('@rabbotio/fetcher')
    const json = await getJSON(`${API_URL}last_price/${from}/${to}`)
    const pair = parse(json)

    return Util.getPairInfo(pair, from, to)
  }

  static parse(data): any {
    const { exchange } = cex
    const { lprice, curr1: from, curr2: to } = data
    const last = Number(lprice)
    const pair = `${from}_${to}`

    return {
      [pair]: {
        exchange,
        pair,
        last
      }
    }
  }

  // TODO : taker, maker
  static getTradeFee() {
    return 0.25
  }

  // Ref : https://cex.io/fee-schedule
  static getWithdrawFee(symbol) {
    const fee = {
      ETH: 0,
    }

    return fee[symbol]
  }
}

module.exports = cex