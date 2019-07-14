<template>
  <div>
    <v-menu bottom left>
      <template #activator="{ on }">
        <v-btn
          class="black--text"
          icon
          v-on="on"
        >
          <flag :iso="currentLanguage().flag" v-bind="squared=false"/>
        </v-btn>
      </template>

      <v-list>
        <v-list-tile
          v-for="(item, i) in languages"
          :key="i"
          @click="changeLocale(item.language)"
        >
          <flag :iso="item.flag" v-bind="squared=false"/>
          <v-list-tile-title class="ml-2">{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import i18n from '@/plugins/i18n'

export default {
  name: 'LanguageSelector',
  data () {
    return {
      lang: 'en',
      languages: [
        { flag: 'us', title: this.$t('common.english'), language: 'en' },
        { flag: 'de', title: this.$t('common.german'), language: 'de' }
      ]
    }
  },
  methods: {
    changeLocale (locale) {
      i18n.locale = locale
    },
    currentLanguage () {
      return this.languages.find(d => d.language === i18n.locale)
    }
  }
}
</script>

<style scoped lang="scss">

</style>
