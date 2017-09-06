const Kraken = require('kraken-exchange')
var config = require('config')

const API_KEY = config.get('kraken.credentials.api_key')
const PRIV_KEY = config.get('kraken.credentials.private_key')

const kraken = new Kraken(API_KEY, PRIV_KEY)

kraken.balance()
.then(response => getTicker(response))
.catch(err => console.error(err))

function getTicker (balance) {
  kraken.ticker('XBTEUR', 'ETHEUR', 'XRPEUR', 'LTCEUR', 'BCHEUR')
    .then(response => calculateBalance(balance, response))
}

function calculateBalance (balance, ticker) {
  let totalValue = 0.0
  for (var i in balance) {
    const pair = i + 'EUR'
    const pairValue = ticker[pair]
    if (balance.hasOwnProperty(i) && pairValue !== undefined) {
      // console.log(pairValue)
      var total = parseFloat(balance[i]) * parseFloat(pairValue['c'])
      totalValue = totalValue + total
      console.log(i + ' \t| ' + total + ' (' + balance[i] + ')')
    } else if (i === 'EUR') {
      console.log(i + ' \t| ' + balance[i])
      totalValue = balance[i]
    }
  }
  console.log('Total: \t| € ' + totalValue)
}
