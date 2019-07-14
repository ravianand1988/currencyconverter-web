<template>
  <v-container class="v-card" :class="parentClasses">
    <v-layout class="pl-3">
      <v-flex>
        <div class="grey--text subheading">
          <span>1 {{summary.base}} {{$t('common.equals')}} </span>
        </div>
        <div class="display-2">
          <i18n-n :value="summary.rate"/>
          <span> {{summary.target}}</span>
        </div>
        <div class="grey--text subheading">
          <span>{{summary.now}}</span>
        </div>
      </v-flex>
    </v-layout>
    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm6>
            <v-text-field single-line outline
                          v-model.trim="valueA"
                          :class="inputClasses"
                          @keyup="calculate"
                          @keypress="validate"/>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select outline
                      v-model="baseCurrencyCode"
                      :class="selectClasses"
                      :items="currencyChoices"
                      @change="calculate"/>
          </v-flex>
          <v-flex xs12 sm6>
            <v-text-field single-line outline
                          v-model.trim="valueB"
                          :class="inputClasses"
                          @keyup="calculateInput2"
                          @keypress="validate"/>
          </v-flex>
          <v-flex xs12 sm6>
            <v-select outline
                      v-model="targetCurrencyCode"
                      :class="selectClasses"
                      :items="currencyChoices"
                      @change="calculate"/>

          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import i18n from '../plugins/i18n'
import money from '../plugins/moneySetup'
import fx from 'money'

export default {
  name: 'CurrencyConverter',
  props: {
    data: {
      type: Object,
      require: true
    },
    language: {
      type: String,
      default: 'de'
    },
    parentClasses: {
      type: Array
    },
    inputClasses: {
      type: Array
    },
    selectClasses: {
      type: Array
    }
  },
  data () {
    return {
      baseCurrencyCode: this.data.baseCurrencyCode,
      targetCurrencyCode: this.data.targetCurrencyCode,
      valueA: this.data.valueA,
      valueB: 0
    }
  },
  computed: {
    currencyChoices () {
      return Object.entries(this.$t('currencies')).map(([k, v]) => ({ value: k, text: v }))
    },
    summary () {
      return {
        base: this.$t('currencies')[this.baseCurrencyCode],
        rate: parseFloat((fx.rates[this.targetCurrencyCode] / fx.rates[this.baseCurrencyCode]).toFixed(3)),
        target: this.$t('currencies')[this.targetCurrencyCode],
        now: this.moment.utc().format('DD MMMM, H:mm:ss UTC')
      }
    }
  },
  methods: {
    init () {
      i18n.locale = this.language
      money.setupFx(this.data.currencies, this.data.baseCurrencyCode, this.data.targetCurrencyCode)
      this.calculate()
    },
    swapSelection (sender, newCurrency, oldCurrency) {
      if (this.baseCurrencyCode === this.targetCurrencyCode) {
        switch (sender) {
          case 'baseCurrencyCode':
            this.targetCurrencyCode = oldCurrency
            break
          case 'targetCurrencyCode':
            this.baseCurrencyCode = oldCurrency
            break
        }
        this.calculate()
      }
    },
    calculate () {
      this.valueB = this.$n(fx.convert(this.valueA, {
        from: this.baseCurrencyCode,
        to: this.targetCurrencyCode
      }).toFixed(4))
    },
    calculateInput2 () {
      this.valueA = this.$n(fx.convert(this.valueB, {
        from: this.targetCurrencyCode,
        to: this.baseCurrencyCode
      }).toFixed(4))
    },
    validate (event) {
      const regex = /[0-9]|\./
      if (!regex.test(event.key)) {
        event.returnValue = false
        if (event.preventDefault) event.preventDefault()
      }
    }
  },
  created () {
    this.init()
  },
  watch: {
    baseCurrencyCode (newCurrency, oldCurrency) {
      this.swapSelection('baseCurrencyCode', newCurrency, oldCurrency)
    },
    targetCurrencyCode (newCurrency, oldCurrency) {
      this.swapSelection('targetCurrencyCode', newCurrency, oldCurrency)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
