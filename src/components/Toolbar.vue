<template>
  <v-toolbar fixed app class="elevation-0">
    <v-toolbar-title class="headline text-uppercase">
      <span>$ </span>
      <span class="font-weight-light">{{$t('common.currencyConverter')}}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <language-selector/>
  </v-toolbar>
</template>

<script>
import LanguageSelector from '@/components/LanguageSelector'

export default {
  name: 'Toolbar',
  components: {
    LanguageSelector
  }
}
</script>

<style scoped>

</style>
