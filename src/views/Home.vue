<template>
  <v-container class="text-xs-center">
    <h2 class="display-3">Currency converter home page..</h2>
    <currency-converter/>
  </v-container>
</template>

<script>
import CurrencyConverter from '@/components/CurrencyConverter'

export default {
  components: {
    CurrencyConverter
  }
}
</script>
