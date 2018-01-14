import Util from './lib/util'

class Adapter {
  static caches = null
  static getExchanges() {
    return {
      names: [
        'bx',
        'binance'
      ]
    }
  }

  static getDepositFees() {
    return {
      bx: null,
      binance: null
    }
  }

  static getTradeFees() {
    return {
      bx: 0.25,
      binance: 0.1
    }
  }

  static getWithdrawFees() {
    return {
      bx: {
        ETH: 0.005,
        OMG: 0.2
      },
      binance: {
        ETH: 0.01,
        OMG: 0.3
      }
    }
  }

  // TODO : Injection, promise all
  static async getPrices() {
    // Get all pairs at once
    const bx_pairs = await Adapter.getPairs('bx')
    const binance_price = await Adapter.getPrice('binance', 'OMG', 'ETH')

    return {
      bx: {
        ETH_THB: Util.getPairInfo(bx_pairs, 'ETH', 'THB').last,
        OMG_THB: Util.getPairInfo(bx_pairs, 'OMG', 'THB').last
      },
      binance: {
        OMG_ETH: binance_price.last
      }
    }
  }

  // Support only bx ATM
  static async fetchAndCache(...exchanges) {
    // Get all pairs at once
    Adapter.caches = Adapter.caches || {}
    await Promise.all(exchanges.map(async exchange => {
      Object.assign(Adapter.caches, {
        [exchange]: await Adapter.getPairs(exchange)
      })
    }))
  }

  static getTradeFee(exchange) {
    return require(`./${exchange}`).getTradeFee()
  }

  static getWithdrawFee(exchange, symbol) {
    return require(`./${exchange}`).getWithdrawFee(symbol)
  }

  static async getCachedPrice(exchange: String, from: String, to: String) {
    if (Adapter.caches && Adapter.caches[`${exchange}`]) {
      const info = Util.getPairInfo(Adapter.caches[`${exchange}`], from, to)
      if (info) return info
    }

    return Adapter.getPrice(exchange, from, to)
  }

  static async getPrice(exchange: String, from: String, to: String) {
    const adapter = require(`./${exchange}`)
    const price = await adapter.getPrice(from, to)
    return price
  }

  static async getPairs(exchange: String) {
    const adapter = require(`./${exchange}`)
    const pairs = await adapter.getPairs()
    return pairs
  }
}

export default Adapter