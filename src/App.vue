<template>
  <v-app id="app">
    <toolbar/>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  metaInfo: {
    title: 'Currency Converter',
    titleTemplate: '%s | Currency Converter'
  },
  components: {
    Toolbar
  }
}
</script>
