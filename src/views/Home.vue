<template>
  <v-container>
    <h1 class="display-2"> Currency Converter...</h1>
    <!--    <currency-converter :data="dataCurrencyConverter" class="white"/>-->
  </v-container>
</template>

<script>
// import CurrencyConverter from '@/components/CurrencyConverter'
// import data from '../data/Data'

export default {
  components: {
    // CurrencyConverter
  },
  data () {
    return {
      dataCurrencyConverter: {
        // currencies: data.currencies,
        baseCurrencyCode: 'EUR',
        targetCurrencyCode: 'USD',
        valueA: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
