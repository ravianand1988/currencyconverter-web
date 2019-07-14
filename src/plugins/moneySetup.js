import fx from 'money'
import { keyBy } from 'lodash/collection'

const money = {
  setupFx (currencies, base, target) {
    fx.settings = {
      from: base,
      to: target
    }
    fx.base = base
    fx.rates = keyBy(currencies, 'code')
    for (let item of currencies) {
      fx.rates[item.code] = item.rate
    }
  }
}
export default money
