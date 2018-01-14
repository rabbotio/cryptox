# cryptox
[WIP] Crypto exchange parser and adapter for latest price

## Example
> See examples/index.ts
```js
import Cryptox from '@rabbotio/cryptox'

(async () => {
  // Get each symbol
  Cryptox.getPrice('bx', 'OMG', 'THB').then(data => console.log(`BX:OMG_THB = ${data.last}`))
  Cryptox.getPrice('binance', 'OMG', 'ETH').then(data => console.log(`Binance:OMG_ETH = ${data.last}`))
  Cryptox.getPrice('cex', 'ETH', 'USD').then(data => console.log(`CEX:OMG_USD = ${data.last}`))

  // Get all price and cached
  await Cryptox.fetchAndCache('bx')// TODO : , 'binance', 'cex')
    Cryptox.getCachedPrice('bx', 'OMG', 'THB').then(data => console.log(`BX:OMG_THB = ${data.last}`))
    Cryptox.getCachedPrice('bx', 'THB', 'OMG').then(data => console.log(`BX:THB_OMG = ${data.last}`))
  })()
```

## TODO
- [ ] fetchAndCache `binance`, `cex`
- [ ] getPrices
