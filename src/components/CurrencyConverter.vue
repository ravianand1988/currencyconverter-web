<template>
  <v-container class="white v-card">
    <v-layout class="pl-3">
      <v-flex class="text-xs-left">
        <div class="grey--text subheading">
          <span>1</span><span> {{summary.source}}</span> {{$t('common.equals')}}
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
    <div>
      <v-form>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 sm6>
              <v-text-field v-model.trim="valueA" @keyup="calculate" @keypress="validate" single-line outline/>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select v-model="selectedCurrencyA" @change="calculate" :items="currencyChoices" outline></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-text-field v-model.trim="valueB" @keyup="calculateInput2" @keypress="validate" single-line outline/>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select v-model="selectedCurrencyB" @change="calculate" :items="currencyChoices" outline></v-select>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </v-container>
</template>

<script>

import '../plugins/moneySetup'
import fx from 'money'

export default {
  name: 'CurrencyConverter',
  data () {
    return {
      selectedCurrencyA: 'EUR',
      selectedCurrencyB: 'USD',
      valueA: this.$n(fx.rates['EUR']),
      valueB: this.$n(fx.rates['USD']),
      currencies: [
        {
          name: 'United States Dollar',
          code: 'USD',
          name_plural: 'US dollars',
          rate: 1.2897
        },
        {
          name: 'Canadian Dollar',
          code: 'CAD',
          name_plural: 'Canadian dollars',
          rate: 1.2897
        },
        {
          name: 'Euro',
          code: 'EUR',
          name_plural: 'euros',
          rate: 1.2897
        },
        {
          name: 'Swiss Franc',
          code: 'CHF',
          name_plural: 'Swiss francs',
          rate: 1.2897
        },
        {
          name: 'British Pound Sterling',
          code: 'GBP',
          name_plural: 'British pounds sterling',
          rate: 1.2897
        },
        {
          name: 'Japanese Yen',
          code: 'JPY',
          name_plural: 'Japanese yen',
          rate: 1.2897
        }
      ]
    }
  },
  computed: {
    currencyChoices () {
      return Object.entries(this.$t('currencies')).map(([k, v]) => ({ value: k, text: v }))
    },
    summary () {
      return {
        source: this.$t('currencies')[this.selectedCurrencyA],
        rate: parseFloat((fx.rates[this.selectedCurrencyB] / fx.rates[this.selectedCurrencyA]).toFixed(3)),
        target: this.$t('currencies')[this.selectedCurrencyB],
        now: this.moment.utc().format('DD MMMM, H:mm:ss UTC')
      }
    }
  },
  methods: {
    swapSelection (sender, newCurrency, oldCurrency) {
      if (this.selectedCurrencyA === this.selectedCurrencyB) {
        switch (sender) {
          case 'selectedCurrencyA':
            this.selectedCurrencyB = oldCurrency
            break
          case 'selectedCurrencyB':
            this.selectedCurrencyA = oldCurrency
            break
        }
        this.calculate()
      }
    },
    calculate () {
      this.valueB = this.$n(fx.convert(this.valueA, {
        from: this.selectedCurrencyA,
        to: this.selectedCurrencyB
      }).toFixed(4))
    },
    calculateInput2 () {
      this.valueA = this.$n(fx.convert(this.valueB, {
        from: this.selectedCurrencyB,
        to: this.selectedCurrencyA
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
  watch: {
    selectedCurrencyA (newCurrency, oldCurrency) {
      this.swapSelection('selectedCurrencyA', newCurrency, oldCurrency)
    },
    selectedCurrencyB (newCurrency, oldCurrency) {
      this.swapSelection('selectedCurrencyB', newCurrency, oldCurrency)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
